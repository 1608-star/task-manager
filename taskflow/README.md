# ✅ TaskFlow — Full Stack Task Manager

**Subject:** Full Stack Development - I (3040233448)  
**Institution:** Silver Oak College of Computer Applications, Silver Oak University  
**Course:** Bachelor of Computer Applications (Honours)

---

## 📌 Project Overview

TaskFlow is a complete MERN Stack Task Manager application built as part of the Experiential Learning Workbook for Full Stack Development - I.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| State | Context API + useReducer |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Styling | Pure CSS |

---

## 📁 Project Structure

```
taskflow/               ← Frontend (React)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskList.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AddTask.jsx
│   │   ├── Completed.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json

taskflow-backend/       ← Backend (Node + Express)
├── models/
│   └── Task.js
├── routes/
│   └── taskRoutes.js
├── server.js
├── .env
└── package.json
```

---

## 🚀 How to Run

### Frontend (React)
```bash
cd taskflow
npm install
npm run dev
```
Open: http://localhost:3000

### Backend (Express + MongoDB)
```bash
cd taskflow-backend
npm install
# Update .env with your MongoDB URI
npm run dev
```
API runs at: http://localhost:5000

---

## 🌟 Features

1. **Add Tasks** — Create tasks with title, description, priority
2. **View All Tasks** — Dashboard with stats (Total, Pending, In Progress, Completed)
3. **Search & Filter** — Search by name, filter by status
4. **Mark Complete** — Update task status
5. **Delete Tasks** — Remove individual or all completed tasks
6. **Persist Data** — localStorage saves tasks across page refreshes
7. **Multi-page Navigation** — React Router with 4 pages
8. **REST API** — Full CRUD backend with MongoDB

---

## 📅 Week-by-Week Features

| Week | Feature Added |
|------|--------------|
| 1 | React Setup, GitHub Init |
| 2 | Navbar, TaskCard, TaskList components |
| 3 | Add/Delete/Complete with useState |
| 4 | localStorage + Live Clock with useEffect |
| 5 | React Router — 4 pages |
| 6 | Context API + useReducer + useMemo |
| 7 | Node.js server basics |
| 8 | Express.js routes |
| 9 | MongoDB + Mongoose schema |
| 10 | Full REST API CRUD |
| 11 | Frontend-Backend integration |
| 12 | Final submission |
