import { requisicaoApi } from "./clienteApi";

export type CredenciaisLogin = {
  email: string;
  senha: string;
};

export type RespostaLogin = {
  message: string;
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
};

export type DadosPerfil = {
  nome: string;
  email: string;
  telefone: string;
};

export type RespostaPerfil = {
  message: string;
  user: RespostaLogin["user"];
};

// Integração temporária com POST /api/auth/login da API Express.
// Remova ou adapte este arquivo quando o backend for migrado para NestJS.
export function realizarLogin(credenciais: CredenciaisLogin) {
  return requisicaoApi<RespostaLogin>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credenciais),
  });
}

// Atualiza o perfil do usuário identificado pelo token temporário.
export function atualizarPerfil(dados: DadosPerfil, token: string) {
  return requisicaoApi<RespostaPerfil>("/api/auth/profile", {
    method: "PUT",
    token,
    body: JSON.stringify(dados),
  });
}
