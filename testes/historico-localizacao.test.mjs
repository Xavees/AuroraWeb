import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';
const fonte = readFileSync(new URL('../src/services/api/historicoLocalizacaoApi.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(fonte, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText.replace(/import \{ requisicaoApi \} from ".\/clienteApi";/, 'const requisicaoApi = (...args) => globalThis.chamadaHistorico(...args);');
const api = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

test('histórico envia paginação, período com fuso e token sem escolher outro usuário', async () => {
  const chamadas = [];
  globalThis.chamadaHistorico = async (rota, opcoes) => { chamadas.push({ rota, ...opcoes }); };
  const signal = new AbortController().signal;
  await api.listarHistorico({ inicio: '2026-11-01', fim: '2026-11-24', pagina: 2 }, 'jwt', signal);
  const url = new URL(chamadas[0].rota, 'http://localhost');
  assert.equal(url.pathname, '/historico-localizacao/me');
  assert.equal(url.searchParams.get('pagina'), '2');
  assert.equal(url.searchParams.get('limite'), '20');
  assert.equal(url.searchParams.has('usuarioId'), false);
  assert.equal(url.searchParams.get('dataInicio'), new Date(2026, 10, 1).toISOString());
  assert.equal(url.searchParams.get('dataFim'), new Date(2026, 10, 24, 23, 59, 59, 999).toISOString());
  assert.equal(chamadas[0].token, 'jwt');
  assert.equal(chamadas[0].signal, signal);
  await api.buscarLocalizacao('9007199254740993', 'jwt', signal);
  assert.equal(chamadas[1].rota, '/historico-localizacao/me/9007199254740993');
  assert.equal(chamadas[1].token, 'jwt');
  assert.equal(chamadas[1].signal, signal);
  await api.listarHistorico({ inicio: '', fim: '', pagina: 1 }, 'jwt');
  assert.equal(chamadas[2].rota, '/historico-localizacao/me?pagina=1&limite=20');
  assert.throws(() => api.buscarLocalizacao('1', ''), /Entre novamente/);
  delete globalThis.chamadaHistorico;
});
test('período rejeita datas impossíveis e invertidas e aceita limites opcionais', () => {
  assert.throws(() => api.periodoHistorico('2026-02-30', ''), /data válida/);
  assert.throws(() => api.periodoHistorico('2026-11-25', '2026-11-24'), /posterior/);
  assert.equal(api.periodoHistorico('', '2026-11-24').dataInicio, undefined);
  assert.equal(api.periodoHistorico('2026-11-24', '').dataFim, undefined);
});
