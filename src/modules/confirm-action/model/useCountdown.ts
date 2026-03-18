import { useState, useEffect } from 'react';

export function useCountdown(
  from: number,
  isActive: boolean,
  sessionKey: number
): { remaining: number; isComplete: boolean } {
  const [remaining, setRemaining] = useState(from);

  useEffect(() => {
    setRemaining(from);

    if (!isActive) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionKey, isActive, from]);

  return { remaining, isComplete: remaining === 0 };
}
