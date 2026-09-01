import { AuthCard } from "../components/ui/Cards";
import { Field } from "../components/ui/FormControls";
import type { Navigate } from "../types/app";

// Solicita o e-mail usado na recuperação de senha.
export function ForgotPasswordPage({ navigate }: { navigate: Navigate }) {
  return (
    <AuthCard
      title="Esqueceu sua senha?"
      subtitle="Informe seu e-mail e enviaremos um código de verificação."
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("otp");
        }}
      >
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        {/* AQUI VOCÊ VAI DESENVOLVER: envio real do código de recuperação. */}
        <button className="primary wide">Enviar código</button>
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
