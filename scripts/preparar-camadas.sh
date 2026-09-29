#!/usr/bin/env bash
# Uso: bash scripts/preparar-camadas.sh consultorio-vazio.png hellen-recorte.png
# Prepara as camadas do hero no mesmo tamanho (1672x941) para alinharem perfeitamente.
set -euo pipefail
DIR="$(dirname "$0")/../src/assets/hero"; mkdir -p "$DIR"
ffmpeg -y -v error -i "$1" -vf "scale=1672:941:force_original_aspect_ratio=increase,crop=1672:941" -q:v 2 "$DIR/fundo.jpg"
ffmpeg -y -v error -i "$2" -vf "scale=1672:941:force_original_aspect_ratio=increase,crop=1672:941,format=rgba" "$DIR/pessoa.png"
ls -la "$DIR"
