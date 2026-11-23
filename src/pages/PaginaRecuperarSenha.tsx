import { useState } from "react";
import { AuthCard } from "../components/ui/Cartoes";
import { Field } from "../components/ui/ControlesFormulario";
import type { Navigate } from "../types/aplicacao";

// Solicita o e-mail usado na recuperação de senha.
export function PaginaRecuperarSenha({ navigate }: { navigate: Navigate }) {
  const [message, setMessage] = useState("");
  return (
    <AuthCard
      title="Esqueceu sua senha?"
      subtitle="Informe seu e-mail e enviaremos um código de verificação."
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(
            "A recuperação de senha ainda não está disponível. Tente novamente mais tarde.",
          );
        }}
      >
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        {/* AQUI VOCÊ VAI DESENVOLVER COM API REST: envio do código de recuperação. */}
        <button className="primary wide">Enviar código</button>
        <p role="status">{message}</p>
        <button
          className="link centered"
          type="button"
          onClick={() => navigate("login")}
        >
          ← Voltar para o login
        </button>
      </form>
    </AuthCard>
  );
}
