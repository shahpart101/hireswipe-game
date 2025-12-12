import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1 style={{ fontSize: 48, fontWeight: 700 }}>HireSwipe</h1>
      <p style={{ opacity: 0.7, marginBottom: 40 }}>
        Choose how you want to play.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <button className="big-btn" onClick={() => nav("/founder")}>
          🧠 Founder Mode
        </button>

        <button className="big-btn" onClick={() => nav("/swipe")}>
          🔥 HireSwipe Game
        </button>

        <button className="big-btn" onClick={() => nav("/candidate")}>
          📄 Candidate Mode
        </button>
      </div>
    </div>
  );
}
