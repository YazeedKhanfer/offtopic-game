import useTranslation from '../utils/useTranslations';
import '../styles/Home.css';
import useSound from '../utils/useSounds';

function Home({ onStartGame }) {
  const { t } = useTranslation('en'); // you can later swap 'en' to a dynamic language
  const playClick = useSound('/sounds/click.mp3');

  return (
    <div className="home">
      <h1>{t('title')}</h1>
      <p className="subtitle">{t('subtitle')}</p>
      <button
        className="start-button"
        onClick={() => {
          playClick();
          onStartGame();
        }}
      >
        {t('startGame')}
      </button>
    </div>
  );
}

export default Home;
