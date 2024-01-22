import React from "react";
import { createRoot } from "react-dom/client";
import { MuiThemeProvider } from "@/src/components/providers/MuiThemeProvider/MuiThemeProvider";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
);
