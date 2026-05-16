import React from "react";

export default function Toast({ toast }) {
  if (!toast) return null;
  const bg    = toast.type === "danger" ? "#FCEBEB" : "#EAF3DE";
  const color = toast.type === "danger" ? "#A32D2D" : "#3B6D11";
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      zIndex: 999, padding: "10px 20px", borderRadius: 24,
      fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
      background: bg, color, border: `1px solid ${color}44`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      animation: "fadeIn .2s ease",
    }}>
      {toast.msg}
    </div>
  );
}
