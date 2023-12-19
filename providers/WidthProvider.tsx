'use client';

import { ReactNode, createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';

interface WidthProps {
  numberOfElements: number;
  elementWidth: number;
  elementBtnRatio: number;
  windowWidth: number;
  containerWidth: number;
  breakpoint: string;
  setElementWidth: Dispatch<SetStateAction<number>>;
}

const WidthContext = createContext<WidthProps | undefined>(undefined);

export const useWidth = (): WidthProps => {
  const context = useContext(WidthContext);
  if (!context) {
    throw new Error('useWidth must be used within a WidthProvider');
  }
  return context;
};

interface WidthProviderProps {
  children: ReactNode;
}

export const WidthProvider = ({ children }: WidthProviderProps) => {
  const [numberOfElements, setNumberOfElements] = useState<number>(3); // use only odd numbers
  const [elementWidth, setElementWidth] = useState<number>(320);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [breakpoint, setBreakpoint] = useState<string>('md');
  const [elementBtnRatio, setElementBtnRatio] = useState<number>(0.8);

  const containerWidth = elementWidth * numberOfElements;

  const handleWindowResize = () => {
    const newWindowWidth = window.innerWidth;
    setWindowWidth(newWindowWidth);
    setElementBtnRatio(numberOfElements < 4 ? 0.4 : 0.8);

    let newBreakpoint = '3xl';
    let newNumberOfElements = 7;

    if (newWindowWidth < 480) {
      newBreakpoint = 'sm';
      newNumberOfElements = 3;
    } else if (newWindowWidth < 640) {
      newBreakpoint = 'md';
      newNumberOfElements = 3;
    } else if (newWindowWidth < 1024) {
      newBreakpoint = 'lg';
      newNumberOfElements = 4;
    } else if (newWindowWidth < 1200) {
      newBreakpoint = 'xl';
      newNumberOfElements = 5;
    } else if (newWindowWidth < 1800) {
      newBreakpoint = '2xl';
      newNumberOfElements = 6;
    }

    setBreakpoint(newBreakpoint);
    setNumberOfElements(newNumberOfElements);
  };

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render

    const debouncedHandleResize = debounce(handleWindowResize, 200);
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <WidthContext.Provider
      value={{
        numberOfElements,
        elementBtnRatio,
        containerWidth,
        elementWidth,
        windowWidth,
        breakpoint,
        setElementWidth,
      }}
    >
      {children}
    </WidthContext.Provider>
  );
};

// Debounce utility function
const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
      timeoutId = null;
    }, delay);
  };
};
