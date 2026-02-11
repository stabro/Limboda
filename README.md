# Limboda Samfällighet App (MVP)

Next.js App Router + TypeScript + Prisma + SQLite.

## 1) Setup

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

## 2) Run locally

```bash
npm run dev
```

Open http://localhost:3000

Demo users (password `password123`):
- `user@limboda.se` (standard)
- `firm@limboda.se` (firmatecknare)
- `board@limboda.se` (styrelsen)

## 3) Build

```bash
npm run build
```

## 4) Codespaces

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Notes
- SQLite is used in development (`prisma/schema.prisma`).
- To move to Postgres later, change datasource provider + `DATABASE_URL` and migrate.
- Server-side role checks happen through `requireUser(...)` in pages and API routes.
- All write operations create audit-log rows.
