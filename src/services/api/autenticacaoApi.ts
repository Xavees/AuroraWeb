import { requisicaoApi } from "./clienteApi";
import type { CredenciaisLogin } from "../../types/autenticacao";

export type DadosCadastro = { nome: string; email: string; senha: string };
export type RespostaLogin = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
};

// Serviços preparados; a interface ainda não inicia sessões reais.
export function realizarLogin(dados: CredenciaisLogin) {
  return requisicaoApi<RespostaLogin>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: dados.email, senha: dados.senha }),
  });
}

export function cadastrarUsuario(dados: DadosCadastro) {
  return requisicaoApi<{ usuarioId: string; email: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
    }),
  });
}
