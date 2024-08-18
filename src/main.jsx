import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Add this if it's missing

import { Toaster } from "@/components/ui/toaster";
ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster />
  </NextUIProvider>
);
