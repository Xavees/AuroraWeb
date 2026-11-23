import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test, after } from "node:test";
import ts from "typescript";

const originalFetch = globalThis.fetch;
after(() => { globalThis.fetch = originalFetch; });
function carregarCliente(url) {
  const fonte = readFileSync(new URL("../src/services/api/clienteApi.ts", import.meta.url), "utf8")
    .replace("import.meta.env.VITE_API_URL", JSON.stringify(url));
  const js = ts.transpileModule(fonte, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
}
test("cliente Nest: configuração, Bearer, erros e resposta vazia", async () => {
  const semUrl = await carregarCliente("");
  globalThis.fetch = async () => { throw new Error("Não deveria enviar requisição"); };
  await assert.rejects(semUrl.requisicaoApi("/circulos"), /não foi configurada/);
  const { requisicaoApi, ErroApi } = await carregarCliente("http://localhost:3000///");
  const controller = new AbortController();
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "http://localhost:3000/circulos");
    assert.equal(options.headers.get("Authorization"), "Bearer exemplo");
    assert.equal(options.headers.get("Content-Type"), "application/json");
    assert.equal(options.signal, controller.signal);
    assert.equal(options.body, '{"nome":"Família"}');
    return Response.json({ id: "9007199254740993" });
  };
  assert.deepEqual(await requisicaoApi("/circulos", {
    token: "exemplo", method: "POST", body: '{"nome":"Família"}', signal: controller.signal,
  }), { id: "9007199254740993" });
  for (const message of ["Credenciais inválidas.", ["Nome inválido.", "Email inválido."]]) {
    globalThis.fetch = async () => Response.json({ message }, { status: 400 });
    await assert.rejects(requisicaoApi("/auth/login"), error =>
      error instanceof ErroApi && error.status === 400 &&
      error.message === (Array.isArray(message) ? message.join(" ") : message));
  }
  globalThis.fetch = async () => new Response(null, { status: 204 });
  assert.equal(await requisicaoApi("/circulos/1", { method: "DELETE" }), undefined);
  globalThis.fetch = async () => new Response("indisponível", { status: 502 });
  await assert.rejects(requisicaoApi("/circulos"), error => error.status === 502);
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers.has("Authorization"), false);
    return Response.json([]);
  };
  await requisicaoApi("/circulos");
});
