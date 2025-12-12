import React, { useState } from "react";
import candidates from "./candidates.json";
import CandidateCard from "./CandidateCard";
import SpiderMini from "./SpiderMini";
import html2canvas from "html2canvas";

export default function HireSwipe() {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [elo, setElo] = useState(1200);

  const getPersona = () => {
    if (elo > 1350) return "🏴‍☠️ Talent Gambler";
    if (elo > 1250) return "🤝 Founder Whisperer";
    if (elo > 1150) return "🛡 Safe Bet Sam";
    return "🧪 Experimental Manager";
  };

  const saveToLeaderboard = (persona, elo) => {
    const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    board.push({
      name: persona,
      elo,
      date: Date.now(),
    });
    localStorage.setItem("leaderboard", JSON.stringify(board));
  };

  const shareResult = async () => {
    const card = document.getElementById("share-card");
    if (!card) return;

    const canvas = await html2canvas(card);
    const img = canvas.toDataURL("image/png");

    const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `My Hiring Persona: ${getPersona()} — Hiring ELO: ${elo}`
    )}`;

    window.open(tweet, "_blank");
  };

  // ---- Matchups ----
  const matchup = {
    left: candidates[index],
    right: candidates[index + 1]
  };

  // ---- END SCREEN ----
  if (!matchup.left || !matchup.right) {
    return (
      <div style={{ textAlign: "center", marginTop: 150 }}>
        <h2>No more matchups! 🎉</h2>

        <div id="share-card" className="share-card">
          <h1>{getPersona()}</h1>
          <h2>Hiring ELO: {elo}</h2>
          <p>You match {Math.floor(Math.random() * 40 + 60)}% of YC founders.</p>
        </div>

        <button onClick={() => saveToLeaderboard(getPersona(), elo)}>
          🏆 Save to Leaderboard
        </button>

        <button onClick={shareResult}>📤 Share</button>
      </div>
    );
  }

  // ----- ELO -----
  const computeStrength = (c = {}) => {
    const {
      execution = 50,
      ramp = 50,
      network = 50,
      attentionCost = 50
    } = c;

    return (
      execution * 0.4 +
      ramp * 0.25 +
      network * 0.2 +
      (100 - attentionCost) * 0.15
    );
  };

  const updateELO = (winner, left, right) => {
    const leftStrength = computeStrength(left);
    const rightStrength = computeStrength(right);

    const expectedLeft =
      1 / (1 + Math.pow(10, (rightStrength - leftStrength) / 400));

    const actual = winner === "left" ? 1 : 0;

    const K = 32;
    setElo(prev => Math.round(prev + K * (actual - expectedLeft)));
  };

  const handleChoice = (winner) => {
    updateELO(winner, matchup.left, matchup.right);
    setHistory(prev => [...prev, index]);
    setIndex(prev => prev + 2);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prevIndex = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setIndex(prevIndex);
  };

  return (
    <div className="hire-container">
      <h1 className="title">HireSwipe</h1>

      <div className="matchup-row">
        <div className="candidate-column">
          <CandidateCard candidate={matchup.left} />
          <SpiderMini data={matchup.left} />
          <button className="btn-left" onClick={() => handleChoice("left")}>
            ❌ Pass Left
          </button>
        </div>

        <div className="candidate-column">
          <CandidateCard candidate={matchup.right} />
          <SpiderMini data={matchup.right} />
          <button className="btn-right" onClick={() => handleChoice("right")}>
            ✅ Hire Right
          </button>
        </div>
      </div>

      <div className="footer">
        <button className="undo-btn" onClick={undo}>⏪ Undo</button>
        <p className="elo-text">Hiring ELO: {elo}</p>
      </div>
    </div>
  );
}
