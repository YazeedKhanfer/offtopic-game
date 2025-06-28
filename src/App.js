import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Setup from './pages/Setup';
import RoleReveal from './pages/RoleReveal';
import Vote from './pages/Vote';
import TopicGuess from './pages/TopicGuess';
import Results from './pages/Results';
import FinalScore from './pages/FinalScore';

function App() {
  const [page, setPage] = useState('home');

  const [settings, setSettings] = useState({
    players: 0,
    category: '',
    playerNames: [],
    totalRounds: 5,
  });

  const [scores, setScores] = useState([]);
  const [round, setRound] = useState(1);

  const [game, setGame] = useState({
    offTopicIndex: null,
    topic: '',
    votes: [],
    guessSuccess: null,
  });

  const [language, setLanguage] = useState('en');

  // (Optional) load scores from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('offtopicScores');
    if (stored) {
      const parsed = JSON.parse(stored);
      setScores(parsed.scores || []);
      setRound(parsed.round || 1);
    }
  }, []);

  // (Optional) save scores to localStorage
  useEffect(() => {
    localStorage.setItem(
      'offtopicScores',
      JSON.stringify({ scores, round })
    );
  }, [scores, round]);

  const handleStartGame = () => setPage('setup');

  const handleSetupDone = (players, category, names) => {
    const fallbackNames = names.map((name, i) => name.trim() || `Player ${i + 1}`);
    setSettings({
      players,
      category,
      playerNames: fallbackNames,
      totalRounds: 5,
    });
    setScores(Array(players).fill(0));
    setRound(1);
    setPage('roles');
  };

  const handleRoleRevealComplete = (offTopicIndex, topic) => {
    setGame({
      offTopicIndex,
      topic,
      votes: [],
      guessSuccess: null,
    });
    setPage('vote');
  };

  const handleVoteFinish = (votes, offTopicIndex, topic) => {
    const updatedScores = [...scores];

    votes.forEach((vote, i) => {
      if (vote === offTopicIndex) {
        updatedScores[i] += 1; // award point for correct vote
      }
    });

    setScores(updatedScores);
    setGame({
      offTopicIndex,
      topic,
      votes,
      guessSuccess: null,
    });

    setPage('guess'); // always let OffTopic guess
  };

  const handleGuessFinish = (votes, offTopicIndex, topic, success) => {
    const updatedScores = [...scores];
    if (success) {
      updatedScores[offTopicIndex - 1] += 1; // OffTopic bonus
    }

    setScores(updatedScores);
    setGame(prev => ({
      ...prev,
      guessSuccess: success,
    }));

    setPage('results');
  };

  const handleNextRound = () => {
    if (round < settings.totalRounds) {
      setRound(prev => prev + 1);
      setGame({
        offTopicIndex: null,
        topic: '',
        votes: [],
        guessSuccess: null,
      });
      setPage('roles');
    } else {
      setPage('final');
    }
  };

  const handleRestart = () => {
    setPage('home');
    setScores([]);
    setRound(1);
    localStorage.removeItem('offtopicScores');
  };

  return (
    <div className="App">
      {page === 'home' && (
        <Home onStartGame={handleStartGame} />
      )}

      {page === 'setup' && (
        <>
          <div style={{ margin: '1rem' }}>
            <label>🌐 Language: </label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              {/* add more as you expand */}
            </select>
          </div>
          <Setup onStart={handleSetupDone} language={language} />
        </>
      )}

      {page === 'roles' && (
        <RoleReveal
          players={settings.players}
          category={settings.category}
          playerNames={settings.playerNames}
          onComplete={handleRoleRevealComplete}
          language={language}
        />
      )}

      {page === 'vote' && (
        <Vote
          players={settings.players}
          offTopicIndex={game.offTopicIndex}
          topic={game.topic}
          playerNames={settings.playerNames}
          onFinish={handleVoteFinish}
          language={language}
        />
      )}

      {page === 'guess' && (
        <TopicGuess
          topic={game.topic}
          category={settings.category}
          playerNames={settings.playerNames}
          offTopicIndex={game.offTopicIndex}
          votes={game.votes}
          onFinish={handleGuessFinish}
          language={language}
        />
      )}

      {page === 'results' && (
        <Results
          votes={game.votes}
          offTopicIndex={game.offTopicIndex}
          topic={game.topic}
          playerNames={settings.playerNames}
          scores={scores}
          offTopicGuessSuccess={game.guessSuccess}
          round={round}
          totalRounds={settings.totalRounds}
          onNextRound={handleNextRound}
          onRestart={handleRestart}
          language={language}
        />
      )}

      {page === 'final' && (
        <FinalScore
          playerNames={settings.playerNames}
          scores={scores}
          onRestart={handleRestart}
          language={language}
        />
      )}
    </div>
  );
}

export default App;
