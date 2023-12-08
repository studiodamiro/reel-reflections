import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function BackgroundSlider() {
  return (
    <div className='fixed top-0 left-0 w-full h-full opacity-50'>
      <Image
        src='/images/blog-post-1.jpg'
        fill
        priority
        sizes='full'
        alt='Background Image'
        className='object-center object-cover'
      />
      <div
        className={cn(
          'absolute w-screen h-screen top-0 left-0',
          'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
          'from-transparent from-15% via-slate-900/50 to-80% to-slate-900'
        )}
      />
    </div>
  );
}
