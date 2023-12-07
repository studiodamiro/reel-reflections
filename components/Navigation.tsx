import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { BiQuestionMark } from 'react-icons/bi';

export default function Navigation() {
  return (
    <nav className='flex items-center text-sm font-medium space-x-2'>
      <ThemeToggle />
      <Link href='/about' className='border rounded-md w-6 h-6 flex items-center justify-center'>
        <BiQuestionMark />
      </Link>
    </nav>
  );
}
