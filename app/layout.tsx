import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { WidthProvider } from '@/providers/WidthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import Main from '@/components/Main';
import Header from '@/components/Header';
import Curtain from '../components/Curtain';
import BackgroundSlider from '@/components/BackgroundSlider';
import CarouselWrapper from '@/components/CarouselWrapper';
import fetchMovies from '@/lib/fetchMovies';

const font = Inter({
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
          font.className,
          'antialiased min-h-screen',
          'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50',
          'transition-colors duration-300'
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <WidthProvider>
            <Curtain className='z-50' />
            <Header className='z-10 fixed -translate-x-1/2 left-1/2' />
            {/* <MovieDetail /> */}
            <Main className='absolute z-50 -translate-x-1/2 left-1/2'>{children}</Main>
            <CarouselWrapper elements={movies} className='z-10' />
            <BackgroundSlider />
          </WidthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
