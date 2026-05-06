# Team Task Manager

Full-stack web app for project management, task assignment, progress tracking, and role-based access control.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express REST API
- Database: SQLite
- Auth: JWT + bcrypt password hashing
- Deployment: Railway

## Features

- Signup and login
- First registered user becomes `admin`; later signups become `member`
- Admins can create projects, add members, and create/assign tasks
- Members can view accessible work and update tasks assigned to them
- Dashboard shows task status counts, overdue tasks, and upcoming tasks
- Validations, foreign-key relationships, and protected routes

## Local Setup

Backend:

```bash
cd Backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Frontend:

```bash
cd Frontend
cp .env.example .env
npm install
npm run dev
```

Demo users after seeding:

- Admin: `admin@example.com` / `admin123`
- Member: `member@example.com` / `member123`

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/projects`
- `POST /api/projects` admin only
- `GET /api/projects/:id/members`
- `POST /api/projects/:id/members` admin only
- `GET /api/tasks`
- `POST /api/tasks` admin only
- `PATCH /api/tasks/:id`
- `GET /api/dashboard`

## Railway Deployment

Create two Railway services from this repo:

1. Backend service
   - Root directory: `Backend`
   - Variables:
     - `JWT_SECRET`: a long random value
     - `CLIENT_URL`: your deployed frontend URL
     - `DATABASE_FILE`: `/data/team-task-manager.sqlite`
   - Add a Railway volume mounted at `/data` so the SQLite database persists.
   - Run `npm run seed` once from Railway shell if you want demo data.

2. Frontend service
   - Root directory: `Frontend`
   - Variable:
     - `VITE_API_URL`: `https://your-backend-service.up.railway.app/api`

Deploy both services. After the frontend deploys, update backend `CLIENT_URL` to the final frontend domain.
