# TT-Proxy

A lightweight Cloudflare worker proxy for Transport Tycoon. Forwarding API requests to upstream servers as required for https upgrading.

## Usage

### Proxy Endpoints
- `/{main|beta}/...` — Forwards to the corresponding Tycoon server.

Example:
```
https://<your-worker>.workers.dev/main/some/path  →  http://server.tycoon.community:30120/some/path
https://<your-worker>.workers.dev/beta/some/path  →  http://server.tycoon.community:30125/some/path
```

### Headers
- `x-tycoon-key` (optional): Must be 10-50 characters if present.
- `x-tycoon-public-key` (optional): Must be 10-50 characters if present.

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/)

### Scripts
- `npm run dev` — Start local dev server
- `npm run deploy` — Deploy to Cloudflare
- `npm run test` — Run tests with Vitest
- `npm run cf-typegen` — Generate Cloudflare types

### Project Structure
- `src/index.ts` — Worker source code
- `test/` — Vitest tests
- `wrangler.jsonc` — Worker configuration

## References
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

---
