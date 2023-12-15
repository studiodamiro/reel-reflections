import { useEffect, useRef } from 'react';

type UseTimedFunctionProps = {
  interval: number;
  delay?: number;
  isPaused?: boolean;
  targetFunction: () => void;
};

export default function useTimedFunction({
  interval,
  delay = 0,
  targetFunction,
  isPaused = false,
}: UseTimedFunctionProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          targetFunction();
        }, interval);
      }, delay);
    }
    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(delay);
    };
  }, [interval, delay, targetFunction, isPaused]);
}
