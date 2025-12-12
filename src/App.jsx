import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import HireSwipe from "./HireSwipe";
import CandidateMode from "./CandidateMode";
import Leaderboard from "./Leaderboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Founder mode (works) */}
        <Route path="/founder" element={<HireSwipe />} />

        {/* FIX: <--- Add this route */}
        <Route path="/swipe" element={<HireSwipe />} />

        {/* Candidate mode */}
        <Route path="/candidate" element={<CandidateMode />} />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              leaderboard={JSON.parse(localStorage.getItem("leaderboard") || "[]")}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
