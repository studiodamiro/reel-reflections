import { useEffect } from 'react';

type TimedFunctionProps = {
  delayMs: number;
  targetFunction: () => void;
  isPaused?: boolean;
};

export default function TimedFunctionExecutor({ delayMs, targetFunction, isPaused = false }: TimedFunctionProps) {
  useEffect(() => {
    let intervalID: NodeJS.Timeout | null = null;

    if (!isPaused) {
      intervalID = setInterval(() => {
        targetFunction();
      }, delayMs);
    }

    return () => {
      clearInterval(intervalID!);
    };
  }, [delayMs, targetFunction, isPaused]);

  return null;
}
