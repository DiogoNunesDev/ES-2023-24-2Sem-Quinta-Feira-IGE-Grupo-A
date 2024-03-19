/**
 * Entry point for the React application.
 * 
 * This file sets up the main structure of the application and includes essential imports.
 * 
 * - React and ReactDOM are imported for basic React setup.
 * - createBrowserRouter and RouterProvider from react-router-dom are used to handle routing in the app.
 * - The application's global styles are imported from "./styles/index.css".
 * - Dashboard, SideBar, and LandingPage components represent different views/routes in the app.
 * - GlobalProvider from "./context/GlobalContext" is used to wrap the entire application to provide a global state.
 * 
 * The 'router' const defines the main routes for the application. Currently, it includes:
 *   - The root path ("/") which renders the LandingPage.
 *   - The "/dashboard" path which renders the Dashboard.
 * 
 * The ReactDOM.createRoot method renders the application structure:
 *   - The application is wrapped in React.StrictMode for highlighting potential problems.
 *   - The GlobalProvider component provides a global context to the app.
 *   - The layout is structured using flexbox, with SideBar and a main content area that includes the RouterProvider.
 * 
 * Note: There's a placeholder 'div' for a future header component marked by a comment.
 * 
 * @file Manages the main rendering and routing setup for the React application.
 */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./Routes/Dashboard";
import SideBar from "./Components/SideBar";
import LandingPage from "./Routes/LandingPage";
import { GlobalProvider } from "./context/GlobalContext";
import Layout from "./Components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "dashboard",  
        Component: Dashboard,
      },
      {
        path: "alterarAula",  
        Component: LandingPage,
      },
      {
        path: "alterarUC",  
        Component: Dashboard,
      },
      {
        path: "consultarSalas",  
        Component: Dashboard,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider >
       <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
