import { cn } from '@/lib/utils';

export default function Main({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <>
      <main
        className={cn('relative flex flex-col items-center justify-center mt-16 pb-16 w-full max-w-3xl', className)}
      >
        {children}
      </main>
    </>
  );
}
