# Cornerstone Ephraim Portfolio

A Next.js portfolio for product-focused frontend work, client projects, and lightweight case studies.

## Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
bun run lint
bun run typecheck
bun run build
```

`bun run build` also runs `next-sitemap`, which can update generated sitemap timestamps.

## Content

Most portfolio content lives in `src/content`.

- Site-level content: `src/content/*.json`
- Project content: `src/content/projects/*.json`
- Content access: `src/lib/content.ts`

Project additions should normally be handled by adding a JSON file and assets, not by hardcoding content inside React components.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the project boundaries, dependency direction, and intentional exceptions.
