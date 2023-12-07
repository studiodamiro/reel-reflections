'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type WidthType = {
  steps: number;
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

export const WidthProvider = ({ children }: { children: React.ReactNode }) => {
  const [steps, setSteps] = useState(3); // use only odd numbers
  const [elementWidth, setElementWidth] = useState(0);
  const [breakpoint, setBreakpoint] = useState('sm');
  const [windowWidth, setWindowWidth] = useState(0);

  const elementBtnRatio = 0.5;
  const containerWidth = elementWidth * steps;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth < 580) {
      setBreakpoint('sm');
      setSteps(3);
    } else if (windowWidth < 2048) {
      setBreakpoint('md');
      setSteps(5);
    } else {
      setBreakpoint('lg');
      setSteps(7);
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
      value={{ steps, elementBtnRatio, containerWidth, elementWidth, windowWidth, breakpoint, setElementWidth }}
    >
      {children}
    </WidthContext.Provider>
  );
};
