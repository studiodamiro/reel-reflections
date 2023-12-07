'use client';

import React, { createContext, useContext, useState } from 'react';

type WidthType = {
  steps: number;
  elementWidth: number;
  elementBtnRatio: number;
  containerWidth: number;
  setElementWidth: React.Dispatch<React.SetStateAction<number>>;
};

// Create a context for the window width
const WidthContext = createContext<WidthType | undefined>(undefined);

// Custom hook to access the window width context
export const useWidth = () => {
  const context = useContext(WidthContext);
  if (!context) throw new Error('useWidth must be used within a WidthProvider');
  return context;
};

// Provider component to wrap your app and update the window width context
export const WidthProvider = ({ children }: { children: React.ReactNode }) => {
  const steps = 5; // use only odd numbers
  const elementBtnRatio = 0.5;
  const [elementWidth, setElementWidth] = useState(0);
  const containerWidth = elementWidth * steps;

  return (
    <WidthContext.Provider value={{ steps, elementBtnRatio, containerWidth, elementWidth, setElementWidth }}>
      {children}
    </WidthContext.Provider>
  );
};
