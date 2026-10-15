#!/usr/bin/env bash
# Render tools/covers.html into assets/covers/<id>.webp (needs Chrome + ImageMagick and a local server on :8000).
#   python3 -m http.server 8000 &   then   tools/render-covers.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/covers
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
for id in between-sessions aquaagent iris krishiflow agriphenotyper arogyascript saferx; do
  google-chrome-stable --headless=new --no-sandbox --hide-scrollbars --user-data-dir="$tmp/profile" \
    --window-size=1200,900 --virtual-time-budget=4000 --screenshot="$tmp/$id.png" \
    "http://127.0.0.1:8000/tools/covers.html?p=$id" >/dev/null 2>&1
  magick "$tmp/$id.png" -quality 86 "assets/covers/$id.webp"
  echo "assets/covers/$id.webp"
done
