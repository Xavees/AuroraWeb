import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
const fonte = readFileSync(new URL("../src/services/sessao.ts", import.meta.url), "utf8");
const js = ts.transpileModule(fonte, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { interpretarSessao } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
const agora = 1700000000000;
function resposta(payload, expires_in = 900) {
  return { access_token: "header." + Buffer.from(JSON.stringify(payload)).toString("base64url") + ".assinatura", token_type: "Bearer", expires_in };
}
test("preserva ID grande e usa o menor prazo de expiração", () => {
  const dados = resposta({ sub: "9007199254740993", exp: agora / 1000 + 600 });
  const sessao = interpretarSessao(dados, agora);
  assert.equal(sessao.usuarioId, "9007199254740993");
  assert.equal(sessao.expiraEm, agora + 600000);
  assert.equal(interpretarSessao(dados, agora - 1000000).expiraEm, agora - 100000);
});
test("rejeita token expirado e contratos inválidos", () => {
  for (const dados of [
    resposta({ sub: "1", exp: agora / 1000 - 1 }),
    resposta({ sub: 1, exp: agora / 1000 + 900 }),
    resposta({ sub: "1" }),
    resposta({ sub: "1", exp: agora / 1000 + 900 }, 0),
    { access_token: "invalido", token_type: "Bearer", expires_in: 900 },
  ]) assert.throws(() => interpretarSessao(dados, agora));
});
