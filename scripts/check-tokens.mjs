#!/usr/bin/env node
// Gate de consistencia: falla si encuentra valores hardcodeados (hex / px crudos) en CSS de adapters.
// Los archivos de tokens (donde se DEFINEN los primitivos) están exentos.
// Funciona sin dependencias para poder correr en cualquier entorno/modelo.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["adapters"];
const EXEMPT_BASENAMES = new Set(["tokens.css"]); // aquí se definen los primitivos
const HEX = /#[0-9a-fA-F]{3,8}\b/;
// px crudos en propiedades de espaciado/tamaño (fuera de var()): heurística simple
const RAW_PX = /(?<!var\([^)]*)\b\d+px\b/;
// tipografía literal (debe venir de tokens): font-family/font-size sin var()
const RAW_FONT_FAMILY = /font-family\s*:\s*(?!.*var\()/i;
const RAW_FONT_SIZE = /font-size\s*:\s*(?!.*var\()\s*[\d.]+(px|rem|em)\b/i;

function walk(dir) {
  let files = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return files; }
  for (const e of entries) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) files = files.concat(walk(p));
    else if (p.endsWith(".css")) files.push(p);
  }
  return files;
}

const violations = [];
for (const d of SCAN_DIRS) {
  for (const file of walk(join(ROOT, d))) {
    if (EXEMPT_BASENAMES.has(basename(file))) continue;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const code = line.split("/*")[0]; // ignora comentarios simples
      if (HEX.test(code)) violations.push({ file, line: i + 1, kind: "hex", text: line.trim() });
      else if (RAW_FONT_FAMILY.test(code)) violations.push({ file, line: i + 1, kind: "font-family literal", text: line.trim() });
      else if (RAW_FONT_SIZE.test(code)) violations.push({ file, line: i + 1, kind: "font-size literal", text: line.trim() });
      else if (RAW_PX.test(code)) violations.push({ file, line: i + 1, kind: "px crudo", text: line.trim() });
    });
  }
}

if (violations.length) {
  console.error(`\n✖ ${violations.length} valor(es) hardcodeado(s). Usa tokens semánticos (design/01-tokens.md):\n`);
  for (const v of violations) {
    console.error(`  ${v.file.replace(ROOT + "/", "")}:${v.line}  [${v.kind}]  ${v.text}`);
  }
  console.error("");
  process.exit(1);
}
console.log("✓ check:tokens — sin valores hardcodeados en adapters/.");
