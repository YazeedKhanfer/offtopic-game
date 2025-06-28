import React, { useState } from 'react';
import '../styles/Vote.css';
import useSound from '../utils/useSounds';
import useTranslation from '../utils/useTranslations';

function Vote({ players, offTopicIndex, topic, playerNames, onFinish, language }) {
  const [votes, setVotes] = useState(Array(players).fill(null));
  const [currentVoter, setCurrentVoter] = useState(1);

  const { t } = useTranslation(language);
  const playClick = useSound('/sounds/click.mp3');

  const handleVote = (votedFor) => {
    playClick();
    const newVotes = [...votes];
    newVotes[currentVoter - 1] = votedFor;
    setVotes(newVotes);

    if (currentVoter < players) {
      setCurrentVoter(currentVoter + 1);
    } else {
      onFinish(newVotes, offTopicIndex, topic);
    }
  };

  const voterName = playerNames[currentVoter - 1] || `Player ${currentVoter}`;

  return (
    <div className="vote-screen">
      <h2>{t('castVote', { name: voterName })}</h2>
      <p>{t('whoIsOffTopic')}</p>

      <div className="vote-buttons">
        {[...Array(players)].map((_, i) => {
          const playerIndex = i + 1;
          if (playerIndex === currentVoter) return null; // 🚫 No self-vote

          const displayName = playerNames[i] || `Player ${playerIndex}`;
          return (
            <button key={i} onClick={() => handleVote(playerIndex)}>
              {displayName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Vote;
