# SwapWeb (Swappy Public Landing Web)

The standalone public marketing and business landing web application for Swappy — the universal bilateral seat and ticket exchange engine.

## Key Architecture & Reliability Rules

- **100% Zero-Dependency Standalone Build**: Operates with zero runtime dependency on the API backend or PostgreSQL database.
- **Fail-Safe Guarantee**: Even if backend APIs, payment systems, or databases experience an outage on the host machine, SwapWeb remains completely online, responsive, and performant.
- **Static Assets & Edge Delivery**: Can be served via Nginx, Caddy, Cloudflare Pages, Vercel, or Docker with minimal memory/CPU footprint.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- Lucide React

## Local Development

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```
