import pageIcon from "../assets/Home/svg/historicoLocalsVG.png";
import { useEffect, useState } from "react";
import { PageCard } from "../components/ui/Cartoes";
import { useAutenticacao } from "../hooks/useAutenticacao";
import {
  buscarLocalizacao,
  listarHistorico,
  periodoHistorico,
  type FiltrosHistorico,
  type HistoricoPaginado,
  type RegistroLocalizacao,
} from "../services/api/historicoLocalizacaoApi";

const mensagemErro = (erro: unknown) =>
  erro instanceof Error && !(erro instanceof TypeError)
    ? erro.message
    : "Não foi possível acessar o histórico. Verifique sua conexão e tente novamente.";
const horario = (data: string) => new Date(data).toLocaleString("pt-BR");

export function PaginaHistoricoLocalizacao() {
  const { token } = useAutenticacao();
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [erroFiltro, setErroFiltro] = useState("");
  const [filtros, setFiltros] = useState<FiltrosHistorico>({
    inicio: "",
    fim: "",
    pagina: 1,
  });
  const [tentativa, setTentativa] = useState(0);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const chave = JSON.stringify([filtros, tentativa, token]);
  const [resultado, setResultado] = useState<{
    chave: string;
    dados?: HistoricoPaginado;
    erro?: string;
  } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function carregar() {
      try {
        const dados = await listarHistorico(
          filtros,
          token ?? "",
          controller.signal,
        );
        if (!controller.signal.aborted) setResultado({ chave, dados });
      } catch (erro) {
        if (!controller.signal.aborted)
          setResultado({ chave, erro: mensagemErro(erro) });
      }
    }
    void carregar();
    return () => controller.abort();
  }, [chave, filtros, token]);
  const atual = resultado?.chave === chave ? resultado : null;
  const dados = atual?.dados;
  function aplicar(novos: FiltrosHistorico) {
    try {
      periodoHistorico(novos.inicio, novos.fim);
      setErroFiltro("");
      setSelecionado(null);
      setFiltros(novos);
      setTentativa((valor) => valor + 1);
    } catch (erro) {
      setErroFiltro(mensagemErro(erro));
    }
  }
  return (
    <PageCard
      title="Histórico de localização"
      subtitle="Consulte suas localizações registradas, das mais recentes às mais antigas."
      icon={<img src={pageIcon} alt="" />}
      wide
    >
      <form
        className="location-history-filters"
        onSubmit={(event) => {
          event.preventDefault();
          aplicar({ inicio, fim, pagina: 1 });
        }}
      >
        <label className="field">
          <span>Data inicial</span>
          <input
            type="date"
            value={inicio}
            onChange={(event) => setInicio(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Data final</span>
          <input
            type="date"
            value={fim}
            onChange={(event) => setFim(event.target.value)}
          />
        </label>
        <button className="primary" type="submit">
          Consultar
        </button>
        <button
          className="secondary"
          type="button"
          onClick={() => {
            setInicio("");
            setFim("");
            aplicar({ inicio: "", fim: "", pagina: 1 });
          }}
        >
          Limpar filtros
        </button>
      </form>
      <p className="form-note">
        Datas e horários exibidos no fuso do seu dispositivo.
      </p>
      {erroFiltro && <p role="alert">{erroFiltro}</p>}
      {!atual && <p role="status">Carregando histórico…</p>}
      {atual?.erro && (
        <div role="alert">
          <p>{atual.erro}</p>
          <button
            className="secondary"
            onClick={() => setTentativa((valor) => valor + 1)}
          >
            Tentar novamente
          </button>
        </div>
      )}
      {dados && (
        <>
          <p role="status">{dados.total} registros encontrados</p>
          {dados.registros.length ? (
            <ol className="location-history-list">
              {dados.registros.map((registro) => (
                <li key={registro.id}>
                  <span className="history-icon" aria-hidden="true">
                    ⌖
                  </span>
                  <div className="history-record-data">
                    <strong>
                      {registro.latitude.toFixed(6)},{" "}
                      {registro.longitude.toFixed(6)}
                    </strong>
                    <time dateTime={registro.dataHoraGps}>
                      {horario(registro.dataHoraGps)}
                    </time>
                    <button
                      className="secondary"
                      aria-expanded={selecionado === registro.id}
                      onClick={() =>
                        setSelecionado(
                          selecionado === registro.id ? null : registro.id,
                        )
                      }
                    >
                      {selecionado === registro.id
                        ? "Fechar detalhes"
                        : "Ver detalhes"}
                    </button>
                    {selecionado === registro.id && (
                      <DetalhesLocalizacao
                        key={registro.id}
                        id={registro.id}
                        token={token ?? ""}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="location-history-empty">
              <h2>
                {filtros.inicio || filtros.fim
                  ? "Nenhum registro neste período"
                  : "Seu histórico começa aqui"}
              </h2>
              <p>
                {filtros.inicio || filtros.fim
                  ? "Experimente outro período ou limpe os filtros."
                  : "As localizações aparecerão aqui quando forem registradas na sua conta."}
              </p>
            </div>
          )}
          {dados.totalPaginas > 1 && (
            <nav
              className="history-pagination"
              aria-label="Páginas do histórico"
            >
              <button
                className="secondary"
                disabled={dados.pagina <= 1}
                onClick={() =>
                  aplicar({ ...filtros, pagina: dados.pagina - 1 })
                }
              >
                Anterior
              </button>
              <span>
                Página {dados.pagina} de {dados.totalPaginas}
              </span>
              <button
                className="secondary"
                disabled={dados.pagina >= dados.totalPaginas}
                onClick={() =>
                  aplicar({ ...filtros, pagina: dados.pagina + 1 })
                }
              >
                Próxima
              </button>
            </nav>
          )}
        </>
      )}
    </PageCard>
  );
}

function DetalhesLocalizacao({ id, token }: { id: string; token: string }) {
  const [resultado, setResultado] = useState<{
    registro?: RegistroLocalizacao;
    erro?: string;
  } | null>(null);
  const [tentativa, setTentativa] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    buscarLocalizacao(id, token, controller.signal)
      .then((registro) => {
        if (!controller.signal.aborted) setResultado({ registro });
      })
      .catch((erro: unknown) => {
        if (!controller.signal.aborted)
          setResultado({ erro: mensagemErro(erro) });
      });
    return () => controller.abort();
  }, [id, token, tentativa]);
  if (!resultado) return <p role="status">Carregando detalhes…</p>;
  if (resultado.erro)
    return (
      <div role="alert">
        <p>{resultado.erro}</p>
        <button
          className="secondary"
          onClick={() => {
            setResultado(null);
            setTentativa((valor) => valor + 1);
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  const registro = resultado.registro!;
  const mapa = `https://www.openstreetmap.org/?mlat=${registro.latitude}&mlon=${registro.longitude}#map=17/${registro.latitude}/${registro.longitude}`;
  return (
    <section className="history-details" aria-label="Detalhes da localização">
      <dl>
        <div>
          <dt>Latitude</dt>
          <dd>{registro.latitude}</dd>
        </div>
        <div>
          <dt>Longitude</dt>
          <dd>{registro.longitude}</dd>
        </div>
        <div>
          <dt>Altitude</dt>
          <dd>
            {registro.altitudeMetros === null
              ? "Não informada"
              : `${registro.altitudeMetros} m`}
          </dd>
        </div>
        <div>
          <dt>Velocidade</dt>
          <dd>
            {registro.velocidadeKmh === null
              ? "Não informada"
              : `${registro.velocidadeKmh} km/h`}
          </dd>
        </div>
        <div>
          <dt>Horário do GPS</dt>
          <dd>{horario(registro.dataHoraGps)}</dd>
        </div>
        <div>
          <dt>Recebido em</dt>
          <dd>{horario(registro.recebidoEm)}</dd>
        </div>
      </dl>
      <a
        className="secondary"
        href={mapa}
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir no OpenStreetMap ↗
      </a>
    </section>
  );
}
