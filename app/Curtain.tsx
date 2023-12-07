import { cn } from '@/lib/utils';

export default function Curtain({ className }: { className?: string }) {
  return (
    <div className={cn('fixed z-10 top-0 left-0 w-full h-full bg-slate-200/80 dark:bg-slate-950/80', className)} />
  );
}
