const express = require("express");
const auth    = require("../middleware/auth");
const db      = require("../models/data");

const router = express.Router();

// GET /api/tasks
router.get("/", auth, (req, res) => {
  res.json(db.getAllTasks());
});

// GET /api/tasks/:id
router.get("/:id", auth, (req, res) => {
  const task = db.getTaskById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST /api/tasks
router.post("/", auth, (req, res) => {
  const { title, description, status, priority, category, assignee, dueDate, subtasks, comments } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const task = db.createTask({
    title, description: description || "", status: status || "todo",
    priority: priority || "medium", category: category || "General",
    assignee: assignee || req.user.id, createdBy: req.user.id,
    dueDate: dueDate || "", createdAt: new Date().toISOString().slice(0, 10),
    subtasks: subtasks || [], comments: comments || [],
  });
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put("/:id", auth, (req, res) => {
  const task = db.getTaskById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  // Only creator or admin can edit
  if (task.createdBy !== req.user.id && req.user.role !== "Admin")
    return res.status(403).json({ error: "Not authorised" });
  const updated = db.updateTask(parseInt(req.params.id), req.body);
  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete("/:id", auth, (req, res) => {
  if (req.user.role !== "Admin") return res.status(403).json({ error: "Admin only" });
  const ok = db.deleteTask(parseInt(req.params.id));
  if (!ok) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
