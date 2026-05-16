# ⚡ TaskFlow — Task Management Application

A full-stack task management web app built with React, Node.js, and Express. Features user authentication, CRUD operations, Kanban/List views, subtasks, comments, and AI-powered suggestions via Claude API.

---

## 🚀 Features

- 🔐 User authentication (login / logout)
- 📋 Create, Read, Update, Delete tasks
- 🗂 Kanban board + List view
- ✅ Subtasks with progress tracking
- 💬 Comments per task
- 🔍 Search, filter by status / priority
- ✨ AI task suggestions (Claude API)
- 📱 Fully responsive — mobile-first design
- 📊 Live stats dashboard

---

## 🏗 Project Structure

```
taskflow/
├── public/               # Static HTML entry point
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── context/          # React Context (auth, tasks)
│   ├── hooks/            # Custom hooks
│   └── utils/            # Helpers & constants
├── server/               # Node.js + Express backend
│   ├── routes/           # API route handlers
│   ├── middleware/        # Auth middleware
│   └── models/           # In-memory data models
├── package.json
└── .env.example
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=3001
```

### 4. Run the app

**Development (frontend + backend together):**
```bash
npm run dev
```

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

### 5. Open in browser

```
http://localhost:3000
```

---

## 👥 Demo Accounts

| Email | Password | Role |
|---|---|---|
| alex@taskflow.io | alex123 | Admin |
| jordan@taskflow.io | jordan123 | Member |
| sam@taskflow.io | sam123 | Member |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, CSS (inline + classes) |
| Backend | Node.js, Express |
| Auth | JWT (JSON Web Tokens) |
| AI | Anthropic Claude API |
| State | React Context + useReducer |
| Storage | In-memory (swap for MongoDB/PostgreSQL) |

---

## 📦 Deployment

### Deploy frontend to Vercel
```bash
npm run build
# Push to GitHub, import repo in vercel.com
```

### Deploy backend to Railway / Render
- Connect your GitHub repo
- Set environment variables in dashboard
- Deploy automatically on push

---

## 📄 License

MIT
