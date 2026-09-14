import { useContext } from "react";
import { AutenticacaoContext } from "../contexts/autenticacaoContext";

// Fornece o usuário logado e as ações de entrar e sair.
export function useAutenticacao() {
  const contexto = useContext(AutenticacaoContext);
  if (!contexto)
    throw new Error("useAutenticacao requer AutenticacaoProvider.");
  return contexto;
}
