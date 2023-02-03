import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CardContextProvider from "./contexts/CardContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CardContextProvider>
    <App />
  </CardContextProvider>
);
