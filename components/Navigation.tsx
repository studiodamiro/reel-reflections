import Link from 'next/link';
// import { ThemeToggle } from './ThemeToggle';
import { FaQuestion } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

export default function Navigation() {
  return (
    <nav className='flex items-center justify-center text-sm font-medium space-x-2'>
      <Link
        href='/request-reflection'
        className={cn(
          'rounded-md w-full h-6 flex items-center justify-center px-4',
          'uppercase font-semibold tracking-wider text-xs',
          'bg-slate-200/50 hover:bg-white text-slate-950 shadow-md shadow-black/20',
          'transition-colors duration-300 ease-out'
        )}
      >
        Request
      </Link>
      <Link
        href='/about'
        className={cn(
          'rounded-md w-6 h-6 aspect-square flex items-center justify-center',
          'bg-slate-200/50 hover:bg-white text-slate-950 shadow-md shadow-black/20',
          'transition-colors duration-300 ease-out'
        )}
      >
        <FaQuestion />
      </Link>
      {/* <ThemeToggle /> */}
    </nav>
  );
}
