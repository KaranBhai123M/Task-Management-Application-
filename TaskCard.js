import React from "react";
import Badge from "./Badge";
import { PRIORITY_COLOR, PRIORITY_BG } from "../utils/constants";
import { isOverdue, subtaskProgress } from "../utils/helpers";

export default function TaskCard({ task, onOpen }) {
  const overdue = isOverdue(task);
  const { done, total } = subtaskProgress(task.subtasks);

  return (
    <div
      onClick={() => onOpen(task)}
      style={{
        background: "#fff", border: "1px solid #e2e2dd", borderRadius: 12,
        padding: 14, marginBottom: 10, cursor: "pointer", transition: "box-shadow .15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a18", lineHeight: 1.35 }}>{task.title}</div>
        <Badge text={task.priority} color={PRIORITY_COLOR[task.priority]} bg={PRIORITY_BG[task.priority]} />
      </div>
      <div style={{ fontSize: 12, color: "#888780", lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {task.description}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, background: "#f5f4f0", color: "#888780", padding: "2px 9px", borderRadius: 20 }}>{task.category}</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {total > 0 && <span style={{ fontSize: 11, color: done === total ? "#3B6D11" : "#888780" }}>{done}/{total}✓</span>}
          <span style={{ fontSize: 11, color: overdue ? "#A32D2D" : "#888780" }}>{overdue ? "⚠ " : ""}{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
}
