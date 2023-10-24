export default function ScoreBoard({ currentScore, bestScore }) {
  return (
    <div className="score-board">
      <p className="current-score">Current Score: {currentScore}</p>
      <p className="best-score">Best Score: {bestScore}</p>
    </div>
  );
}
