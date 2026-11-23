import { useEffect, useState } from "react";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import { enderecoFoto } from "../../services/api/usuariosApi";

export function FotoPerfil() {
  const { usuario, enviarFoto } = useAutenticacao();
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [previa, setPrevia] = useState<string | null>(null);
  const [erroImagem, setErroImagem] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  useEffect(
    () => () => {
      if (previa) URL.revokeObjectURL(previa);
    },
    [previa],
  );
  const foto = arquivo ? previa : enderecoFoto(usuario?.fotoUrl ?? null);
  async function salvar() {
    if (!arquivo || enviando) return;
    setEnviando(true);
    setMensagem("");
    try {
      await enviarFoto(arquivo);
      setArquivo(null);
      setPrevia(null);
      setMensagem("Foto atualizada.");
    } catch (erro) {
      setMensagem(
        erro instanceof Error && !(erro instanceof TypeError)
          ? erro.message
          : "Não foi possível enviar a foto. Tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }
  return (
    <div className="profile-photo">
      <span>
        {foto && erroImagem !== foto ? (
          <img
            src={foto}
            alt="Foto de perfil"
            referrerPolicy="no-referrer"
            onError={() => setErroImagem(foto)}
          />
        ) : (
          usuario?.nome.charAt(0).toUpperCase()
        )}
      </span>
      <label className="link">
        Escolher foto
        <input
          aria-label="Escolher foto"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={enviando}
          onChange={(event) => {
            const selecionado = event.target.files?.[0];
            event.target.value = "";
            if (!selecionado) return;
            if (
              !["image/jpeg", "image/png", "image/webp"].includes(
                selecionado.type,
              ) ||
              selecionado.size > 5 * 1024 * 1024
            ) {
              setMensagem("Escolha uma imagem JPG, PNG ou WebP de até 5 MB.");
              return;
            }
            setPrevia(URL.createObjectURL(selecionado));
            setArquivo(selecionado);
            setMensagem("");
            setErroImagem(null);
          }}
        />
      </label>
      <small>JPG, PNG ou WebP · até 5 MB</small>
      {arquivo && (
        <>
          <button
            type="button"
            className="primary"
            disabled={enviando}
            onClick={() => void salvar()}
          >
            {enviando ? "Enviando…" : "Salvar foto"}
          </button>
          <button
            type="button"
            className="link"
            disabled={enviando}
            onClick={() => {
              setArquivo(null);
              setPrevia(null);
              setMensagem("");
            }}
          >
            Cancelar
          </button>
        </>
      )}
      {mensagem && <p role="status">{mensagem}</p>}
    </div>
  );
}
