import React from 'react';
import '../styles/Results.css';
import useSound from '../utils/useSounds';
import { useEffect } from 'react';

function Results({
  votes,
  offTopicIndex,
  topic,
  playerNames,
  offTopicGuessSuccess,
  scores,
  round,
  totalRounds,
  onNextRound,
  onRestart,
}) {
  const isLastRound = round === totalRounds;
  const playWin = useSound('/sounds/win.mp3');
  const playGameover = useSound('/sounds/gameover.mp3');

  useEffect(() => {
    if (isLastRound) playGameover();
    else playWin();
  }, [isLastRound, playGameover, playWin]); // ✅ dependencies included

  return (
    <div className="results-screen">
      <h2>🎉 Round {round} Results</h2>

      <div className="summary">
        <p><strong>Topic:</strong> {topic}</p>
        <p><strong>OffTopic Player:</strong> {playerNames[offTopicIndex - 1] || `Player ${offTopicIndex}`}</p>
      </div>

      <h3>🗳️ Voting Recap</h3>
      <ul className="votes-list">
        {votes.map((vote, i) => {
          const voter = playerNames[i] || `Player ${i + 1}`;
          const votedFor = vote && vote > 0
            ? (playerNames[vote - 1] || `Player ${vote}`)
            : 'Invalid Vote';

          return (
            <li key={i}>
              {voter} voted for {votedFor}
              {vote === offTopicIndex && <span> ✅</span>}
            </li>
          );
        })}
      </ul>

      <h3>🎯 OffTopic Guess</h3>
      {offTopicGuessSuccess === true && (
        <p className="bonus-msg">🎉 OffTopic guessed the topic correctly!</p>
      )}
      {offTopicGuessSuccess === false && (
        <p className="bonus-msg">🙈 OffTopic failed to guess the topic.</p>
      )}

      <h3>🏆 Scoreboard</h3>
      <ul className="votes-list">
        {scores.map((score, i) => (
          <li key={i}>
            {playerNames[i] || `Player ${i + 1}`}: {score} point{score !== 1 ? 's' : ''}
          </li>
        ))}
      </ul>

      {!isLastRound ? (
        <button className="restart-button" onClick={onNextRound}>Next Round</button>
      ) : (
        <button className="restart-button" onClick={onRestart}>Restart Game</button>
      )}
    </div>
  );
}

export default Results;
