import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('whitespace-nowrap tracking-wider uppercase text-lg', className)}>
      <Link href='/'>
        Reel <span className='font-bold'>Reflections</span>
      </Link>
    </div>
  );
}
