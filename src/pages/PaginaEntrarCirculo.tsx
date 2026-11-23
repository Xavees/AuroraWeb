import { useState } from "react";
import { AuthCard } from "../components/ui/Cartoes";
import type { Navigate } from "../types/aplicacao";

export function PaginaEntrarCirculo({ navigate }: { navigate: Navigate }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  return (
    <AuthCard
      title="Entre no seu círculo"
      subtitle="Você ainda não participa de um círculo. Peça o código de convite a alguém do grupo para se conectar."
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(
            code.trim()
              ? "A entrada por código ainda não está disponível. Nenhum círculo foi vinculado à sua conta."
              : "Informe o código de convite.",
          );
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
        <button className="primary wide" type="submit">
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
