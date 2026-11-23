const URL_BASE_API = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

type OpcoesRequisicao = RequestInit & { token?: string };

export class ErroApi extends Error {
  readonly status: number;
  readonly mensagens: string[];
  constructor(status: number, mensagens: string[]) {
    super(mensagens.join(" "));
    this.name = "ErroApi";
    this.status = status;
    this.mensagens = mensagens;
  }
}

// Compatível com GlobalExceptionFilter do Aurora Backend (Nest).
export async function requisicaoApi<T>(
  rota: string,
  { token, headers, ...opcoes }: OpcoesRequisicao = {},
): Promise<T> {
  if (!URL_BASE_API) throw new Error("A API ainda não foi configurada.");
  const cabecalhos = new Headers(headers);
  if (opcoes.body && !cabecalhos.has("Content-Type")) {
    cabecalhos.set("Content-Type", "application/json");
  }
  if (token) cabecalhos.set("Authorization", `Bearer ${token}`);
  const resposta = await fetch(`${URL_BASE_API}/${rota.replace(/^\/+/, "")}`, {
    ...opcoes,
    headers: cabecalhos,
  });
  if (!resposta.ok) {
    const corpo: unknown = await resposta.json().catch(() => null);
    const mensagem =
      corpo && typeof corpo === "object" && "message" in corpo
        ? corpo.message
        : null;
    const mensagens =
      typeof mensagem === "string"
        ? [mensagem]
        : Array.isArray(mensagem)
          ? mensagem.filter((item): item is string => typeof item === "string")
          : [];
    throw new ErroApi(
      resposta.status,
      mensagens.length
        ? mensagens
        : [`Não foi possível concluir a solicitação (${resposta.status}).`],
    );
  }
  if (resposta.status === 204) return undefined as T;
  return resposta.json() as Promise<T>;
}
