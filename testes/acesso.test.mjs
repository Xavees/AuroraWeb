import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';
const fonte = readFileSync(new URL('../src/config/acesso.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(fonte, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { telaPermitida } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
test('visitantes acessam somente home e fluxos de autenticação', () => {
  for (const tela of ['home','login','signup','forgot']) assert.equal(telaPermitida(tela, false), tela);
  for (const tela of ['risk-map','contacts','trusted-contact-invite','history','circles','join-circle','create-circle','plans','profile']) {
    assert.equal(telaPermitida(tela, false), 'login');
    assert.equal(telaPermitida(tela, true), tela);
  }
});
