import { requisicaoApi } from "./clienteApi";
import type { UsuarioSessao } from "../../contexts/contextoAutenticacao";

type RespostaUsuario = Omit<UsuarioSessao, "telefone"> & {
  telefone: string | null;
};
export async function buscarUsuario(
  id: string,
  token: string,
  signal?: AbortSignal,
): Promise<UsuarioSessao> {
  const usuario = await requisicaoApi<RespostaUsuario>(
    `/usuarios/${encodeURIComponent(id)}`,
    { token, signal },
  );
  if (
    usuario.id !== id ||
    typeof usuario.nome !== "string" ||
    typeof usuario.email !== "string"
  ) {
    throw new Error("Não foi possível carregar seu perfil.");
  }
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone ?? "",
    fotoUrl: usuario.fotoUrl ?? null,
  };
}

export async function atualizarUsuario(
  id: string,
  token: string,
  dados: import("../../types/autenticacao").DadosPerfil,
): Promise<UsuarioSessao> {
  const nome = dados.nome.trim();
  if (nome.length < 2 || nome.length > 100)
    throw new Error("O nome deve ter entre 2 e 100 caracteres.");
  if (dados.telefone !== undefined && !/^\+?[0-9]{10,15}$/.test(dados.telefone))
    throw new Error("Telefone deve conter entre 10 e 15 dígitos.");
  if (dados.fotoUrl !== undefined) {
    let valida = false;
    try {
      const url = new URL(dados.fotoUrl);
      valida =
        url.protocol === "https:" &&
        !!url.hostname &&
        dados.fotoUrl.length <= 255;
    } catch {
      /* URL inválida */
    }
    if (!valida)
      throw new Error("Use um link HTTPS para a foto, com até 255 caracteres.");
  }
  const usuario = await requisicaoApi<RespostaUsuario>(
    `/usuarios/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      token,
      body: JSON.stringify({
        nome,
        telefone: dados.telefone,
        fotoUrl: dados.fotoUrl,
      }),
    },
  );
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone ?? "",
    fotoUrl: usuario.fotoUrl ?? null,
  };
}

export function enderecoFoto(foto: string | null): string | null {
  if (!foto) return null;
  if (foto.startsWith("/uploads/perfis/")) {
    const base = import.meta.env.VITE_API_URL?.trim();
    return base ? new URL(foto, base).href : null;
  }
  try {
    const url = new URL(foto);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export async function enviarFotoPerfil(
  arquivo: File,
  token: string,
): Promise<UsuarioSessao> {
  if (arquivo.size > 5 * 1024 * 1024)
    throw new Error("A foto deve ter até 5 MB.");
  if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type))
    throw new Error("Escolha uma foto JPG, PNG ou WebP.");
  const formulario = new FormData();
  formulario.append("foto", arquivo);
  const usuario = await requisicaoApi<RespostaUsuario>("/usuarios/eu/foto", {
    method: "POST",
    token,
    body: formulario,
  });
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone ?? "",
    fotoUrl: usuario.fotoUrl ?? null,
  };
}
