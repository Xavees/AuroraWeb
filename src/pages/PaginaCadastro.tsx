import { useState, type FormEvent } from "react";
import { cadastrarUsuario } from "../services/api/autenticacaoApi";
import { AuthCard } from "../components/ui/Cartoes";
import { Check, Field } from "../components/ui/ControlesFormulario";
import type { Navigate } from "../types/aplicacao";

// Tela de criação de conta.
export function PaginaCadastro({ navigate }: { navigate: Navigate }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;
    if (!nome.trim()) return setErro("Informe seu nome.");
    if (senha.length < 12 || senha.length > 128) {
      return setErro("Use uma senha de 12 a 128 caracteres.");
    }
    if (senha !== confirmacao) return setErro("As senhas precisam ser iguais.");
    if (!aceitouTermos) return setErro("Aceite os termos para continuar.");

    setErro("");
    setEnviando(true);
    try {
      await cadastrarUsuario({ nome: nome.trim(), email: email.trim(), senha });
      setSenha("");
      setConfirmacao("");
      setConcluido(true);
    } catch (erro) {
      setErro(
        erro instanceof Error && !(erro instanceof TypeError)
          ? erro.message
          : "Não foi possível acessar a API do Aurora.",
      );
    } finally {
      setEnviando(false);
    }
  }

  if (concluido) {
    return (
      <AuthCard
        title="Conta criada"
        subtitle="Seu cadastro no Aurora foi concluído."
      >
        <button className="primary wide" onClick={() => navigate("login")}>
          Ir para o login
        </button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Comece agora a proteger quem você ama."
    >
      <form className="form" onSubmit={enviar}>
        <Field
          label="Nome completo"
          placeholder="Seu nome"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Field
          label="E-mail"
          type="email"
          placeholder="voce@exemplo.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Senha"
          type="password"
          placeholder="De 12 a 128 caracteres"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Field
          label="Confirme a senha"
          type="password"
          placeholder="Repita sua senha"
          required
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
        />
        <Check
          checked={aceitouTermos}
          onChange={(e) => setAceitouTermos(e.target.checked)}
          label="Li e aceito os Termos de Uso e Privacidade"
        />
        {erro && (
          <p role="alert" className="api-message erro">
            {erro}
          </p>
        )}
        <button className="primary wide" disabled={enviando}>
          {enviando ? "Criando conta..." : "Criar minha conta"}
        </button>
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
