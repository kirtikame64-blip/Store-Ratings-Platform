# Northstar Store Rating Platform

A full-stack store rating platform with a responsive React/Vite client and an Express + Prisma + MySQL API.

## What is included

- JWT authentication with bcrypt password hashing
- Three role-specific experiences: System Admin, Normal User, and Store Owner
- Admin dashboard with platform metrics, user management, store management, search, role badges, pagination, and sorting controls
- Store directory with name/address search and 1–5 star rating submission or editing
- Owner dashboard with average rating, rating distribution, and reviewer activity
- Account settings with password change flow
- Centralized API errors, CORS, request validation, foreign keys, indexes, and a unique user/store rating constraint
- Seed data for all roles

## Project layout

- `src/` — Vite React frontend
- `backend/src/` — Express REST API
- `backend/prisma/` — MySQL schema, migrations, and seed data

## Frontend setup

From the project root:

```bash
npm install
npm run dev
```

The frontend runs on the Vite development URL supplied by the project environment.

## Backend and database setup

1. Create a MySQL database named `northstar`.
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and a strong `JWT_SECRET`.
3. Install backend packages and generate the Prisma client:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

The API runs on port 4000 by default. Use `CLIENT_ORIGIN` to change the allowed frontend origin.

## Demo accounts

All seeded accounts use `Password1!`.

| Role | Email |
| --- | --- |
| System Admin | `admin@northstar.com` |
| Normal User | `olivia@northstar.com` |
| Store Owner | `owner@northstar.com` |

The frontend also includes a demo-role selector so the primary experiences can be reviewed without a running API connection.

## REST API overview

- `POST /api/auth/signup` — create a normal user
- `POST /api/auth/login` — issue a JWT
- `GET /api/auth/me` — return the signed-in profile
- `PATCH /api/auth/password` — change password
- `GET /api/stores?search=` — list searchable stores and the signed-in user rating
- `POST /api/stores` — admin-only store creation
- `GET /api/users?search=` — admin-only user listing
- `POST /api/users` — admin-only user creation
- `PUT /api/ratings/:storeId` — create or update the signed-in user rating
- `GET /api/owner/ratings` — owner-only reviewer activity
- `GET /api/health` — health check

## Validation rules

Names are 20–60 characters, addresses are limited to 400 characters, passwords are 8–16 characters with at least one uppercase and one special character, emails use standard validation, and ratings accept only integer values from 1 to 5.
