#!/usr/bin/env bash
# Copia las imágenes del sitio (assets/ en la raíz) dentro del theme de HubSpot,
# para que el theme sea autocontenido y subible con `hs upload`.
# Excluye .mp4 (los videos se sustituyen por imágenes poster → mejor Core Web Vitals).
#
# Uso:  bash adapters/hubspot/sync-assets.sh
# Correr ANTES de `hs upload` (las imágenes están gitignored para no duplicar 60 MB en el repo).

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/assets/"
DEST="$ROOT/adapters/hubspot/theme/images/"

mkdir -p "$DEST"
rsync -a --delete --exclude='*.mp4' --exclude='.DS_Store' "$SRC" "$DEST"
echo "[ok] Imágenes sincronizadas en adapters/hubspot/theme/images/ ($(find "$DEST" -type f | wc -l | tr -d ' ') archivos)"
