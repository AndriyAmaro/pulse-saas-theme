# Scaling Strategy

> How Pulse is architected to scale from a portfolio project to a production SaaS serving 100,000+ users.

---

## Current State

Pulse is currently a **statically generated** Next.js application deployed on Vercel. All pages are pre-rendered at build time with zero backend dependencies.

```
Current: Static Site (SSG)
├── Build time: ~30s
├── Pages: Pre-rendered HTML
├── Data: Static JSON (translations)
├── Hosting: Vercel Edge Network
├── Users: Unlimited (CDN-served)
└── Cost: ~$0 (Hobby tier)
```

This is intentional. The frontend architecture is complete and production-ready. The backend layers described below can be added incrementally without rewriting the frontend.

---

## Phase 1: Add Authentication & Database (0 → 1,000 users)

### Architecture

```
┌────────────┐     ┌──────────────┐     ┌────────────────┐
│   Client   │────▶│  Next.js     │────▶│  PostgreSQL    │
│  (Browser) │◀────│  (Vercel)    │◀────│  (Supabase)    │
└────────────┘     │              │     └────────────────┘
                   │  Server      │
                   │  Components  │     ┌────────────────┐
                   │  + Actions   │────▶│  Auth Provider  │
                   └──────────────┘     │  (NextAuth.js)  │
                                        └────────────────┘
```

### Changes Required

| Component | Current | Phase 1 |
|-----------|---------|---------|
| Auth | Static forms | NextAuth.js (JWT sessions) |
| Database | None | PostgreSQL via Prisma |
| Hosting | Vercel Hobby | Vercel Pro |
| Data fetching | Static | Server Components + Prisma |

### Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  profile       Profile?
}

model Profile {
  id          String  @id @default(cuid())
  userId      String  @unique
  user        User    @relation(fields: [userId], references: [id])
  company     String?
  avatarUrl   String?
  timezone    String  @default("UTC")
  locale      String  @default("pt")
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}
```

### Why This Works at 1K Users

- PostgreSQL handles 1K concurrent connections easily
- Vercel serverless functions auto-scale per request
- No caching needed yet (queries are fast enough)
- JWT sessions avoid session storage overhead

---

## Phase 2: Add Caching & Real-time Features (1,000 → 10,000 users)

### Architecture

```
┌────────────┐     ┌──────────────┐     ┌────────────────┐
│   Client   │────▶│  Next.js     │────▶│  PostgreSQL    │
│            │◀────│  (Vercel)    │◀────│  (Neon/Supabase)│
│            │     │              │     └────────────────┘
│  WebSocket │◀───▶│  Service     │            │
│  (Pusher)  │     │  Layer       │     ┌──────▼─────────┐
└────────────┘     │              │────▶│     Redis       │
                   └──────────────┘     │  (Upstash)      │
                                        │                 │
                                        │  - Session cache│
                                        │  - Query cache  │
                                        │  - Rate limiting│
                                        └─────────────────┘
```

### Redis Caching Strategy

```
Cache Layer Design:

