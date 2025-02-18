// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import React from "react";
// import { BrowserRouter,useRoutes } from "react-router-dom";
// import { ThemeProvider,CssBaseline } from "@mui/material";
// import {baseTheme} from './assets/global/Theme-variable'
// import Themeroutes from "./routes/Router";

// function App() {
//   const routing = useRoutes(Themeroutes);
//   console.log(routing);
//   const theme = baseTheme;

//   return (
//     <BrowserRouter>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
    
//          {routing}
      
//     </ThemeProvider>
//     </BrowserRouter>
//   )
// }

// export default App


import { ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baseTheme } from "./assets/global/Theme-variable";

function App() {
  
  const routing = useRoutes(Router);
  const theme = baseTheme;

  return (
    <ThemeProvider theme={theme}>
     
      {routing}
    </ThemeProvider>
  );
}

export default App