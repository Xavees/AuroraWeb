import { useState } from "react";
import { AuthCard } from "../components/ui/Cartoes";
import type { Navigate } from "../types/aplicacao";

export function PaginaCriarCirculo({ navigate }: { navigate: Navigate }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <AuthCard
      title="Crie seu círculo"
      subtitle="Reúna suas pessoas de confiança em um só lugar. Escolha um nome para começar."
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const nome = name.trim();
          if (nome.length < 3 || nome.length > 100) {
            setMessage("O nome deve ter entre 3 e 100 caracteres.");
            return;
          }
          // Contrato Aurora: POST /circulos, { nome }, com autenticação JWT.
          // O servidor define o administrador e gera o código de convite.
          setMessage(
            "A criação de círculos ainda não está disponível. Nenhum círculo foi criado. Tente novamente quando o serviço estiver disponível.",
          );
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
        <button className="primary wide" type="submit">
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
