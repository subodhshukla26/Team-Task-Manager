# 🚀 Team Task Manager

A professional, full-stack project management application designed for team collaboration. This platform enables administrators to manage projects and tasks while allowing team members to track their progress and update task statuses in real-time.

---

## 🌐 Live Demo
- **Frontend**: [https://frontend-production-11b35.up.railway.app](https://frontend-production-11b35.up.railway.app)
- **Backend API**: [https://backend-production-5e22.up.railway.app](https://backend-production-5e22.up.railway.app)

---

## ✨ Features

### 🔐 Authentication & Roles
- **Secure Auth**: JWT-based authentication with secure HTTP-only cookies.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Full control over projects, tasks, and team assignments.
  - **Member**: Access to assigned projects and the ability to update task statuses.
- **Auto-Role Assignment**: The first user to register is automatically granted the `Admin` role.

### 📊 Dashboard
- **Real-time Stats**: Visual overview of total projects, active tasks, and completion rates.
- **Task Tracking**: Quick view of overdue tasks and upcoming deadlines.
- **Recent Activity**: Streamlined view of the latest updates across projects.

### 📁 Project & Task Management
- **Project Creation**: Admins can create and manage multiple projects.
- **Task Assignment**: Granular task creation with priority levels, deadlines, and specific member assignments.
- **Status Workflow**: Tasks move through `To Do`, `In Progress`, and `Completed` stages.

---

## 🛠️ Tech Stack

**Frontend:**
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **State Management**: React Context API (Auth)

**Backend:**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, CORS, bcryptjs, JWT

**Deployment:**
- **Infrastructure**: Railway.app
- **CI/CD**: Automated deployments via GitHub

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v22 or higher recommended)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/subodhshukla26/Team-Task-Manager.git
cd Team-Task-Manager
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
Create a `.env.local` file in the `Frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Start the frontend:
```bash
npm run dev
```

---

## 📖 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT cookie |
| `GET` | `/api/dashboard/stats` | Get dashboard statistics |
| `GET` | `/api/projects` | List all projects |
| `POST` | `/api/projects` | Create a new project (Admin) |
| `GET` | `/api/tasks` | List all tasks |
| `PATCH` | `/api/tasks/:id` | Update task status |

---

## 📄 License
This project is licensed under the MIT License.
