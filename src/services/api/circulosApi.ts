import { requisicaoApi } from "./clienteApi";

export type CirculoApi = {
  id: string;
  nome: string;
  codigoConvite: string;
  dataCriacao: string;
};
export type MembroCirculoApi = {
  id: string;
  usuarioId: string;
  circuloId: string;
  funcao: "ADMINISTRADOR" | "MEMBRO";
  dataEntrada: string;
};

function exigirToken(token: string) {
  if (!token.trim())
    throw new Error("Entre na sua conta para acessar os círculos.");
  return token;
}

export function listarCirculos(token: string, signal?: AbortSignal) {
  return requisicaoApi<CirculoApi[]>("/circulos", {
    token: exigirToken(token),
    signal,
  });
}

export function criarCirculo(nome: string, token: string) {
  const nomeNormalizado = nome.trim();
  if (nomeNormalizado.length < 3 || nomeNormalizado.length > 100) {
    throw new Error("O nome deve ter entre 3 e 100 caracteres.");
  }
  return requisicaoApi<CirculoApi>("/circulos", {
    method: "POST",
    token: exigirToken(token),
    body: JSON.stringify({ nome: nomeNormalizado }),
  });
}

export function entrarNoCirculo(codigoConvite: string, token: string) {
  const codigo = codigoConvite.trim();
  if (!codigo || codigo.length > 10)
    throw new Error("Informe um código de até 10 caracteres.");
  return requisicaoApi<MembroCirculoApi>("/circulos/entrar", {
    method: "POST",
    token: exigirToken(token),
    body: JSON.stringify({ codigoConvite: codigo }),
  });
}

export function listarMembrosCirculo(
  id: string,
  token: string,
  signal?: AbortSignal,
) {
  return requisicaoApi<MembroCirculoApi[]>(
    `/circulos/${encodeURIComponent(id)}/membros`,
    {
      token: exigirToken(token),
      signal,
    },
  );
}
