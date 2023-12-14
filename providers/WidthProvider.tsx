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

export const useWidth = () => {
  const context = useContext(WidthContext);
  if (!context) throw new Error('useWidth must be used within a WidthProvider');
  return context;
};

interface WidthProviderProps {
  children: ReactNode;
}

export const WidthProvider = ({ children }: WidthProviderProps) => {
  const [numberOfElements, setNumberOfElements] = useState(3); // use only odd numbers
  const [elementWidth, setElementWidth] = useState(320);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [breakpoint, setBreakpoint] = useState('md');
  const [elementBtnRatio, setElementBtnRatio] = useState(0.8);

  const containerWidth = elementWidth * numberOfElements;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    setElementBtnRatio(numberOfElements < 4 ? 0.4 : 0.8);

    if (windowWidth < 480) {
      setBreakpoint('sm');
      setNumberOfElements(2);
    } else if (windowWidth < 768) {
      setBreakpoint('md');
      setNumberOfElements(3);
    } else if (windowWidth < 1024) {
      setBreakpoint('lg');
      setNumberOfElements(4);
    } else if (windowWidth < 1200) {
      setBreakpoint('xl');
      setNumberOfElements(5);
    } else if (windowWidth < 1800) {
      setBreakpoint('2xl');
      setNumberOfElements(6);
    } else {
      setBreakpoint('3xl');
      setNumberOfElements(7);
    }
    // console.log(breakpoint, windowWidth);
  };

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render
    window.addEventListener('resize', handleWindowResize); // on resize event
    return () => window.removeEventListener('resize', handleWindowResize); // cleanup
  }, [windowWidth]);

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
