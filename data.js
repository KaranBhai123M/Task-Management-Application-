const bcrypt = require("bcryptjs");

const users = [
  { id: 1, name: "Alex Morgan",  email: "alex@taskflow.io",   passwordHash: bcrypt.hashSync("alex123",   8), role: "Admin",  avatar: "AM" },
  { id: 2, name: "Jordan Lee",   email: "jordan@taskflow.io", passwordHash: bcrypt.hashSync("jordan123", 8), role: "Member", avatar: "JL" },
  { id: 3, name: "Sam Rivera",   email: "sam@taskflow.io",    passwordHash: bcrypt.hashSync("sam123",    8), role: "Member", avatar: "SR" },
];

let tasks = [
  { id: 1, title: "Design system overhaul", description: "Redesign all UI components", status: "in-progress", priority: "high", category: "Design", assignee: 2, createdBy: 1, dueDate: "2026-05-20", createdAt: "2026-05-01", comments: [], subtasks: [{ id: 1, text: "Typography audit", done: true }] },
  { id: 2, title: "API rate limiting",       description: "Implement rate limiting",    status: "todo",        priority: "high", category: "Backend", assignee: 1, createdBy: 1, dueDate: "2026-05-18", createdAt: "2026-05-02", comments: [], subtasks: [] },
  { id: 3, title: "Write onboarding docs",   description: "Docs for new developers",    status: "todo",        priority: "medium", category: "Docs", assignee: 3, createdBy: 2, dueDate: "2026-05-25", createdAt: "2026-05-03", comments: [], subtasks: [] },
];
let nextId = 4;

module.exports = {
  findUserByEmail: (email) => users.find((u) => u.email === email),
  findUserById:    (id)    => users.find((u) => u.id === id),
  getAllTasks:      ()      => [...tasks],
  getTaskById:     (id)    => tasks.find((t) => t.id === id),
  createTask:      (data)  => { const t = { ...data, id: nextId++ }; tasks.unshift(t); return t; },
  updateTask:      (id, data) => {
    const i = tasks.findIndex((t) => t.id === id);
    if (i === -1) return null;
    tasks[i] = { ...tasks[i], ...data, id };
    return tasks[i];
  },
  deleteTask: (id) => {
    const i = tasks.findIndex((t) => t.id === id);
    if (i === -1) return false;
    tasks.splice(i, 1);
    return true;
  },
};
