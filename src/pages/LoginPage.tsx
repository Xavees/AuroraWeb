import { AuthCard } from "../components/ui/Cards";
import { Check, Field } from "../components/ui/FormControls";
import type { Navigate } from "../types/app";

// Tela de entrada do usuário.
export function LoginPage({ navigate }: { navigate: Navigate }) {
  return (
    <AuthCard
      title="Boas-vindas de volta"
      subtitle="Entre para acessar sua rede Aurora."
    >
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field label="Senha" type="password" placeholder="Sua senha" />
        <div className="form-between">
          <Check label="Manter conectado" />
          <button
            className="link"
            type="button"
            onClick={() => navigate("forgot")}
          >
            Esqueci a senha
          </button>
        </div>
        {/* AQUI VOCÊ VAI DESENVOLVER: autenticação e validação do login. */}
        <button className="primary wide">Entrar</button>
        <p className="form-note">
          Ainda não tem conta?{" "}
          <button
            className="link"
            type="button"
            onClick={() => navigate("signup")}
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
