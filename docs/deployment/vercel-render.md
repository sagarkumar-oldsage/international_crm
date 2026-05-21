# Deployment Guide (Vercel + Render)

## Frontend on Vercel

1. Import this repository in Vercel.
2. Set project root to `apps/web` (or keep root and use `vercel.json`).
3. Set environment variables:
   - `NEXT_PUBLIC_API_BASE_URL`
4. Deploy with Node.js 20+ runtime.

## Backend on Render

1. Create a new Web Service in Render from this repository.
2. Use `render.yaml` or set manually:
   - Root Directory: `apps/api`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:deploy`
3. Configure environment variables:
   - `NODE_ENV=production`
   - `PORT=8080`
   - `DATABASE_URL`
   - `REDIS_URL`
   - `ELASTICSEARCH_URL`
   - `JWT_SECRET`
   - `CORS_ORIGIN`
4. Render startup will run migrations and seeding automatically through `npm run start:deploy`.
5. Migrations are versioned in `apps/api/prisma/migrations`.

## Local Database Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Run `npm run db:setup` from the repository root.
3. Start the backend with `npm run dev:api`.

## Credentials Required From Your Side

1. Vercel account access for project import and domain configuration.
2. Render account access for service provisioning.
3. Managed PostgreSQL connection string (`DATABASE_URL`).
4. Managed Redis connection string (`REDIS_URL`).
5. Elasticsearch endpoint + credentials (`ELASTICSEARCH_URL`).
6. A strong JWT signing secret (`JWT_SECRET`).
7. Production frontend URL to set backend `CORS_ORIGIN`.
8. Optional: custom domain DNS access for both frontend and backend.

## Local Auth Seed Users

1. `admin@internationalcrm.edu` / `Admin@123`
2. `student@internationalcrm.edu` / `Student@123`
