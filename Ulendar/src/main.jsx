import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./Routes/Dashboard";
import SideBar from "./Components/SideBar";
import LandingPage from "./Routes/LandingPage";
import { GlobalProvider } from "./context/GlobalContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider >
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
      <SideBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
    
        }}
      >
        {/* substituir div em baixo por componente header */}
        <div style={{ height: 100,}}></div>
        <RouterProvider router={router} style={{ flexGrow: 1 }} />
      </div>
    </div>
    </GlobalProvider>
  </React.StrictMode>
);
