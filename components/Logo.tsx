import { cn } from '@/lib/utils';
import Link from 'next/link';
import ReelLogo from './ReelLogo';

type LogoProps = {
  className?: string;
  color?: string;
  secColor?: string;
};

export default function Logo({ className, color = '#cbd5e1', secColor = '#94a3b8' }: LogoProps) {
  return (
    <div className={cn('whitespace-nowrap', className)}>
      <Link href='/' className='flex flex-col items-left gap-0 m-0'>
        <span className='sr-only'>Reel Reflection Logo</span>
        <ReelLogo
          color={color}
          secColor={secColor}
          className='w-xs aspect-video transition-colors duration-700 ease-in'
        />
      </Link>
    </div>
  );
}
