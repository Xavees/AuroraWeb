import { useAutenticacao } from "../hooks/useAutenticacao";
import { entrarNoCirculo } from "../services/api/circulosApi";
import { useState } from "react";
import { AuthCard } from "../components/ui/Cartoes";
import type { Navigate } from "../types/aplicacao";

export function PaginaEntrarCirculo({ navigate }: { navigate: Navigate }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { token } = useAutenticacao();

  return (
    <AuthCard
      title="Entre no seu círculo"
      subtitle="Peça o código de convite a alguém do grupo para se conectar."
    >
      <form
        className="form"
        onSubmit={async (event) => {
          event.preventDefault();
          if (enviando) return;
          setEnviando(true);
          setMessage("");
          try {
            if (!token) throw new Error("Entre novamente na sua conta.");
            await entrarNoCirculo(code.trim().toUpperCase(), token);
            navigate("circles");
          } catch (erro) {
            setMessage(
              erro instanceof Error && !(erro instanceof TypeError)
                ? erro.message
                : "Não foi possível acessar os círculos. Tente novamente.",
            );
          } finally {
            setEnviando(false);
          }
        }}
      >
        <label className="field">
          <span>Código do círculo</span>
          <input
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setMessage("");
            }}
            placeholder="Digite ou cole o código"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            required
            aria-describedby="circle-code-help"
          />
        </label>
        <p id="circle-code-help">
          Use o código compartilhado por um participante do círculo.
        </p>
        <button className="primary wide" type="submit" disabled={enviando}>
          Entrar no círculo
        </button>
        <button
          className="secondary wide"
          type="button"
          onClick={() => navigate("create-circle")}
        >
          Criar um círculo
        </button>
        {message && <p role="status">{message}</p>}
        <button
          className="link centered"
          type="button"
          onClick={() => navigate("home")}
        >
          ← Voltar ao início
        </button>
      </form>
    </AuthCard>
  );
}
