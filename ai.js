const express = require("express");
const auth    = require("../middleware/auth");

const router = express.Router();

// POST /api/ai/suggest
router.post("/suggest", auth, async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: "Task title required" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "AI not configured — add ANTHROPIC_API_KEY to .env" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: "You are a project management AI. Give concise actionable advice in 2-3 sentences.",
        messages: [{ role: "user", content: `Task: "${title}"\nDesc: "${description}"\nPriority: ${priority}, Status: ${status}, Due: ${dueDate}\n\nSuggest the best next steps.` }],
      }),
    });
    const data = await response.json();
    res.json({ suggestion: data.content?.[0]?.text || "No suggestion available." });
  } catch (err) {
    res.status(500).json({ error: "AI request failed", detail: err.message });
  }
});

module.exports = router;
