import iconeEntrar from "../assets/Home/svg/entrarSVG.png";
import iconeCriar from "../assets/Home/svg/criarSVG.png";
import iconeCirculo from "../assets/Home/svg/circulo.png";
import { useEffect, useState, useSyncExternalStore } from "react";
import { PageCard } from "../components/ui/Cartoes";
import { useAutenticacao } from "../hooks/useAutenticacao";
import { listarCirculos, type CirculoApi } from "../services/api/circulosApi";
import { PaginaDetalhesCirculo } from "./PaginaDetalhesCirculo";
import type { Navigate } from "../types/aplicacao";

function observarHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
export function PaginaCirculos({ navigate }: { navigate: Navigate }) {
  const hash = useSyncExternalStore(observarHash, () => window.location.hash);
  const id = new URLSearchParams(hash.split("?")[1]).get("id");
  return id ? (
    <PaginaDetalhesCirculo key={id} id={id} navigate={navigate} />
  ) : (
    <ListaCirculos navigate={navigate} />
  );
}
function ListaCirculos({ navigate }: { navigate: Navigate }) {
  const { token } = useAutenticacao();
  const [lista, setLista] = useState<CirculoApi[] | null>(null);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    if (token)
      listarCirculos(token, controller.signal)
        .then((dados) => {
          if (!controller.signal.aborted) {
            setLista(dados);
            setErro("");
          }
        })
        .catch(() => {
          if (!controller.signal.aborted)
            setErro(
              "Não foi possível carregar seus círculos. Tente novamente.",
            );
        });
    return () => controller.abort();
  }, [token, tentativa]);
  return (
    <PageCard
      title="Círculos"
      subtitle="Escolha seu círculo ou conecte-se a uma nova rede de confiança."
      icon={<img src={iconeCirculo} alt="" />}
      wide
    >
      <section className="circles-overview" aria-labelledby="meus-circulos">
        <h2 id="meus-circulos">Meus círculos</h2>
        <p>
          Selecione um nome para ver os participantes e as opções do círculo.
        </p>
        {erro ? (
          <>
            <p role="alert">{erro}</p>
            <button
              className="secondary"
              onClick={() => {
                setErro("");
                setTentativa((valor) => valor + 1);
              }}
            >
              Tentar novamente
            </button>
          </>
        ) : lista === null ? (
          <p role="status">Carregando círculos…</p>
        ) : lista.length ? (
          <ul className="circles-name-list">
            {lista.map((c) => (
              <li key={c.id}>
                <a href={`#/circles?id=${encodeURIComponent(c.id)}`}>
                  {c.nome}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Você ainda não participa de um círculo. Entre com um código ou crie
            o seu abaixo.
          </p>
        )}
      </section>
      <div className="circles-options">
        <section>
          <span aria-hidden="true" className="circle-option-icon">
            <img src={iconeEntrar} alt="" />
          </span>
          <h2>Entrar em um círculo</h2>
          <p>Recebeu um convite? Use o código compartilhado com você.</p>
          <button className="secondary" onClick={() => navigate("join-circle")}>
            Entrar por código
          </button>
        </section>
        <section>
          <span aria-hidden="true" className="circle-option-icon">
            <img src={iconeCriar} alt="" />
          </span>
          <h2>Criar um círculo</h2>
          <p>Comece sua rede e convide suas pessoas de confiança.</p>
          <button className="primary" onClick={() => navigate("create-circle")}>
            Criar círculo
          </button>
        </section>
      </div>
    </PageCard>
  );
}
