'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageFadeInProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ImageFadeIn({ src, alt, priority = false, className }: ImageFadeInProps) {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      sizes='full'
      priority={priority}
      onError={() => setReveal(true)}
      onLoadingComplete={() => setReveal(true)}
      className={cn(
        'opacity-0',
        className,
        reveal && isInView && 'opacity-100 transition-opacity duration-150 delay-75 ease-in'
      )}
    />
  );
}
