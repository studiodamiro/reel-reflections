import { useEffect } from 'react';

type TimedFunctionProps = {
  delayMs: number;
  targetFunction: () => void;
  infiniteLoop?: boolean;
  isPaused?: boolean;
};

export default function TimedFunctionExecutor({
  delayMs,
  // infiniteLoop = false,
  targetFunction,
  isPaused = false,
}: TimedFunctionProps) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        targetFunction();
      }, delayMs);
    }

    return () => {
      clearInterval(intervalId!);
    };
  }, [delayMs, targetFunction, isPaused]);
}
