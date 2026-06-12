# App Graph Builder

A Vite + React + TypeScript implementation of the take-home ReactFlow canvas task. The UI follows the provided screenshot direction: dark dotted canvas, slim icon rail, compact top controls, app selector, service cards, and a node inspector panel.

## Setup

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Key Decisions

- ReactFlow from `@xyflow/react` owns canvas interactions: dragging, selection, zoom/pan, fit view, connection rendering, and Delete/Backspace removal.
- TanStack Query fetches mock app and graph data from Promise-based in-memory endpoints with simulated latency.
- Zustand stores only UI state: selected app, selected node, mobile drawer state, active inspector tab, and the mock error toggle.
- The inspector edits the selected ReactFlow node data directly so the slider, numeric input, name, and description stay in sync with the visible node.
- shadcn-style UI primitives live in `src/components/ui` and use Radix Tabs/Slider under the hood.

## Known Limitations

- Mock API data is in memory and resets on refresh.
- Only two apps have distinct graph layouts; other app selections reuse the default graph shape.
- The mock error switch is intentionally global so loading and error states are easy to verify during review.