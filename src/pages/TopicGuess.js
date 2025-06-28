import React, { useState, useEffect } from 'react';
import '../styles/TopicGuess.css';
import topics from '../data/topics';
import useSound from '../utils/useSounds';

function TopicGuess({ topic, category, playerNames, offTopicIndex, votes, onFinish }) {
  const [options, setOptions] = useState([]);
  const [guessed, setGuessed] = useState(null);
  const [result, setResult] = useState(null);
  const playCorrect = useSound('/sounds/correct.mp3');
  const playWrong = useSound('/sounds/wrong.mp3');

  useEffect(() => {
    const pool = [...topics[category]];
    const shuffled = pool.filter(t => t !== topic).sort(() => 0.5 - Math.random()).slice(0, 3);
    const finalOptions = [...shuffled, topic].sort(() => 0.5 - Math.random());
    setOptions(finalOptions);
  }, [topic, category]);


const handleGuess = (guess) => {
  setGuessed(guess);
  const success = guess === topic;
  setResult(success ? '🎉 Correct! You guessed the topic!' : '❌ Wrong guess!');
  if (success) playCorrect();
  else playWrong();
  setTimeout(() => {
    onFinish(votes, offTopicIndex, topic, success);
  }, 2000);
};

  const playerName = playerNames[offTopicIndex - 1] || `Player ${offTopicIndex}`;

  return (
    <div className="topic-guess">
      <h2>{playerName}, guess the topic!</h2>
      <p>Choose the correct topic to earn bonus points:</p>

      <div className="guess-options">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleGuess(opt)}
            disabled={!!guessed}
          >
            {opt}
          </button>
        ))}
      </div>

      {guessed && <p className="result-msg">{result}</p>}
    </div>
  );
}

export default TopicGuess;
