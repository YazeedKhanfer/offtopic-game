import React from 'react';
import '../styles/FinalScore.css'; // Optional styling file

function FinalScore({ playerNames, scores, onRestart }) {
  const maxScore = Math.max(...scores);
  const winners = playerNames
    .map((name, i) => ({ name: name || `Player ${i + 1}`, score: scores[i] }))
    .filter(p => p.score === maxScore);

  return (
    <div className="final-score-screen">
      <h2>🏁 Game Over!</h2>

      <h3>🏆 Final Scores</h3>
      <ul className="score-list">
        {playerNames.map((name, i) => (
          <li key={i}>
            {name || `Player ${i + 1}`}: {scores[i]} point{scores[i] !== 1 ? 's' : ''}
          </li>
        ))}
      </ul>

      <h3>
        🎉 {winners.length === 1 ? `Winner: ${winners[0].name}` : `Winners: ${winners.map(w => w.name).join(', ')}`}
      </h3>

      <button className="restart-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}

export default FinalScore;
