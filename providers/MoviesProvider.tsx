'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { MovieType } from '@/lib/fetchMovies';
import useTimedFunction from '@/hooks/useTimedFunction';

interface MoviesProps {
  movies: MovieType[];
  currentMovieIndex: number;
  setCurrentMovieIndex: Dispatch<SetStateAction<number>>;
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
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useTimedFunction({
    interval: 5000,
    targetFunction: () => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % (movies?.length ?? 0));
    },
  });

  return (
    <MoviesContext.Provider value={{ movies, currentMovieIndex, setCurrentMovieIndex }}>
      {children}
    </MoviesContext.Provider>
  );
};
