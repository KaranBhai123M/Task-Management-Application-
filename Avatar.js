import React from "react";
import { AVATAR_COLORS } from "../utils/constants";

export default function Avatar({ user, size = 32 }) {
  const bg = AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
    }}>
      {user.avatar}
    </div>
  );
}
