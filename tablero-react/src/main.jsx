// =========================================
// PUNTO DE ENTRADA DE REACT
// =========================================

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

// Identificamos el elemento raíz definido
// en index.html.

const contenedor = document.getElementById("root");

// React administra el contenido de este
// contenedor a partir de App.

createRoot(contenedor).render(
  <StrictMode>
    <App />
  </StrictMode>
);