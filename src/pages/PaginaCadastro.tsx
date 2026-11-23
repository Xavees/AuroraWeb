import { AuthCard } from "../components/ui/Cartoes";
import { Check, Field } from "../components/ui/ControlesFormulario";
import type { Navigate } from "../types/aplicacao";

// Tela de criação de conta.
export function PaginaCadastro({ navigate }: { navigate: Navigate }) {
  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Comece agora a proteger quem você ama."
    >
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <Field label="Nome completo" placeholder="Seu nome" />
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field
          label="Senha"
          type="password"
          placeholder="Mínimo de 8 caracteres"
        />
        <Field
          label="Confirme a senha"
          type="password"
          placeholder="Repita sua senha"
        />
        <Check label="Li e aceito os Termos de Uso e Privacidade" />
        {/* AQUI VOCÊ VAI DESENVOLVER COM API REST: cadastro, regras de senha e termos. */}
        <button className="primary wide">Criar minha conta</button>
        <p className="form-note">
          Já possui uma conta?{" "}
          <button
            className="link"
            type="button"
            onClick={() => navigate("login")}
          >
            Entrar
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
