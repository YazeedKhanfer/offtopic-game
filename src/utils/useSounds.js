import { useCallback } from 'react';

export default function useSound(path) {
  return useCallback(() => {
    const audio = new Audio(path);
    audio.volume = 0.4; // volume control
    audio.play();
  }, [path]);
}
