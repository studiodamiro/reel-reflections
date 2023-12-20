'use client';

import { useEffect, useState } from 'react';
import { useWidth } from '@/providers/WidthProvider';
import { useSpring } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CarouselElement } from './CarouselElement';
import { useMovies } from '@/providers/MoviesProvider';
import { cn } from '@/lib/utils';
import useMeasure from 'react-use-measure';

type CarouselProps = {
  infinite?: boolean;
  className?: string;
};

export default function Carousel({ infinite = true, className }: CarouselProps) {
  const { recentMovies } = useMovies();
  const { numberOfElements, elementBtnRatio, elementWidth, setElementWidth } = useWidth();
  const length = recentMovies.length;

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render
    window.addEventListener('resize', handleWindowResize); // on resize event
    return () => window.removeEventListener('resize', handleWindowResize); // cleanup
  }, [numberOfElements, elementBtnRatio, setElementWidth]);

  let [count, setCount] = useState(0);
  let [refImage, { width, height }] = useMeasure();
  let animatedValue = useSpring(count, { stiffness: 50, damping: 12, duration: 1000 });

  useEffect(() => {
    animatedValue.set(count);
  }, [animatedValue, count]);

  const handleWindowResize = () => {
    const elementWidth = window.innerWidth / (numberOfElements + elementBtnRatio);
    setElementWidth(elementWidth);
  };

  const handleLeftButtonClick = () => {
    setCount((prev) => {
      if (infinite) {
        return prev - numberOfElements;
      } else {
        return prev - numberOfElements < 0 ? length - 1 : prev - numberOfElements;
      }
    });
  };

  const handleRightButtonClick = () => {
    setCount((prevCount) => {
      if (infinite) {
        return prevCount + numberOfElements;
      } else {
        return prevCount + numberOfElements >= length ? 0 : prevCount + numberOfElements;
      }
    });
  };

  const isInView = (id: number) => {
    const validCount = ((count % length) + length) % length;

    // CENTERED
    // const distance = Math.min(Math.abs(validCount - id), length - Math.abs(validCount - id));
    // return distance <= numberOfElements / 2;

    // LEFT
    const distance = (id - validCount + length) % length;
    return distance <= numberOfElements - 1;
  };

  const viewDistanceValue = (id: number) => {
    const validCount = ((count % length) + length) % length;
    return (id - validCount + length) % length;
  };

  return (
    <div className={className}>
      <div className='relative pb-0 overflow-visible'>
        {/* CAROUSEL */}
        <div
          ref={refImage}
          style={{ maxWidth: elementWidth + 'px' }}
          className={cn('flex px-1 md:px-2 aspect-video mx-auto')}
        >
          <div className={'relative w-full'}>
            {recentMovies.map((movie, index: number | null | undefined) => (
              <CarouselElement
                key={movie.id}
                id={index!}
                infinite={infinite}
                motionValue={animatedValue}
                width={width}
                inView={isInView(index!)}
                viewDistance={viewDistanceValue(index!)}
                numberOfElements={numberOfElements}
                length={length}
                element={movie}
              />
            ))}
          </div>
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={handleLeftButtonClick}
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
          className='absolute top-0 left-0 bg-transparent flex items-center justify-center '
        >
          <MdChevronLeft className='h-10 w-10 text-black dark:text-white' />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={handleRightButtonClick}
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
          className='absolute top-0 right-0 bg-transparent flex items-center justify-center'
        >
          <MdChevronRight className='h-10 w-10 text-black dark:text-white' />
        </button>
      </div>
    </div>
  );
}
