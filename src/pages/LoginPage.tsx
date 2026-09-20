import { useState, type FormEvent } from "react";
import { AuthCard } from "../components/ui/Cards";
import { Check, Field } from "../components/ui/FormControls";
import { useAutenticacao } from "../hooks/useAutenticacao";
import type { Navigate } from "../types/app";

// Tela de entrada do usuário.
export function LoginPage({ navigate }: { navigate: Navigate }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { entrar } = useAutenticacao();

  // Exibe o resultado da autenticação na própria tela.
  async function enviarLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      await entrar({ email, senha }, manterConectado);
      navigate("profile");
    } catch (erro) {
      setMensagem(
        erro instanceof Error
          ? erro.message
          : "Não foi possível acessar a API.",
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthCard
      title="Boas-vindas de volta"
      subtitle="Entre para acessar sua rede Aurora."
    >
      <form className="form" onSubmit={enviarLogin}>
        <Field
          label="E-mail"
          type="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Field
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
        />
        <div className="form-between">
          <Check
            label="Manter conectado"
            checked={manterConectado}
            onChange={(event) => setManterConectado(event.target.checked)}
          />
          <button
            className="link"
            type="button"
            onClick={() => navigate("forgot")}
          >
            Esqueci a senha
          </button>
        </div>
        {mensagem && <p className="api-message erro">{mensagem}</p>}
        <button className="primary wide" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
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
