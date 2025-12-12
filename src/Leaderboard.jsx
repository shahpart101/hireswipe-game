import React from "react";

export default function Leaderboard({ leaderboard }) {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>🏆 Leaderboard</h1>

      <table style={{ margin: "0 auto", fontSize: 20 }}>
        <thead>
          <tr>
            <th style={{ padding: 10 }}>Rank</th>
            <th style={{ padding: 10 }}>Name</th>
            <th style={{ padding: 10 }}>ELO</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard
            .sort((a, b) => b.elo - a.elo)
            .slice(0, 10)
            .map((entry, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.elo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
