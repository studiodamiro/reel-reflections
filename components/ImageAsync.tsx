'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageAsyncProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export const ImageAsync = ({ src, alt, priority = false, className }: ImageAsyncProps) => {
  const [reveal, setReveal] = useState(false);
  const visibility = reveal ? 'visible' : 'invisible';
  const loader = reveal ? 'hidden' : 'block';

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='full'
        priority={priority}
        onError={() => setReveal(true)}
        onLoadingComplete={() => setReveal(true)}
        className={cn(visibility, className)}
      />
      <span className={cn('absolute inset-0', loader)}>Loading...</span>
    </>
  );
};
