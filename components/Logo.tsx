import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href='/' className={cn('whitespace-nowrap tracking-wider uppercase text-lg', className)}>
      Reel <span className='font-bold'>Reflections</span>
    </Link>
  );
}
