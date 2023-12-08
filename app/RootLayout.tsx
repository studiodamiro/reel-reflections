import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import { WidthProvider } from '@/providers/WidthProvider';
import Header from '@/components/Header';
import { Main } from 'next/document';
import Curtain from './Curtain';
import CarouselWrapper from '@/components/CarouselWrapper';
import { RootLayoutProps, font } from './layout';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          font.className,
          'antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50'
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <WidthProvider>
            <Header className='z-0 fixed -translate-x-1/2 left-1/2' />
            <Main className='absolute z-50 -translate-x-1/2 left-1/2'>{children}</Main>
            <Curtain />
            <CarouselWrapper className='z-0' />
          </WidthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
