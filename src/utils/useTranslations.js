import translations from '../data/translations';

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export default function useTranslation(language = 'en') {
  const t = (key, vars) => {
    const text = translations[language]?.[key] || translations['en'][key] || key;
    return interpolate(text, vars);
  };
  return { t };
}
