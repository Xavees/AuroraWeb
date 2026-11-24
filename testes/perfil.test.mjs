import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
const source = readFileSync(new URL("../src/services/api/usuariosApi.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
  .replace(/import \{ requisicaoApi \} from ".\/clienteApi";/, "const requisicaoApi = (...args) => globalThis.requisicaoTeste(...args);");
const { atualizarUsuario } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
test("perfil usa PATCH autenticado e envia apenas campos aceitos", async () => {
  globalThis.requisicaoTeste = async (rota, opcoes) => {
    assert.equal(rota, "/usuarios/12");
    assert.equal(opcoes.method, "PATCH");
    assert.equal(opcoes.token, "teste");
    assert.deepEqual(JSON.parse(opcoes.body), { nome: "Ana", fotoUrl: "https://example.com/foto.jpg" });
    return { id: "12", nome: "Ana", email: "ana@example.com", telefone: null, fotoUrl: "https://example.com/foto.jpg" };
  };
  const perfil = await atualizarUsuario("12", "teste", { nome: " Ana ", fotoUrl: "https://example.com/foto.jpg", email: "ignorado@example.com" });
  assert.equal(perfil.telefone, "");
  assert.equal(perfil.fotoUrl, "https://example.com/foto.jpg");
  globalThis.requisicaoTeste = () => { throw new Error("Não deveria chamar a API"); };
  await assert.rejects(atualizarUsuario("12", "teste", { nome: "A" }), /nome/);
  await assert.rejects(atualizarUsuario("12", "teste", { nome: "Ana", telefone: "123" }), /Telefone/);
  await assert.rejects(atualizarUsuario("12", "teste", { nome: "Ana", fotoUrl: "http://example.com/foto.jpg" }), /HTTPS/);
  delete globalThis.requisicaoTeste;
});
