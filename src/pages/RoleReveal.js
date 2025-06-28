import React, { useState } from 'react';
import '../styles/RoleReveal.css';
import topics from '../data/topics';
import useSound from '../utils/useSounds';
import useTranslation from '../utils/useTranslations';

function RoleReveal({ players, category, playerNames, onComplete, language }) {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [showRole, setShowRole] = useState(false);

  const [offTopicIndex] = useState(() => Math.floor(Math.random() * players) + 1);
  const [topic] = useState(() =>
    topics[category][Math.floor(Math.random() * topics[category].length)]
  );

  const { t } = useTranslation(language);
  const playNext = useSound('/sounds/next.mp3');

  const handleNext = () => {
    playNext();
    if (!showRole) {
      setShowRole(true);
    } else if (currentPlayer < players) {
      setCurrentPlayer(currentPlayer + 1);
      setShowRole(false);
    } else {
      onComplete(offTopicIndex, topic);
    }
  };

  const displayName = playerNames[currentPlayer - 1] || `Player ${currentPlayer}`;

  return (
    <div className="reveal-screen">
      <h2>{displayName}</h2>

      {!showRole ? (
        <p className="instruction">
          {t('passDevice', { name: displayName })}
        </p>
      ) : (
        <div className="role-box">
          {currentPlayer === offTopicIndex ? (
            <p className="offtopic-role">{t('roleOffTopic')}</p>
          ) : (
            <p className="topic-role">{t('roleTopic', { topic })}</p>
          )}
        </div>
      )}

      <button onClick={handleNext} className="continue-button">
        {showRole ? t('nextPlayer') : t('showMyRole')}
      </button>
    </div>
  );
}

export default RoleReveal;
