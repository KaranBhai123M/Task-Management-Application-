import React from "react";

export default function StatsBar({ tasks, currentUser }) {
  const stats = [
    { label: "Total",    val: tasks.length,                                                               color: "#185FA5", bg: "#E6F1FB" },
    { label: "Active",   val: tasks.filter((t) => t.status === "in-progress").length,                    color: "#533AB7", bg: "#EEEDFE" },
    { label: "Done",     val: tasks.filter((t) => t.status === "done").length,                           color: "#3B6D11", bg: "#EAF3DE" },
    { label: "Overdue",  val: tasks.filter((t) => t.status !== "done" && new Date(t.dueDate) < new Date()).length, color: "#A32D2D", bg: "#FCEBEB" },
    { label: "High Pri", val: tasks.filter((t) => t.priority === "high" && t.status !== "done").length,  color: "#BA7517", bg: "#FAEEDA" },
    { label: "Mine",     val: tasks.filter((t) => t.assignee === currentUser?.id).length,                color: "#0F6E56", bg: "#E1F5EE" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
      {stats.map((s) => (
        <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: s.color, marginTop: 2, opacity: 0.85 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
