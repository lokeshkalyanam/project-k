# 💍 Matri-Server – Backend for Matrimony Platform

A fully modular, scalable, and production-ready Node.js backend for a modern matrimonial web and mobile platform.

---

## 🛠️ Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| Runtime       | Node.js (v18+)    |
| Language      | TypeScript        |
| Framework     | Express.js        |
| ORM           | Prisma (PostgreSQL) |
| Database      | Supabase (PostgreSQL managed) |
| Auth & Session| Custom auth with session tokens |
| Validation    | Zod               |
| Logging       | Custom logger     |
| Email/SMS     | Modular integrations (optional) |
| Dev Tools     | ESLint, Prettier, Nodemon |

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourname/matri-server.git
cd matri-server
npm install
npm run dev

```

## Setup environment variables

- PORT=8000
- DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

## 📁 Scripts

| Command                  | Description                    |
| ------------------------ | ------------------------------ |
| `npm install`            | Install all dependencies       |
| `npm run dev`            | Run server in dev with Nodemon |
| `npx prisma generate`    | Generate Prisma client         |
| `npx prisma migrate dev` | Run and apply migrations       |
| `npm run build`          | Build for production           |
| `npm start`              | Start the compiled server      |
