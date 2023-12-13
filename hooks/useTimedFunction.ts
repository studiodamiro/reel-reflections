import { useEffect, useRef } from 'react';

type UseTimedFunctionProps = {
  interval: number;
  isPaused?: boolean;
  targetFunction: () => void;
};

export default function useTimedFunction({ interval, targetFunction, isPaused = false }: UseTimedFunctionProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        targetFunction();
      }, interval);
    }
    return () => clearInterval(intervalRef.current!);
  }, [interval, targetFunction, isPaused]);
}
