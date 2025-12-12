import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function SwipeCard({ candidate, onSwipe }) {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // Swipe Right → Hire
    if (offset > 120 || velocity > 500) {
      controls.start({ x: 500, opacity: 0 }).then(() => onSwipe("hire"));
      return;
    }

    // Swipe Left → Pass
    if (offset < -120 || velocity < -500) {
      controls.start({ x: -500, opacity: 0 }).then(() => onSwipe("pass"));
      return;
    }

    // No swipe → bounce back
    controls.start({ x: 0, rotate: 0 });
  };

  return (
    <motion.div
      className="swipe-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileDrag={{ rotate: 8 }}
      style={{
        width: 350,
        padding: 30,
        borderRadius: 16,
        background: "#111",
        border: "1px solid #333",
        color: "white",
        userSelect: "none",
        position: "absolute"
      }}
    >
      <h2>{candidate.name}</h2>
      <p>{candidate.role}</p>

      <div style={{ marginTop: 20 }}>
        <p><b>Execution:</b> {candidate.execution}</p>
        <p><b>Ramp:</b> {candidate.ramp}</p>
        <p><b>Attention Cost:</b> {candidate.attentionCost}</p>
        <p><b>Network:</b> {candidate.network}</p>
        <p><b>Salary:</b> ${candidate.salary.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}
