# Portfolio architecture

This is a small Next.js App Router portfolio, so the structure is intentionally direct. The goal is clear ownership without enterprise ceremony.

## Boundaries

- `src/app` is framework-owned routing and page composition.
- `src/content` owns portfolio copy, project data, navigation, contact details, and SEO text.
- `src/lib/content.ts` is the only content access layer and is server-only because it reads project JSON files from disk.
- `src/components/sections` owns homepage and page-level presentation sections.
- `src/components/project` owns project listing, cover, case-study, and project navigation UI.
- `src/components/layout` owns shell UI such as the navbar, footer, container, scroll progress, and scroll-to-top button.
- `src/components/ui` owns reusable low-level UI primitives.
- `src/components/contact/contact-form.tsx` is intentionally dormant until the contact form is reintroduced.
- `src/components/project/project-video-preview.tsx` is intentionally dormant until project videos are reintroduced.

## Dependency direction

Use this flow:

```text
content + lib + ui primitives -> feature/presentation components -> app routes
```

Rules of thumb:

- App routes should compose components and load content. They should not hardcode project data.
- Presentation components should receive content through props.
- Shared UI and lib code should not import route files.
- Client components should stay small and only wrap behavior that actually needs browser state.
- Server-only utilities should not be imported from client components.

## Content model

Project pages are powered by JSON files in `src/content/projects`. Adding a project should normally require:

1. Adding a new JSON file.
2. Adding any static assets under `public/images/projects`.
3. Letting `src/lib/content.ts` pick it up automatically.

Project visibility is controlled with `published: false` when needed.

## Validation and delivery

Before shipping meaningful changes, run:

```bash
bun run lint
bun run typecheck
bun run build
```

`next-sitemap` runs after `bun run build` and may update generated sitemap timestamps. Avoid committing timestamp-only sitemap changes unless that is intentional.

## Intentional exceptions

- There is no `src/features` directory yet. The project does not have enough business logic to justify that split.
- Runtime validation is light because most data is local trusted JSON, not remote user-controlled data.
- The dormant contact form and video preview component are kept for future reuse, but they should not be wired back into routes without confirming dependencies, assets, and environment configuration.