┌─────────────────────────────────────────────┐
│               CACHE HIERARCHY               │
│                                             │
│  L1: React Cache (per-request, in-memory)   │
│      TTL: Request lifetime                  │
│      Use: Deduplicate DB calls in one SSR   │
│                                             │
│  L2: Redis (shared, persistent)             │
│      TTL: 60s - 3600s (configurable)        │
│      Use: Cross-request query caching       │
│                                             │
│  L3: CDN (edge, static)                     │
│      TTL: 3600s+ (revalidate on demand)     │
│      Use: Static assets, marketing pages    │
└─────────────────────────────────────────────┘
```

### Cache Implementation Pattern

```typescript
// Service layer with cache-aside pattern
async function getAnalytics(userId: string): Promise<Analytics> {
  const cacheKey = `analytics:${userId}`

  // L2: Check Redis
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // Cache miss: Query database
  const data = await prisma.analytics.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30,
  })

  // Cache for 5 minutes
  await redis.set(cacheKey, JSON.stringify(data), { ex: 300 })

  return data
}
```

### Cache Invalidation Strategy

| Event | Invalidation |
|-------|-------------|
| User updates profile | Delete `user:{id}` |
| New analytics data | Delete `analytics:{userId}` |
| Admin changes | Flush namespace `admin:*` |
| Deploy | Flush all (via Vercel webhook) |

### Why Redis (Upstash) Specifically

- **Serverless-native:** HTTP-based, no persistent connections needed
- **Global replication:** Data cached at the edge, near users
- **Pay-per-request:** No idle costs (perfect for growing apps)
- **Built-in rate limiting:** `@upstash/ratelimit` library

---

## Phase 3: Background Jobs & Advanced Features (10,000 → 50,000 users)

### Architecture

```
┌────────────┐     ┌──────────────┐     ┌────────────────┐
│   Client   │────▶│  Next.js     │────▶│  PostgreSQL    │
│            │◀────│  API Routes  │◀────│  (Read Replica) │
└────────────┘     │              │     └────────────────┘
                   │  Server      │            │
                   │  Actions     │     ┌──────▼─────────┐
                   └──────┬───────┘     │     Redis       │
                          │             └─────────────────┘
                          │
                   ┌──────▼───────┐     ┌─────────────────┐
                   │   BullMQ     │────▶│    Workers       │
                   │  Job Queue   │     │                  │
                   │              │     │  - Email sender  │
                   │  Redis-based │     │  - PDF generator │
                   └──────────────┘     │  - Analytics ETL │
                                        │  - Image resize  │
                                        │  - Webhook retry │
                                        └─────────────────┘
```

### Queue Strategy (BullMQ)

```
Job Queue Design:

