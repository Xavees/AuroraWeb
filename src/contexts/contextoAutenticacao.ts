import { createContext } from "react";
import type { CredenciaisLogin, DadosPerfil } from "../types/autenticacao";

export type UsuarioSessao = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
};

type AutenticacaoContextValue = {
  usuario: UsuarioSessao | null;
  estaLogado: boolean;
  entrar: (
    credenciais: CredenciaisLogin,
    manterConectado: boolean,
  ) => Promise<void>;
  atualizar: (dados: DadosPerfil) => Promise<string>;
  sair: () => void;
};

// Compartilha a sessão atual com toda a aplicação.
export const AutenticacaoContext =
  createContext<AutenticacaoContextValue | null>(null);
