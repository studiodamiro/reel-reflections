'use client';

import { useTheme } from 'next-themes';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='border rounded-md w-6 h-6 flex items-center justify-center'
    >
      <span className='sr-only'>Toggle Theme</span>
      {/* `typeof window !== 'undefined'` is a hack to compensate for Warning: Prop `d` did not match.*/}
      {typeof window !== 'undefined' && theme !== 'dark' ? <BiSolidMoon /> : <BiSolidSun />}
    </button>
  );
}
