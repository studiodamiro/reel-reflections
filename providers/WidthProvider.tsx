'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type WidthType = {
  numberOfElements: number;
  elementWidth: number;
  elementBtnRatio: number;
  windowWidth: number;
  containerWidth: number;
  breakpoint: string;
  setElementWidth: React.Dispatch<React.SetStateAction<number>>;
};

const WidthContext = createContext<WidthType | undefined>(undefined);

export const useWidth = () => {
  const context = useContext(WidthContext);
  if (!context) throw new Error('useWidth must be used within a WidthProvider');
  return context;
};

export const WidthProvider = ({ children }: { children: ReactNode }) => {
  const [numberOfElements, setNumberOfElements] = useState(3); // use only odd numbers
  const [elementWidth, setElementWidth] = useState(320);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [breakpoint, setBreakpoint] = useState('md');

  const elementBtnRatio = 0.5;
  const containerWidth = elementWidth * numberOfElements;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth < 580) {
      setBreakpoint('sm');
      setNumberOfElements(3);
    } else if (windowWidth < 2048) {
      setBreakpoint('md');
      setNumberOfElements(5);
    } else {
      setBreakpoint('lg');
      setNumberOfElements(7);
    }
    // console.log(breakpoint, windowWidth);
  };

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render
    window.addEventListener('resize', handleWindowResize); // on resize event
    return () => window.removeEventListener('resize', handleWindowResize); // cleanup
  }, [windowWidth, setWindowWidth]);

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
