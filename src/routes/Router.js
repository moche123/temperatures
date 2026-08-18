import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));
const TiempoReal = lazy(() => import("../views/realtime/index.js"));
const Reportes = lazy(() => import("../views/reportes/index.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="inicio" /> },
      { path: "/inicio", exact: true, element: <Dashboard1 /> },
      { path: "/tiempo-real", exact: true, element: <TiempoReal /> },
      { path: "/reportes", exact: true, element: <Reportes /> },
    ],
  },
];

export default ThemeRoutes;
