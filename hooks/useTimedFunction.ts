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
  isPaused = false,
  targetFunction,
}: UseTimedFunctionProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function executeTimedFunction() {
      intervalRef.current = setInterval(targetFunction, interval);
    }

    if (!isPaused) {
      timeoutRef.current = setTimeout(executeTimedFunction, delay);
    }

    return () => {
      clearTimeout(timeoutRef.current!);
      clearInterval(intervalRef.current!);
    };
  }, [interval, delay, targetFunction, isPaused]);
}
