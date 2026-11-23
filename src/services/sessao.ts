import type { RespostaLogin } from "./api/autenticacaoApi";

export type Sessao = { token: string; usuarioId: string; expiraEm: number };
export const CHAVE_SESSAO = "aurora-sessao-nest";

// A leitura do payload apenas localiza o perfil. O Nest valida a assinatura.
export function interpretarSessao(
  resposta: RespostaLogin,
  agora = Date.now(),
): Sessao {
  const partes = resposta.access_token.split(".");
  if (partes.length !== 3 || resposta.token_type !== "Bearer")
    throw new Error("Resposta de autenticação inválida.");
  const base64 = partes[1].replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(
    atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
  );
  if (
    typeof payload.sub !== "string" ||
    !/^[1-9]\d*$/.test(payload.sub) ||
    typeof payload.exp !== "number" ||
    !Number.isFinite(payload.exp) ||
    !Number.isFinite(resposta.expires_in) ||
    resposta.expires_in <= 0
  ) {
    throw new Error("Resposta de autenticação inválida.");
  }
  const expiraEm = Math.min(
    payload.exp * 1000,
    agora + resposta.expires_in * 1000,
  );
  if (expiraEm <= agora)
    throw new Error("Sua sessão expirou. Entre novamente.");
  return { token: resposta.access_token, usuarioId: payload.sub, expiraEm };
}

export function limparSessao() {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem(CHAVE_SESSAO);
    storage.removeItem("aurora-usuario");
  }
}

export function lerSessao(): Sessao | null {
  try {
    const raw =
      sessionStorage.getItem(CHAVE_SESSAO) ??
      localStorage.getItem(CHAVE_SESSAO);
    if (!raw) return null;
    const salvo = JSON.parse(raw);
    if (typeof salvo.expiraEm !== "number") throw new Error();
    return interpretarSessao({
      access_token: salvo.token,
      token_type: "Bearer",
      expires_in: (salvo.expiraEm - Date.now()) / 1000,
    });
  } catch {
    limparSessao();
    return null;
  }
}
