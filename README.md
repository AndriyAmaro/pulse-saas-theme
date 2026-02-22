<div align="center">

# Pulse

**A production-grade design system and application platform**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![Components](https://img.shields.io/badge/Components-104+-14B8A6?style=for-the-badge)
![Pages](https://img.shields.io/badge/Pages-41-8B5CF6?style=for-the-badge)
![i18n](https://img.shields.io/badge/i18n-PT_|_EN_|_ES-F59E0B?style=for-the-badge)
![License](https://img.shields.io/badge/License-Source_Available-22C55E?style=for-the-badge)

</div>

---

## Overview

Pulse is a comprehensive design system and SaaS application platform featuring 104+ handcrafted components, 41 pages, and full internationalization support. Built from scratch with Atomic Design methodology, it provides a complete foundation for modern web applications — from marketing sites to complex dashboards.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | SSR, SSG, routing, middleware |
| UI | React 19 | Component architecture |
| Styling | Tailwind CSS 4 + CVA | Utility-first CSS + type-safe variants |
| Language | TypeScript 5 | Type safety across the codebase |
| Icons | Lucide React | Consistent icon system |
| i18n | next-intl | Pathname-based internationalization |
| Theme | next-themes | Dark/light mode with system detection |
| Charts | Recharts 3 | SVG-based data visualization |
| Forms | React Hook Form + Zod | Form management + schema validation |
| DnD | @dnd-kit | Drag and drop (Kanban, sortable lists) |
| Accessibility | Radix UI (12 primitives) | WAI-ARIA compliant headless components |
| Animations | CSS Keyframes + SVG | Custom ECG pulse animations (zero JS runtime) |

## Component Architecture

The component library follows **Atomic Design** with a strict dependency hierarchy:

```
Tokens → Primitives → Patterns → Organisms → Layouts → Pages
```

| Tier | Count | Description | Examples |
|------|-------|-------------|----------|
| **Primitives** | 17 | Smallest UI units | Button, Input, Badge, Avatar, Switch |
| **Patterns** | 71 | Composed components | PricingTable, ChatUI, HeroSection, AuthCard |
| **Organisms** | 9 | Complex stateful components | DataTable, CommandPalette, Modal, Form |
| **Layouts** | 7 | Page-level structure | Sidebar, Header, Footer, DashboardGrid |

## Pages & Route Groups

| Group | Pages | Purpose |
|-------|-------|---------|
| `(marketing)` | 7 | Landing, about, blog, contact, pricing |
| `(dashboard)` | 28 | Analytics, CRM, ecommerce, finance, healthcare, and more |
| `(auth)` | 4 | Login, register, forgot/reset password |
| `(standalone)` | 2 | Coming soon, maintenance |

Each route group has an independent layout — the dashboard uses a sidebar + header, auth pages use a split-screen with branded animations, and marketing pages use a full-width header + footer.

## Key Features

- **104+ Components** — Built from scratch, not forked from any template
- **Dark/Light Mode** — System-aware theme with smooth transitions
- **3 Languages** — Portuguese, English, and Spanish with pathname-based routing
- **28 Dashboard Variants** — Analytics, CRM, ecommerce, finance, healthcare, HR, and more
- **Custom SVG Animations** — ECG heartbeat pulses using CSS keyframes (zero JS runtime cost)
- **Accessible** — Radix UI primitives for keyboard navigation and screen readers
- **Responsive** — Mobile-first design across all components and pages
- **Performance** — Server Components by default, automatic code splitting, CSS purging

## Project Structure

```
pulse-theme/
├── app/
│   └── [locale]/              # i18n routing (pt, en, es)
│       ├── (auth)/            # Split-screen auth layout
│       ├── (dashboard)/       # Sidebar + header layout
│       ├── (marketing)/       # Marketing header + footer
│       └── (standalone)/      # Minimal full-width layout
├── core/
│   ├── primitives/            # 17 atomic components
│   ├── patterns/              # 71 composed components
│   ├── organisms/             # 9 complex components
│   └── layouts/               # 7 layout components
├── messages/                  # i18n translation files (pt, en, es)
├── docs/                      # Architecture & decision records
└── public/                    # Static assets
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | System architecture, component hierarchy, data flow |
| [Decisions](docs/decisions.md) | Architecture Decision Records (ADRs) with trade-offs |
| [Scaling](docs/scaling.md) | 4-phase scaling strategy (0 to 100K+ users) |

## License

This project is licensed under a **Source Available License** — you can view, study, and learn from the code. Commercial use requires a separate license. See [LICENSE](LICENSE) for details.

## Author

**Andri Amaro** — [GitHub](https://github.com/AndriyAmaro)
