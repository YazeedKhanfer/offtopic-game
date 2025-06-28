import React, { useState } from 'react';
import '../styles/Setup.css';
import useTranslation from '../utils/useTranslations';
import useSound from '../utils/useSounds';
function Setup({ onStart, language }) {
  const [players, setPlayers] = useState(3);
  const [category, setCategory] = useState('Fruits');
  const [playerNames, setPlayerNames] = useState(['', '', '']);
  const [lang, setLang] = useState(language || 'en');

  const { t } = useTranslation(lang);
  const playClick = useSound('/sounds/click.mp3');

  const handleStart = () => {
    const trimmedNames = playerNames.map(n => n.trim());
    if (trimmedNames.some(name => name === '')) {
      alert('Please enter a name for each player.');
      return;
    }
    playClick();
    onStart(players, category, trimmedNames, lang);
  };

  const handlePlayerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPlayers(count);

    const updatedNames = [...playerNames];
    while (updatedNames.length < count) updatedNames.push('');
    setPlayerNames(updatedNames.slice(0, count));
  };

  const handleNameChange = (index, value) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  return (
    <div className="setup">
      <h2>{t('setup')}</h2>

      <div className="form-group">
        <label>{t('numberOfPlayers')}</label>
        <input
          type="number"
          min="3"
          max="8"
          value={players}
          onChange={handlePlayerCountChange}
        />
      </div>

      <div className="form-group">
        <label>{t('chooseCategory')}</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Fruits">{t('Fruits') || 'Fruits'}</option>
          <option value="Countries">{t('Countries') || 'Countries'}</option>
          <option value="HistoricFigures">{t('HistoricFigures') || 'Historic Figures'}</option>
          <option value="Celebrities">{t('Celebrities') || 'Celebrities'}</option>
          <option value="Movies">{t('Movies') || 'Movies'}</option>
          <option value="Landmarks">{t('Landmarks') || 'Landmarks'}</option>
          <option value="SportsTeams">{t('SportsTeams') || 'Sports Teams'}</option>
          <option value="TVShows">{t('TVShows') || 'TV Shows'}</option>
        </select>
      </div>

      <div className="form-group">
        <label>Language:</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {playerNames.map((name, i) => (
        <div className="form-group" key={i}>
          <label>{t('enterName', { i: i + 1 })}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(i, e.target.value)}
            placeholder={`Player ${i + 1}`}
          />
        </div>
      ))}

      <button className="start-button" onClick={handleStart}>
        {t('continue')}
      </button>
    </div>
  );
}

export default Setup;
