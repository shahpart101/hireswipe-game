import React, { useState } from "react";
import SpiderMini from "./SpiderMini";

export default function CandidateMode() {
  const [candidate, setCandidate] = useState(null);

  const saveToLeaderboard = (name, elo) => {
    const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    board.push({ name, elo, date: Date.now() });
    localStorage.setItem("leaderboard", JSON.stringify(board));
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // You ALREADY HAVE the resume parser code in your old version.
    // Call your existing parsing function here:

    const stats = await parseResume(file); // <-- USE YOUR OLD CODE

    const computedELO =
      stats.execution * 0.4 +
      stats.ramp * 0.25 +
      stats.network * 0.2 +
      (100 - stats.attentionCost) * 0.15;

    setCandidate({
      name: file.name.replace(".pdf", ""),
      ...stats,
      elo: Math.round(computedELO),
    });

    saveToLeaderboard(file.name.replace(".pdf", ""), Math.round(computedELO));
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>📄 Candidate Mode</h1>

      <input type="file" accept=".pdf" onChange={handleResumeUpload} />

      {candidate && (
        <div style={{ marginTop: 50 }}>
          <h2>{candidate.name}</h2>
          <SpiderMini data={candidate} />
          <h3>ELO: {candidate.elo}</h3>
        </div>
      )}
    </div>
  );
}
