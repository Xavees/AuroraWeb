import { useAutenticacao } from "../hooks/useAutenticacao";
import { criarCirculo } from "../services/api/circulosApi";
import { useState } from "react";
import { AuthCard } from "../components/ui/Cartoes";
import type { Navigate } from "../types/aplicacao";

export function PaginaCriarCirculo({ navigate }: { navigate: Navigate }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { token } = useAutenticacao();

  return (
    <AuthCard
      title="Crie seu círculo"
      subtitle="Reúna suas pessoas de confiança em um só lugar. Escolha um nome para começar."
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
            await criarCirculo(name.trim(), token);
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
          <span>Nome do círculo</span>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
            placeholder="Ex.: Minha família"
            required
            minLength={3}
            maxLength={100}
            aria-describedby="circle-name-help"
          />
          <small id="circle-name-help">
            De 3 a 100 caracteres · {name.length}/100
          </small>
        </label>
        <div className="circle-creation-info">
          <h2>Você cuida do seu círculo</h2>
          <p>
            Ao criar, você será o administrador e poderá gerenciar os
            participantes.
          </p>
          <p>
            Um código de convite será gerado para você compartilhar com suas
            pessoas de confiança.
          </p>
        </div>
        <button className="primary wide" type="submit" disabled={enviando}>
          Criar círculo
        </button>
        {message && <p role="status">{message}</p>}
        <button
          className="link centered"
          type="button"
          onClick={() => navigate("join-circle")}
        >
          Já tenho um código de convite
        </button>
      </form>
    </AuthCard>
  );
}
