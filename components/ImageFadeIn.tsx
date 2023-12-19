'use client';

import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import placeholder from '@/public/placeholder.png';

interface ImageFadeInProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ImageFadeIn({ src, alt, priority = false, className }: ImageFadeInProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // or sizes='full'
      priority={priority}
      placeholder='blur'
      blurDataURL={placeholder.src}
      onLoad={(event: SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        if (target.src.indexOf('data:image/gif;base64') < 0) setImageIsLoaded(true); // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
      }}
      className={cn('opacity-0', className, imageIsLoaded && 'opacity-100 transition-opacity duration-300 ease-in')}
    />
  );
}
