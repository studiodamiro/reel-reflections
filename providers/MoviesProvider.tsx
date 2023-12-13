'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MovieType } from '@/lib/fetchMovies';

interface MoviesProps {}

const MoviesContext = createContext<MoviesProps | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error('useMovies must be used within a MoviesProvider');
  return context;
};

interface MoviesProviderProps {
  films: MovieType[];
  children: ReactNode;
}

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  return <MoviesContext.Provider value={{ movies }}>{children}</MoviesContext.Provider>;
};
