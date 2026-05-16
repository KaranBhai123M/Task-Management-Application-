import React, { useState } from "react";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onNewTask, view, setView }) {
  const { currentUser, logout, switchUser, allUsers } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav style={{
      background: "#fff", borderBottom: "1px solid #e2e2dd",
      padding: "0 16px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 54,
      position: "sticky", top: 0, zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 32, height: 32, background: "#1a1a18", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
        <span style={{ fontWeight: 800, fontSize: 17, color: "#1a1a18", letterSpacing: "-.3px" }}>TaskFlow</span>
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => setView("kanban")} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e2dd", background: view === "kanban" ? "#1a1a18" : "#fff", color: view === "kanban" ? "#fff" : "#888780", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Kanban</button>
        <button onClick={() => setView("list")}   style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e2dd", background: view === "list"   ? "#1a1a18" : "#fff", color: view === "list"   ? "#fff" : "#888780", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>List</button>
        <button onClick={onNewTask} style={{ padding: "7px 14px", borderRadius: 8, background: "#1a1a18", color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ New</button>
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowProfile((p) => !p)} style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer" }}>
            {currentUser && <Avatar user={currentUser} size={32} />}
          </button>
          {showProfile && (
            <>
              <div onClick={() => setShowProfile(false)} style={{ position: "fixed", inset: 0, zIndex: 150 }} />
              <div style={{ position: "absolute", right: 0, top: 44, background: "#fff", border: "1px solid #e2e2dd", borderRadius: 12, minWidth: 190, zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,.12)" }}>
                <div style={{ padding: "10px 14px", borderBottom: "1px solid #e2e2dd" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{currentUser?.name}</div>
                  <div style={{ fontSize: 11, color: "#888780" }}>{currentUser?.role}</div>
                </div>
                <div style={{ padding: "6px 0", borderBottom: "1px solid #e2e2dd" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#888780", padding: "4px 14px", letterSpacing: ".05em" }}>SWITCH USER</div>
                  {allUsers.map((u) => (
                    <button key={u.id} onClick={() => { switchUser(u); setShowProfile(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: u.id === currentUser?.id ? "#f5f4f0" : "transparent", border: "none", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: u.id === currentUser?.id ? 700 : 400, color: "#1a1a18" }}>
                      {u.name} <span style={{ color: "#b4b2a9", fontWeight: 400 }}>({u.role})</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => { logout(); setShowProfile(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", background: "transparent", border: "none", fontSize: 13, color: "#A32D2D", cursor: "pointer", fontFamily: "inherit" }}>Sign Out</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
