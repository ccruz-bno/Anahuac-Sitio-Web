#!/usr/bin/env node
// Gate de readiness (ver docs/readiness.md): impide construir sobre un design system vacío.
// Falla si EXISTE código de adapter mientras el DS no está listo, o si hay placeholders sin resolver.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

const ROOT = process.cwd();
const ADAPTERS = join(ROOT, "adapters");

// ¿Qué cuenta como "código construido" en un adapter? (no docs)
const BUILD_EXT = new Set([".html", ".php", ".astro"]);
const BUILD_NAMES = new Set(["fields.json", "block.json", "module.html", "render.php"]);
const IGNORE_NAMES = new Set(["README.md", ".gitkeep"]);

function walk(dir) {
  let out = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

const adapterFiles = walk(ADAPTERS).filter((f) => !IGNORE_NAMES.has(basename(f)));
const buildFiles = adapterFiles.filter(
  (f) => BUILD_EXT.has(extname(f)) || BUILD_NAMES.has(basename(f)) || basename(f) === "tokens.css"
);

const problems = [];

// 1) Placeholders sin resolver en cualquier archivo de adapter → nunca se mergean.
for (const f of adapterFiles) {
  if ([".html", ".php", ".astro", ".css", ".json"].includes(extname(f))) {
    if (readFileSync(f, "utf8").includes("[PLACEHOLDER]")) {
      problems.push(`Placeholder sin resolver: ${f.replace(ROOT + "/", "")}`);
    }
  }
}

// Si no hay código construido aún, no exigimos readiness del DS (clean install válido).
if (buildFiles.length > 0) {
  // 2) figmaIngested debe ser true
  let ingested = false;
  try {
    ingested = JSON.parse(readFileSync(join(ROOT, "project.json"), "utf8"))?.status?.figmaIngested === true;
  } catch {}
  if (!ingested) {
    problems.push("Hay código en adapters/ pero project.json → status.figmaIngested != true. Completa la ingesta de Figma (docs/readiness.md).");
  }

  // 3) Tokens no pueden seguir en TODO
  const tokensDoc = join(ROOT, "design", "01-tokens.md");
  if (existsSync(tokensDoc) && readFileSync(tokensDoc, "utf8").includes("TODO")) {
    problems.push("design/01-tokens.md aún contiene TODO: el design system no está poblado.");
  }
}

if (problems.length) {
  console.error("\n✖ Gate de readiness no superado (docs/readiness.md):\n");
  for (const p of problems) console.error("  - " + p);
  console.error("");
  process.exit(1);
}
console.log("✓ check:readiness — OK (clean install o design system poblado y sin placeholders).");
