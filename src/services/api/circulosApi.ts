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

export function atualizarCirculo(id: string, nome: string, token: string) {
  if (nome.trim().length < 3 || nome.trim().length > 100)
    throw new Error("Use um nome de 3 a 100 caracteres.");
  return requisicaoApi<CirculoApi>(`/circulos/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token: exigirToken(token),
    body: JSON.stringify({ nome: nome.trim() }),
  });
}
export function renovarConvite(id: string, token: string) {
  return requisicaoApi<{ codigoConvite: string }>(
    `/circulos/${encodeURIComponent(id)}/codigo-convite/renovar`,
    { method: "POST", token: exigirToken(token) },
  );
}
export function sairCirculo(id: string, token: string) {
  return requisicaoApi<void>(`/circulos/${encodeURIComponent(id)}/membros/eu`, {
    method: "DELETE",
    token: exigirToken(token),
  });
}
export function excluirCirculo(id: string, token: string) {
  return requisicaoApi<void>(`/circulos/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token: exigirToken(token),
  });
}
export function removerMembro(id: string, usuarioId: string, token: string) {
  return requisicaoApi<void>(
    `/circulos/${encodeURIComponent(id)}/membros/${encodeURIComponent(usuarioId)}`,
    { method: "DELETE", token: exigirToken(token) },
  );
}
export function alterarFuncao(
  id: string,
  usuarioId: string,
  funcao: MembroCirculoApi["funcao"],
  token: string,
) {
  return requisicaoApi<void>(
    `/circulos/${encodeURIComponent(id)}/membros/${encodeURIComponent(usuarioId)}/funcao`,
    {
      method: "PATCH",
      token: exigirToken(token),
      body: JSON.stringify({ funcao }),
    },
  );
}
export function desbloquearMembro(
  id: string,
  usuarioId: string,
  token: string,
) {
  if (!/^[1-9]\d*$/.test(usuarioId))
    throw new Error("Informe um ID de usuário válido.");
  return requisicaoApi<void>(
    `/circulos/${encodeURIComponent(id)}/bloqueios/${encodeURIComponent(usuarioId)}`,
    { method: "DELETE", token: exigirToken(token) },
  );
}

export function buscarCirculo(id: string, token: string, signal?: AbortSignal) {
  return requisicaoApi<CirculoApi>(`/circulos/${encodeURIComponent(id)}`, {
    token: exigirToken(token),
    signal,
  });
}

export function desbloquearMembroPorEmail(
  id: string,
  email: string,
  token: string,
) {
  const normalizado = email.trim().toLowerCase();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizado) ||
    normalizado.length > 100
  )
    throw new Error("Informe um e-mail válido.");
  return requisicaoApi<void>(
    `/circulos/${encodeURIComponent(id)}/bloqueios/desbloquear-por-email`,
    {
      method: "POST",
      token: exigirToken(token),
      body: JSON.stringify({ email: normalizado }),
    },
  );
}
