# Temperatures — Dashboard de monitoreo de temperaturas

Frontend del dashboard de monitoreo de temperaturas. Construido sobre el template admin "Flexy" (MUI + React + Vite), del cual solo quedan tres páginas funcionales reales:

- **Inicio** — dashboard con gráfico de lecturas.
- **Tiempo real** — vista de lecturas en tiempo real.
- **Reportes** — filtrado y exportación de reportes (XLSX y PDF).

El backend vive en un repo aparte y se consume como Netlify Functions en `https://temperaturesback.netlify.app/.netlify/functions/index`. No hay backend local ni `.env`: la URL base está hardcodeada en cada vista que llama a la API.

## Conceptos del dominio

Las lecturas se consultan por:

- `type` (`tc1` / `tc2`) — "Lector 1 / Lector 2", los dos endpoints de collector/reader.
- `sensor` (`AMBIENTE1`, `AMBIENTE2`, `SENSOR1`-`4`).

Estas listas de valores están definidas localmente en `src/views/reportes/index.js` (`lectors`, `sensors`), no vienen de una API.

## Comandos

- `npm run dev` — levanta el servidor de desarrollo (Vite).
- `npm run build` — build de producción.
- `npm run preview` — preview del build de producción.
- `npm run lint` — ESLint (`--max-warnings 0`).

No hay suite de tests en este repo.

## Arquitectura

- **Rutas**: `src/routes/Router.js` define las rutas con `react-router-dom` v7 (`useRoutes`), todas con lazy loading. Todo anida bajo `FullLayout` (`src/layouts/FullLayout/FullLayout.js`), que renderiza `Sidebar` + `Footer` + `<Outlet />`. El menú del sidebar es una lista separada en `src/layouts/FullLayout/Sidebar/data.js` — agregar una ruta implica actualizar `Router.js` y `data.js`.
- **Archivos `.js` con JSX**: la mayoría de los "componentes" son `.js` (no `.jsx`) pero contienen JSX. `vite.config.js` fuerza a esbuild a tratar `src/**/*.js` como JSX.
- **Fetching de datos**: cada vista llama al backend directo con `axios` dentro de `useEffect`/handlers — sin capa de servicio/API compartida ni React Query. Patrón repetido: armar rango de fechas en UTC con `dayjs`, `axios.get`, éxito → actualizar estado (chart/tabla), error → modal con `sweetalert2`.
- **Charts**: `react-apexcharts` / `apexcharts`, vía `SalesOverview` (`src/views/dashboards/dashboard1-components/SalesOverview.js`).
- **Theming**: config del theme de MUI en `src/assets/global/` (`Theme-variable.js`, `Typography.js`, `Shadows.js`).
- **Deploy**: Netlify (`netlify.toml`), SPA fallback reescribe todos los paths a `/`.

## Idioma

Los textos de la UI están en español (audiencia de la app).
