import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface WidthProviderProps {
  children?: ReactNode;
  className?: string;
}

export default function Main({ className, children }: WidthProviderProps) {
  return <main className={cn('flex flex-col items-center justify-center py-6 sm:py-16', className)}>{children}</main>;
}
