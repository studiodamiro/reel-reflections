'use client';

import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';

export default function Modal({ className, children }: { className?: string; children: React.ReactNode }) {
  const { containerWidth } = useWidth();

  return (
    <>
      <div
        style={{ width: containerWidth }}
        className={cn(
          'relative max-w-3xl flex flex-col items-center justify-center mx-auto my-20 px-4 bg-red-500/80 rounded-lg',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
