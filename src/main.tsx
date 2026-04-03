import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import {Providers} from "./components/providers/auth";
import {Toaster} from "sonner"; // important

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
        <Toaster richColors position="top-right" />
      <App />
    </Providers>
  </React.StrictMode>,
);
