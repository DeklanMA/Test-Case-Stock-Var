#!/bin/sh
set -e

# kalau .env belum ada, copy dari .env.example
if [ ! -f /app/.env ]; then
  echo "⚙️  .env not found — creating from .env.example..."
  cp /app/.env.example /app/.env
fi

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "🚀 Starting FastAPI..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
