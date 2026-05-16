const BASE = "/api";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("tf_token") || ""}`,
});

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${BASE}/auth/login`, { method: "POST", headers: headers(), body: JSON.stringify({ email, password }) }).then((r) => r.json()),

  // Tasks
  getTasks: () =>
    fetch(`${BASE}/tasks`, { headers: headers() }).then((r) => r.json()),

  createTask: (task) =>
    fetch(`${BASE}/tasks`, { method: "POST", headers: headers(), body: JSON.stringify(task) }).then((r) => r.json()),

  updateTask: (id, task) =>
    fetch(`${BASE}/tasks/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(task) }).then((r) => r.json()),

  deleteTask: (id) =>
    fetch(`${BASE}/tasks/${id}`, { method: "DELETE", headers: headers() }).then((r) => r.json()),

  // AI
  getAiSuggestion: (task) =>
    fetch(`${BASE}/ai/suggest`, { method: "POST", headers: headers(), body: JSON.stringify(task) }).then((r) => r.json()),
};
