#!/usr/bin/env bash
# Uso: bash scripts/processar-video.sh video-do-fundo.mp4
# Gera o vídeo do fundo do hero no tamanho exato das camadas (proporção 1672x941),
# com loop sem emenda (crossfade do fim para o começo), sem áudio e leve.
set -euo pipefail
IN="$1"; OUT="$(dirname "$0")/../public/video"; mkdir -p "$OUT"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
XF=1.2
A=$(python3 -c "print(round($DUR-0.1,3))"); OFF=$(python3 -c "print(round($DUR-0.1-$XF,3))")
ffmpeg -y -v error -i "$IN" -filter_complex \
 "[0:v]scale=1672:941:flags=lanczos,setsar=1,fps=24,split[s1][s2];[s1]trim=0:$A,setpts=PTS-STARTPTS[a];[s2]trim=0:$XF,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=$XF:offset=$OFF,trim=start=$XF,setpts=PTS-STARTPTS[v]" \
 -map "[v]" -an -c:v libx264 -crf 14 -preset medium /tmp/loop.mp4
ffmpeg -y -v error -i /tmp/loop.mp4 -vf "scale=1600:900:flags=lanczos" -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart "$OUT/hero-desktop.mp4"
ffmpeg -y -v error -i /tmp/loop.mp4 -vf "scale=960:540:flags=lanczos" -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 27 -preset slow -movflags +faststart "$OUT/hero-mobile.mp4"
ls -la "$OUT"
# Versões WebM (VP9) — alguns navegadores preferem
ffmpeg -y -v error -i "$OUT/hero-desktop.mp4" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 2 -an "$OUT/hero-desktop.webm"
ffmpeg -y -v error -i "$OUT/hero-mobile.mp4" -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 2 -an "$OUT/hero-mobile.webm"
