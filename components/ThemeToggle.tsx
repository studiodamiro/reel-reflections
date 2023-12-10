'use client';

import { useTheme } from 'next-themes';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { Hydrate } from './Hydrate';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <div>
        <span className='sr-only'>Toggle Theme Button</span>
        <Hydrate>{theme !== 'dark' ? <BiSolidMoon /> : <BiSolidSun />}</Hydrate>
      </div>
    </button>
  );
}
