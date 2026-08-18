# Temperatures — Temperature Monitoring Dashboard

Frontend for a temperature-monitoring dashboard. Built on the "Flexy" MUI admin template (React + Vite), of which only three real feature pages remain:

- **Inicio** — dashboard with a readings chart.
- **Tiempo real** — real-time readings view.
- **Reportes** — filtered report export (XLSX and PDF).

The backend lives in a separate repo and is consumed as Netlify Functions at `https://temperaturesback.netlify.app/.netlify/functions/index`. There is no local backend or `.env`: the base URL is hardcoded in each view that calls the API.

## Domain concepts

Readings are queried by:

- `type` (`tc1` / `tc2`) — "Lector 1 / Lector 2", the two collector/reader endpoints.
- `sensor` (`AMBIENTE1`, `AMBIENTE2`, `SENSOR1`-`4`).

These value lists are defined locally in `src/views/reportes/index.js` (`lectors`, `sensors`), not sourced from an API.

## Commands

- `npm run dev` — start the dev server (Vite).
- `npm run build` — production build.
- `npm run preview` — preview the production build.
- `npm run lint` — ESLint (`--max-warnings 0`).

No test suite exists in this repo.

## Architecture

- **Routing**: `src/routes/Router.js` defines routes with `react-router-dom` v7 (`useRoutes`), all lazy-loaded. Everything nests under `FullLayout` (`src/layouts/FullLayout/FullLayout.js`), which renders `Sidebar` + `Footer` + `<Outlet />`. The sidebar menu is a separate list in `src/layouts/FullLayout/Sidebar/data.js` — adding a route means updating both `Router.js` and `data.js`.
- **`.js` files with JSX**: most "components" are `.js` (not `.jsx`) but contain JSX. `vite.config.js` forces esbuild to treat `src/**/*.js` as JSX.
- **Data fetching**: each view calls the backend directly with `axios` inside `useEffect`/handlers — no shared API service layer, no React Query. Repeated pattern: build a UTC date range with `dayjs`, `axios.get`, success → update state (chart/table), failure → `sweetalert2` error modal.
- **Charts**: `react-apexcharts` / `apexcharts`, via `SalesOverview` (`src/views/dashboards/dashboard1-components/SalesOverview.js`).
- **Theming**: MUI theme config in `src/assets/global/` (`Theme-variable.js`, `Typography.js`, `Shadows.js`).
- **Deploy**: Netlify (`netlify.toml`), SPA fallback rewrites all paths to `/`.

## Language

UI copy is in Spanish (app's audience).
