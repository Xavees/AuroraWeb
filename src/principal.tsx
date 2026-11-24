import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./estilosGlobais.css";
import Aplicacao from "./Aplicacao.tsx";
import { ProvedorAutenticacao } from "./contexts/ProvedorAutenticacao";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvedorAutenticacao>
      <Aplicacao />
    </ProvedorAutenticacao>
  </StrictMode>,
);