┌─────────────────────────────────────────────┐
│              QUEUE ARCHITECTURE              │
│                                             │
│  Priority Queues:                           │
│  ┌─────────────────────────────────────┐    │
│  │ CRITICAL (P0)  │ Auth, payments    │    │
│  │ HIGH (P1)      │ Emails, webhooks  │    │
│  │ NORMAL (P2)    │ Analytics, PDFs   │    │
│  │ LOW (P3)       │ Cleanup, reports  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Retry Policy:                              │
│  - Exponential backoff (1s, 4s, 16s, 64s)  │
│  - Max 5 retries                           │
│  - Dead letter queue for failed jobs        │
│  - Alert on DLQ threshold                  │
└─────────────────────────────────────────────┘
```

### Job Types

| Job | Priority | Timeout | Retries |
|-----|----------|---------|---------|
| Send email | HIGH | 30s | 3 |
| Generate PDF report | NORMAL | 60s | 2 |
| Process analytics | NORMAL | 120s | 3 |
| Resize uploaded image | NORMAL | 45s | 2 |
| Webhook delivery | HIGH | 15s | 5 |
| Database cleanup | LOW | 300s | 1 |
| Send notification | HIGH | 10s | 3 |

### Why BullMQ Over Alternatives

| Solution | Rejected Because |
|----------|-----------------|
| AWS SQS | Vendor lock-in, cold starts |
| RabbitMQ | Separate infrastructure to manage |
| Inngest | Good but less control over workers |
| Trigger.dev | Newer, smaller ecosystem |
| **BullMQ** | **Redis-based (reuse existing), battle-tested, rich features** |

---

## Phase 4: Multi-Tenant & Microservices (50,000 → 100,000+ users)

### Architecture

```
                   ┌──────────────────┐
                   │   Load Balancer  │
                   │   (Vercel Edge)  │
                   └────────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐
      │  Web App │  │  API      │  │  Admin   │
      │  (Next)  │  │  Gateway  │  │  Panel   │
      └────┬─────┘  └────┬─────┘  └────┬─────┘
           │              │              │
           └──────────────┼──────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
   ┌──────────┐    ┌──────────┐    ┌──────────┐
   │  Auth    │    │ Analytics│    │ Billing  │
   │ Service  │    │ Service  │    │ Service  │
   └────┬─────┘    └────┬─────┘    └────┬─────┘
        │               │               │
   ┌────▼─────┐    ┌────▼─────┐    ┌────▼─────┐
   │ Auth DB  │    │Analytics │    │ Billing  │
   │ (PG)     │    │   DB     │    │   DB     │
   └──────────┘    │ (PG +    │    │ (PG)     │
                   │ ClickHouse│    └──────────┘
                   └──────────┘
                        │
                   ┌────▼─────┐
                   │  Redis   │
                   │ Cluster  │
                   └──────────┘
```

### Multi-Tenancy Strategy

```
Approach: Schema-based isolation (PostgreSQL schemas)

┌─────────────────────────────────────────────┐
│              TENANT ISOLATION               │
│                                             │
│  Option A: Row-level (tenant_id column)     │
│  ✓ Simple, works at any scale              │
│  ✓ Single database, easy backups           │
│  ✗ Must never forget WHERE tenant_id = ?   │
│                                             │
│  Option B: Schema-level (one schema/tenant) │ ← Selected
│  ✓ Stronger isolation                      │
│  ✓ Per-tenant migrations possible          │
│  ✓ Easy to extract to separate DB later    │
│  ✗ More complex connection management      │
│                                             │
│  Option C: Database-level (one DB/tenant)   │
│  ✓ Maximum isolation                       │
│  ✗ Operational nightmare at scale          │
└─────────────────────────────────────────────┘
```

### Microservices Boundary Rules

Only extract a service when ALL of these are true:

1. **Independent scaling** is needed (e.g., analytics processes 10x more data than auth)
2. **Different team** will own it (organizational boundary)
3. **Different data store** makes sense (e.g., ClickHouse for analytics)
4. **Independent deployment** adds value (e.g., billing can't go down with deploys)

### Service Communication

```
Synchronous (REST/gRPC):
  - Auth verification
  - User profile lookup
  - Billing status check

Asynchronous (Event-driven via Redis Streams):
  - user.created → Provision tenant schema
  - subscription.upgraded → Update feature flags
  - analytics.processed → Send weekly digest
  - user.deleted → GDPR cleanup across services
```

---

## Database Scaling Path

```
Phase 1 (0-1K users):
  Single PostgreSQL instance (Supabase/Neon)
  └── All tables in public schema
      └── ~100 queries/sec capacity

Phase 2 (1K-10K users):
  PostgreSQL + Connection pooling (PgBouncer)
  └── Read replica for analytics queries
      └── ~1,000 queries/sec capacity

Phase 3 (10K-50K users):
  PostgreSQL (primary) + Read replicas (2-3)
  └── Redis for hot data caching
  └── ClickHouse for analytics (write-optimized)
      └── ~10,000 queries/sec capacity

Phase 4 (50K-100K+ users):
  PostgreSQL cluster (Citus or manual sharding)
  └── Redis Cluster (6+ nodes)
  └── ClickHouse cluster
  └── S3 for object storage
      └── ~100,000+ queries/sec capacity
```

---

## Monitoring & Observability Strategy

```
┌─────────────────────────────────────────────┐
│            OBSERVABILITY STACK              │
│                                             │
│  Metrics:     Vercel Analytics + custom     │
│  Logging:     Vercel Logs / Axiom           │
│  Tracing:     OpenTelemetry (future)        │
│  Errors:      Sentry                        │
│  Uptime:      Better Uptime / Checkly       │
│  APM:         Vercel Speed Insights         │
│                                             │
│  Key Metrics:                               │
│  ├── p95 response time < 200ms             │
│  ├── Error rate < 0.1%                     │
│  ├── Core Web Vitals (LCP < 2.5s)         │
│  ├── Cache hit ratio > 85%                 │
│  └── Queue processing time p95 < 30s      │
└─────────────────────────────────────────────┘
```

---

## Cost Estimation by Phase

| Phase | Users | Monthly Cost | Stack |
|-------|-------|-------------|-------|
| Current | Unlimited (static) | $0 | Vercel Hobby |
| Phase 1 | 1,000 | ~$45 | Vercel Pro + Supabase Free |
| Phase 2 | 10,000 | ~$150 | + Upstash Redis + Pusher |
| Phase 3 | 50,000 | ~$500 | + Workers + Read Replicas |
| Phase 4 | 100,000+ | ~$2,000+ | + ClickHouse + S3 + Multi-region |

---

## Key Principles

1. **Scale vertically first.** A single PostgreSQL instance handles more than most people think.
2. **Add caching before adding servers.** Redis eliminates 80% of database load.
3. **Extract services only when forced.** A well-structured monolith outperforms a poorly designed microservices architecture.
4. **Measure before optimizing.** Add observability before adding infrastructure.
5. **Design for failure.** Every external call should have a timeout, retry, and fallback.
