// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Configuração padrão · roda Next.js no Cloudflare Workers Runtime
  // Suporta SSR, middleware, server actions, streaming, ISR, RSC.
});
