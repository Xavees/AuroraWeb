// Endereço base definido no arquivo .env quando a API REST estiver disponível.
const URL_BASE_API = import.meta.env.VITE_API_URL ?? "";

type OpcoesRequisicao = RequestInit & {
  token?: string;
};

// Cliente central para todas as futuras chamadas à API REST.
// As páginas não devem usar fetch diretamente; crie serviços por domínio nesta pasta.
export async function requisicaoApi<T>(
  rota: string,
  { token, headers, ...opcoes }: OpcoesRequisicao = {},
): Promise<T> {
  const resposta = await fetch(`${URL_BASE_API}${rota}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!resposta.ok) {
    throw new Error(`Erro na API REST: ${resposta.status}`);
  }

  return resposta.json() as Promise<T>;
}

// AQUI VOCÊ VAI DESENVOLVER COM API REST:
// - authApi.ts: login, cadastro, recuperação e OTP;
// - perfilApi.ts: consulta e edição do perfil;
// - contatosApi.ts: contatos e solicitações de amizade;
// - circulosApi.ts: círculos, membros, papéis e localizações;
// - dispositivosApi.ts: dispositivos e locais favoritos;
// - historicoApi.ts: rotas e alertas.
