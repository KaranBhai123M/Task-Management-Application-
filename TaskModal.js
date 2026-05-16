import React, { useState } from "react";
import { STATUSES, PRIORITIES, CATEGORIES, STATUS_LABEL } from "../utils/constants";

export default function TaskModal({ task, users, currentUser, onClose, onSave, onDelete }) {
  const isNew = !task.id;
  const [form, setForm] = useState({ ...task });
  const [tab, setTab] = useState("details");
  const [newComment, setNewComment] = useState("");
  const [newSub, setNewSub] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addComment = () => {
    if (!newComment.trim()) return;
    set("comments", [...(form.comments || []), { id: Date.now(), userId: currentUser.id, text: newComment, time: new Date().toISOString().slice(0, 10) }]);
    setNewComment("");
  };
  const toggleSub = (id) => set("subtasks", form.subtasks.map((s) => s.id === id ? { ...s, done: !s.done } : s));
  const addSub = () => {
    if (!newSub.trim()) return;
    set("subtasks", [...(form.subtasks || []), { id: Date.now(), text: newSub, done: false }]);
    setNewSub("");
  };

  const getAi = async () => {
    setAiLoading(true); setAiText("");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 500,
          system: "You are a project management AI. Give concise actionable advice in 2-3 sentences.",
          messages: [{ role: "user", content: `Task: "${form.title}"\nDesc: "${form.description}"\nPriority: ${form.priority}, Status: ${form.status}, Due: ${form.dueDate}\n\nSuggest the best next steps.` }],
        }),
      });
      const d = await r.json();
      setAiText(d.content?.[0]?.text || "No suggestion available.");
    } catch { setAiText("Error connecting to AI. Please try again."); }
    setAiLoading(false);
  };

  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e2e2dd", borderRadius: 8, fontSize: 14, background: "#fff", fontFamily: "inherit" };
  const fieldStyle = { marginBottom: 14 };
  const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, color: "#888780", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "#e2e2dd", borderRadius: 4, margin: "10px auto 4px" }} />
        {/* Header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e2dd" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#1a1a18", marginBottom: 10 }}>{isNew ? "New Task" : "Edit Task"}</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 10 }}>
            {!isNew && currentUser.role === "Admin" && (
              <button onClick={() => { onDelete(task.id); onClose(); }} style={{ background: "#FCEBEB", color: "#A32D2D", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Delete</button>
            )}
            <button onClick={onClose} style={{ background: "#fff", border: "1px solid #e2e2dd", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => form.title.trim() && onSave(form)} style={{ background: "#1a1a18", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Save</button>
          </div>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {["details", "subtasks", "comments", "ai"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 14px", border: "none", borderBottom: `2px solid ${tab === t ? "#1a1a18" : "transparent"}`, background: "transparent", fontSize: 13, fontWeight: tab === t ? 700 : 500, color: tab === t ? "#1a1a18" : "#888780", cursor: "pointer", whiteSpace: "nowrap" }}>
                {t === "ai" ? "✨ AI" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Body */}
        <div style={{ overflowY: "auto", flex: 1, padding: 16 }}>
          {tab === "details" && (
            <>
              <div style={fieldStyle}><label style={labelStyle}>Title *</label><input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="What needs to be done?" style={inputStyle} /></div>
              <div style={fieldStyle}><label style={labelStyle}>Description</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Add details…" style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={fieldStyle}><label style={labelStyle}>Status</label>
                  <select value={form.status} onChange={(e) => set("status", e.target.value)} style={inputStyle}>
                    {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Priority</label>
                  <select value={form.priority} onChange={(e) => set("priority", e.target.value)} style={inputStyle}>
                    {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Category</label>
                  <select value={form.category} onChange={(e) => set("category", e.target.value)} style={inputStyle}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Assignee</label>
                  <select value={form.assignee} onChange={(e) => set("assignee", parseInt(e.target.value))} style={inputStyle}>
                    {users.map((u) => <option key={u.id} value={u.id}>{u.name.split(" ")[0]}</option>)}
                  </select>
                </div>
              </div>
              <div style={fieldStyle}><label style={labelStyle}>Due Date</label><input type="date" value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} style={inputStyle} /></div>
            </>
          )}
          {tab === "subtasks" && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input value={newSub} onChange={(e) => setNewSub(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSub()} placeholder="Add subtask…" style={{ ...inputStyle, flex: 1 }} />
                <button onClick={addSub} style={{ background: "#1a1a18", color: "#fff", border: "none", borderRadius: 8, padding: "9px 14px", fontWeight: 700, cursor: "pointer" }}>Add</button>
              </div>
              {(form.subtasks || []).map((s) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: s.done ? "#f5f4f0" : "#fff", border: "1px solid #e2e2dd", borderRadius: 8, marginBottom: 7 }}>
                  <input type="checkbox" checked={s.done} onChange={() => toggleSub(s.id)} style={{ width: 17, height: 17 }} />
                  <span style={{ fontSize: 13, flex: 1, color: s.done ? "#888780" : "#1a1a18", textDecoration: s.done ? "line-through" : "none" }}>{s.text}</span>
                </div>
              ))}
              {!(form.subtasks || []).length && <div style={{ textAlign: "center", padding: "28px 0", color: "#b4b2a9", fontSize: 13 }}>No subtasks yet</div>}
            </>
          )}
          {tab === "comments" && (
            <>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment…" rows={3} style={{ ...inputStyle, resize: "none", marginBottom: 8 }} />
              <button onClick={addComment} style={{ background: "#1a1a18", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>Post</button>
              {(form.comments || []).map((c) => {
                const u = users.find((u) => u.id === c.userId);
                return (
                  <div key={c.id} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{u?.avatar}</div>
                    <div style={{ flex: 1, background: "#f5f4f0", borderRadius: 10, padding: "9px 12px" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 12 }}>{u?.name}</span>
                        <span style={{ fontSize: 11, color: "#888780" }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#444441", lineHeight: 1.5 }}>{c.text}</div>
                    </div>
                  </div>
                );
              })}
              {!(form.comments || []).length && <div style={{ textAlign: "center", padding: "28px 0", color: "#b4b2a9", fontSize: 13 }}>No comments yet</div>}
            </>
          )}
          {tab === "ai" && (
            <>
              <div style={{ background: "linear-gradient(135deg,#EEEDFE,#E6F1FB)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#26215C", marginBottom: 5 }}>✨ AI Task Assistant</div>
                <p style={{ fontSize: 13, color: "#3C3489", lineHeight: 1.6, margin: 0 }}>Get intelligent suggestions to complete this task efficiently.</p>
              </div>
              <button onClick={getAi} disabled={aiLoading || !form.title} style={{ width: "100%", background: aiLoading ? "#e2e2dd" : "#1a1a18", color: "#fff", border: "none", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: aiLoading ? "default" : "pointer", marginBottom: 14 }}>
                {aiLoading ? "Thinking…" : "Get AI Suggestions"}
              </button>
              {aiText && <div style={{ background: "#f5f4f0", borderRadius: 10, padding: 14, border: "1px solid #e2e2dd", fontSize: 13, lineHeight: 1.7, color: "#1a1a18" }}>{aiText}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
