'use client';

import { ReactNode, createContext, useContext } from 'react';
import { MovieType } from '@/lib/fetchMovies';

interface MoviesProps {
  movies: MovieType[];
}

const MoviesContext = createContext<MoviesProps | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context.movies;
};

interface MoviesProviderProps {
  movies: MovieType[];
  children: ReactNode;
}

export const MoviesProvider = ({ movies, children }: MoviesProviderProps) => {
  return <MoviesContext.Provider value={{ movies }}>{children}</MoviesContext.Provider>;
};
