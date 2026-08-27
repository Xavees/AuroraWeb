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

// Tela de criação de conta.
export function SignupPage({ navigate }: { navigate: Navigate }) {
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
        {/* AQUI VOCÊ VAI DESENVOLVER: cadastro, regras de senha e termos. */}
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

// Tela que solicita o e-mail para recuperar a senha.
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

// Tela para digitar o código de verificação.
export function OtpPage() {
  return (
    <AuthCard
      title="Código de verificação"
      subtitle="Digite o código de 4 dígitos enviado para seu e-mail."
    >
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <div className="otp-row">
          {[1, 2, 3, 4].map((number) => (
            <input
              key={number}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Dígito ${number}`}
            />
          ))}
        </div>
        {/* AQUI VOCÊ VAI DESENVOLVER: validação, expiração e reenvio do OTP. */}
        <button className="primary wide">Confirmar código</button>
        <button className="link centered" type="button">
          Reenviar código
        </button>
      </form>
    </AuthCard>
  );
}
