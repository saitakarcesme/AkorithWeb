# AkorithWeb

The public website for [Akorith](https://akorith.space). It keeps the site's editorial visual system while presenting the current desktop product: project-scoped Workspace chat, durable concurrent Loops, autonomous Research with report exports, profile and compute telemetry, model Benchmarking, Plugins, Settings, and native updates.

## Architecture

- React 19 and React Router 7
- Vite 8
- Tailwind CSS 4 design tokens in `src/index.css`
- Framer Motion for page and interaction transitions
- Static deployment configured by `vercel.json`

Routes are composed in `src/App.jsx`. Shared navigation, footer, motion primitives, and UI primitives live under `src/components`. The interactive desktop replica is centralized in `src/components/demo/AppDemo.jsx`; smaller animated product illustrations live in `src/components/mocks.jsx`.

## Local development

```bash
npm ci
npm run dev
```

Before publishing:

```bash
npm run lint
npm run build
```

The website intentionally preserves Akorith's existing public visual identity. Product updates should revise copy, routes, and interactive replicas without replacing that design system.
