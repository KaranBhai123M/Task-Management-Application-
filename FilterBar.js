import React from "react";
import { STATUSES, PRIORITIES, STATUS_LABEL } from "../utils/constants";

const sel = { padding: "9px 12px", border: "1px solid #e2e2dd", borderRadius: 8, background: "#fff", fontSize: 13, flex: 1 };

export default function FilterBar({ filters, setSearch, setStatus, setPriority, clearFilters }) {
  const { search, status, priority } = filters;
  const hasFilter = search || status !== "all" || priority !== "all";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍  Search tasks…"
        style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e2dd", borderRadius: 8, fontSize: 14, background: "#fff" }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>
          <option value="all">All Status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={sel}>
          <option value="all">All Priority</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
        </select>
        {hasFilter && (
          <button onClick={clearFilters} style={{ padding: "9px 12px", border: "1px solid #e2e2dd", borderRadius: 8, background: "#fff", color: "#888780", fontSize: 13, cursor: "pointer" }}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
