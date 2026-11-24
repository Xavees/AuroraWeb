import { requisicaoApi } from "./clienteApi";

export type RegistroLocalizacao = {
  id: string;
  usuarioId: string;
  latitude: number;
  longitude: number;
  altitudeMetros: number | null;
  velocidadeKmh: number | null;
  dataHoraGps: string;
  recebidoEm: string;
};
export type HistoricoPaginado = {
  registros: RegistroLocalizacao[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
};
export type FiltrosHistorico = { inicio: string; fim: string; pagina: number };

function exigirToken(token: string) {
  if (!token.trim())
    throw new Error("Entre novamente para consultar seu histórico.");
  return token;
}

// Datas do calendário representam dias inteiros no fuso do navegador.
export function periodoHistorico(inicio: string, fim: string) {
  function converter(valor: string, final: boolean) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor))
      throw new Error("Informe uma data válida.");
    const [ano, mes, dia] = valor.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);
    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes - 1 ||
      data.getDate() !== dia
    )
      throw new Error("Informe uma data válida.");
    if (final) data.setHours(23, 59, 59, 999);
    return data.toISOString();
  }
  const dataInicio = inicio ? converter(inicio, false) : undefined;
  const dataFim = fim ? converter(fim, true) : undefined;
  if (dataInicio && dataFim && dataInicio > dataFim)
    throw new Error("A data inicial não pode ser posterior à data final.");
  return { dataInicio, dataFim };
}

export function listarHistorico(
  filtros: FiltrosHistorico,
  token: string,
  signal?: AbortSignal,
) {
  const periodo = periodoHistorico(filtros.inicio, filtros.fim);
  const query = new URLSearchParams({
    pagina: String(filtros.pagina),
    limite: "20",
  });
  if (periodo.dataInicio) query.set("dataInicio", periodo.dataInicio);
  if (periodo.dataFim) query.set("dataFim", periodo.dataFim);
  return requisicaoApi<HistoricoPaginado>(
    `/historico-localizacao/me?${query}`,
    { token: exigirToken(token), signal },
  );
}

export function buscarLocalizacao(
  id: string,
  token: string,
  signal?: AbortSignal,
) {
  return requisicaoApi<RegistroLocalizacao>(
    `/historico-localizacao/me/${encodeURIComponent(id)}`,
    { token: exigirToken(token), signal },
  );
}
