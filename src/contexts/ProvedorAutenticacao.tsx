import type { ReactNode } from "react";
import { AutenticacaoContext } from "./contextoAutenticacao";

async function informarIntegracaoPendente(): Promise<never> {
  throw new Error(
    "Funcionalidade indisponível no momento. Tente novamente mais tarde.",
  );
}

// A autenticação será implementada quando o backend Nest.js estiver disponível.
export function ProvedorAutenticacao({ children }: { children: ReactNode }) {
  function sair() {
    localStorage.removeItem("aurora-usuario");
    sessionStorage.removeItem("aurora-usuario");
  }

  return (
    <AutenticacaoContext.Provider
      value={{
        usuario: null,
        estaLogado: false,
        entrar: informarIntegracaoPendente,
        atualizar: informarIntegracaoPendente,
        sair,
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
}
