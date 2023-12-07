import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className='flex text-sm font-medium space-x-6'>
      <Link href='/about'>About</Link>
      <ThemeToggle />
    </nav>
  );
}
