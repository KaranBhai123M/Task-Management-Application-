import React from "react";

export default function Badge({ text, color, bg, style = {} }) {
  return (
    <span style={{
      display: "inline-block", background: bg, color,
      fontSize: 11, fontWeight: 700, padding: "3px 9px",
      borderRadius: 20, textTransform: "capitalize",
      letterSpacing: "0.02em", ...style,
    }}>
      {text}
    </span>
  );
}
