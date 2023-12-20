import './globals.css';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { WidthProvider } from '@/providers/WidthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { MoviesProvider } from '@/providers/MoviesProvider';
import { cn } from '@/lib/utils';
import fetchMovies from '@/lib/fetchMovies';
import Curtain from '../components/Curtain';
import Home from '@/components/Home';
import Header from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Reel Reflections',
  description: 'Digital space where the magic of cinema comes to life through introspection and contemplation.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const movies = await fetchMovies();

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'antialiased min-h-screen',
          'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50',
          'transition-colors duration-300'
        )}
      >
        <MoviesProvider movies={movies}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <WidthProvider>
              <Home />
              <Curtain className='z-40' />
              <main className='absolute z-50 flex items-center justify-center w-full'>{children}</main>
            </WidthProvider>
          </ThemeProvider>
        </MoviesProvider>
      </body>
    </html>
  );
}
