#!/bin/sh
set -eu

node dist/server.js &
api_pid=$!
nginx_pid=""

cleanup() {
  kill "$api_pid" ${nginx_pid:+"$nginx_pid"} 2>/dev/null || true
}
trap cleanup EXIT
trap 'exit 143' TERM
trap 'exit 130' INT

attempt=0
until wget -q -T 2 -O /dev/null http://127.0.0.1:5050/api/health; do
  if ! kill -0 "$api_pid" 2>/dev/null; then
    wait "$api_pid"
    exit 1
  fi
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo "API did not become ready" >&2
    exit 1
  fi
  sleep 1
done

nginx -g 'daemon off;' &
nginx_pid=$!
while kill -0 "$api_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do
  sleep 1
done
exit 1
