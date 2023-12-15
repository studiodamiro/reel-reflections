'use client';

import { MovieType } from '@/lib/fetchMovies';
import { cn } from '@/lib/utils';
import { useMovies } from '@/providers/MoviesProvider';
import { useWidth } from '@/providers/WidthProvider';
import { useEffect, useState } from 'react';

export default function BackgroundDetail() {
  const { containerWidth, elementWidth } = useWidth();
  const { movies } = useMovies();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<MovieType | null>(null);

  useEffect(() => {
    setCurrentImage(movies[currentImageIndex] ?? null);
  }, [currentImageIndex]);

  return (
    <div
      style={{ width: containerWidth, paddingBottom: `${elementWidth + 30}px` }}
      className={cn(
        'fixed inset-0 w-full min-h-screen mx-auto px-4 md:px-6 py-6 bg-red-500/20',
        'flex flex-col justify-end'
      )}
    >
      BackgroundDetail
    </div>
  );
}
