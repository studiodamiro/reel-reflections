'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { MovieType } from '@/lib/fetchMovies';
import useTimedFunction from '@/hooks/useTimedFunction';

interface MoviesProps {
  movies: MovieType[];
  recentMovies: MovieType[];
  currentMovieIndex: number;
  currentRecentMovieIndex: number;
  priColor: string;
  secColor: string;
  setPriColor: Dispatch<SetStateAction<string>>;
  setSecColor: Dispatch<SetStateAction<string>>;
  setCurrentMovieIndex: Dispatch<SetStateAction<number>>;
  setCurrentRecentMovieIndex: Dispatch<SetStateAction<number>>;
}

const MoviesContext = createContext<MoviesProps | undefined>(undefined);

export const useMovies = (): MoviesProps => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error('useMovies must be used within a MoviesProvider');
  return context;
};

interface MoviesProviderProps {
  movies: MovieType[];
  children: ReactNode;
}

export const MoviesProvider = ({ movies, children }: MoviesProviderProps) => {
  const INTERVAL = 2000;
  const RECENT_QTY = 12;

  // Sort movies by created date
  movies.sort((a, b) => {
    const dateA = a.created ? new Date(a.created).getTime() : 0;
    const dateB = b.created ? new Date(b.created).getTime() : 0;
    return dateB - dateA;
  });

  const recentMovies = movies.slice(0, RECENT_QTY);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentRecentMovieIndex, setCurrentRecentMovieIndex] = useState(0);
  const [priColor, setPriColor] = useState('#ffffff');
  const [secColor, setSecColor] = useState('#cccccc');

  useTimedFunction({
    interval: INTERVAL,
    targetFunction: () => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % (movies?.length ?? 0));
      setCurrentRecentMovieIndex((prevIndex) => (prevIndex + 1) % (recentMovies?.length ?? 0));
    },
  });

  return (
    <MoviesContext.Provider
      value={{
        movies,
        recentMovies,
        currentMovieIndex,
        currentRecentMovieIndex,
        priColor,
        secColor,
        setPriColor,
        setSecColor,
        setCurrentMovieIndex,
        setCurrentRecentMovieIndex,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
