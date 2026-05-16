import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, error, setError, allUsers } = useAuth();
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");

  const doLogin = () => login(email, pass);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, background: "linear-gradient(160deg,#f5f4f0 0%,#EEEDFE 60%,#E6F1FB 100%)" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 56, height: 56, background: "#1a1a18", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>⚡</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a18", letterSpacing: "-.5px", margin: 0 }}>TaskFlow</h1>
        <p style={{ color: "#888780", fontSize: 13, marginTop: 4 }}>Smart task management for teams</p>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: "28px 22px", width: "100%", maxWidth: 380, border: "1px solid #e2e2dd" }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#888780", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Email</label>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && doLogin()} placeholder="you@taskflow.io" autoComplete="email" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e2dd", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#888780", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Password</label>
          <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && doLogin()} placeholder="••••••••" autoComplete="current-password" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e2dd", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }} />
        </div>
        {error && <div style={{ background: "#FCEBEB", color: "#A32D2D", padding: "9px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, marginBottom: 14 }}>{error}</div>}
        <button onClick={doLogin} style={{ width: "100%", background: "#1a1a18", color: "#fff", border: "none", borderRadius: 10, padding: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
        <div style={{ background: "#f5f4f0", borderRadius: 10, padding: 12, marginTop: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#888780", marginBottom: 8, letterSpacing: ".05em" }}>DEMO ACCOUNTS — TAP TO FILL</div>
          {allUsers.map((u) => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 11, color: "#5F5E5A" }}>
                {u.email}<br />
                <span style={{ fontFamily: "monospace" }}>{u.password}</span> · {u.role}
              </div>
              <button onClick={() => { setEmail(u.email); setPass(u.password); setError(""); }} style={{ fontSize: 11, padding: "4px 10px", border: "1px solid #e2e2dd", borderRadius: 6, background: "#fff", cursor: "pointer" }}>Fill</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
