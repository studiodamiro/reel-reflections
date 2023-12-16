import Link from 'next/link';
// import { ThemeToggle } from './ThemeToggle';
import { FaQuestion } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

export default function Navigation() {
  return (
    <nav className='flex items-center text-sm font-medium space-x-2'>
      {/* <ThemeToggle /> */}
      <Link
        href='/about'
        className={cn(
          'rounded-lg w-6 aspect-square flex items-center justify-center',
          'bg-slate-200/50 hover:bg-white text-slate-950 shadow-md shadow-black/20',
          'transition-colors duration-300 ease-out'
        )}
      >
        <FaQuestion />
      </Link>
    </nav>
  );
}
