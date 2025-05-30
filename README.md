# Visit Tracker

A full-stack web app to track website visits by country, built with:

- **Frontend:** Next.js 15 (React 19, Zustand)
- **Backend:** Express + Redis

---

## Endpoints (Backend)

```
POST /api/updateCountryCount   → { "countryCode": "US" }
GET  /api/getCountryStats      → { "us": 12, "de": 7 }
```

- Country code must be ISO-3166 alpha-2.
- Counts live in a single Redis hash (`visits`).

---

## Project Structure

```
.
├── backend           # Express + Redis API
│   └── ...
├── frontend          # Next.js 15 app
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## Running Locally (Development)

#### Environment Variables

- Copy or edit `.env.local` in `/frontend`:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3001
  ```
  The frontend will send API requests to the backend using this variable.

### Backend

```bash
cd backend
npm ci
npm run dev
```

API listens on <http://localhost:3001>

### Frontend

```bash
cd frontend
npm ci
npm run dev
```

App runs on <http://localhost:3000>

## Redis (required)

The API needs a running Redis instance on **localhost:6379**.  
Pick whichever setup is easier for you:

| option                                                           | command                                                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Docker** (recommended)                                         | ```bash # start in background\ndocker run --name redis -p 6379:6379 -d redis:7-alpine\n``` |
| **Docker-Compose** (if you already use the project compose file) | ```bash docker compose up -d redis   # starts only the redis service\n```                  |
| **Homebrew (macOS)**                                             | ```bash brew install redis\nbrew services start redis\n```                                 |
| **Chocolatey (Windows)**                                         | ```powershell choco install redis-64\nStart-Service redis\n```                             |

> Check it’s live:

```bash
redis-cli ping          # → PONG
```

---

## Running with Docker Compose

From the project root:

```bash
docker compose up --build
```

- **Frontend:** <http://localhost:3000>
- **Backend API:** <http://localhost:3001>
- **Redis:** Exposed at `localhost:6379` (internally as `redis:6379`)

#### Docker Compose Environment Variables

No `.env` files needed. Variables are set in `docker-compose.yml` for both frontend and backend.

---

## Environment (Backend)

| var            | default | purpose                 |
| -------------- | ------- | ----------------------- |
| `EXPRESS_PORT` | `3001`  | API port                |
| `REDIS_HOST`   | `redis` | hostname inside compose |
| `REDIS_PORT`   | `6379`  | Redis TCP port          |

---

## Testing

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

---

## Benchmarks (Backend)

*All benchmarks performed inside a Docker container on a laptop with Intel i7-12700H (14 cores, 20 threads).*

Note:
Actual performance may vary based on host machine, Docker settings, and concurrent system load.

### POST /api/updateCountryCount

| metric      | result                |
| ----------- | --------------------- |
| Throughput  | **~6,850 req/s**      |
| p95 latency | ~44 ms                |
| Total       | 206k requests in 30 s |
| Errors      | 0 (all 202)           |

```bash
npx autocannon -c 200 -d 30 -m POST -H "Content-Type: application/json" -b '{"countryCode":"US"}' --renderStatusCodes http://localhost:3001/api/updateCountryCount
```

### GET /api/getCountryStats

| metric      | result                |
| ----------- | --------------------- |
| Throughput  | **~9,000 req/s**      |
| p95 latency | ~35 ms                |
| Total       | 270k requests in 30 s |
| Errors      | 0 (all 200)           |

```bash
npx autocannon -c 200 -d 30 --renderStatusCodes http://localhost:3001/api/getCountryStats
```

---

## Notes

- Redis persistence (AOF) is enabled.
- Health check at `/healthz` returns "200" if the app can ping Redis.
- Horizontal scaling: `docker compose up --scale backend=4`.
- For frontend/backend local development, ensure both apps are running and environment variables are set as above.
