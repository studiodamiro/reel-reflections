'use client';

import { useEffect, useState } from 'react';
import { useWidth } from '@/providers/WidthProvider';
import { useSpring } from 'framer-motion';
import { MdChevronLeft, MdChevronRight, MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { CarouselElement } from './CarouselElement';
import { useMovies } from '@/providers/MoviesProvider';
import useMeasure from 'react-use-measure';
import useTimedFunction from '@/hooks/useTimedFunction';

type CarouselProps = {
  infinite?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
};

export default function Carousel({ infinite = true, dots, controls, autoplay, className }: CarouselProps) {
  const AUTOPLAY_INTERVAL = 5000;
  const { movies } = useMovies();
  const { numberOfElements, elementBtnRatio, elementWidth, setElementWidth } = useWidth();
  const length = movies.length;

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render
    window.addEventListener('resize', handleWindowResize); // on resize event
    return () => window.removeEventListener('resize', handleWindowResize); // cleanup
  }, [numberOfElements, elementBtnRatio, setElementWidth]);

  let [paused, setPaused] = useState(true);
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

  const handleDotButtonClick = (index: number) => {
    const remainder = count % length;

    if (remainder > index) {
      const offset = remainder - index;
      setCount(count - offset);
    } else {
      const offset = index - remainder;
      setCount(count + offset);
    }
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

  useTimedFunction({
    interval: AUTOPLAY_INTERVAL,
    isPaused: paused,
    targetFunction: () => handleRightButtonClick(),
  });

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
            {movies.map((element, index: number | null | undefined) => (
              <CarouselElement
                key={element.slug}
                id={index!}
                infinite={infinite}
                motionValue={animatedValue}
                width={width}
                inView={isInView(index!)}
                viewDistance={viewDistanceValue(index!)}
                numberOfElements={numberOfElements}
                length={length}
                element={element}
              />
            ))}
          </div>
        </div>

        {/* LEFT & RIGHT BUTTONS */}
        <button
          onClick={handleLeftButtonClick}
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
          className='absolute top-0 left-0 bg-transparent flex items-center justify-center '
        >
          <MdChevronLeft className='h-10 w-10 text-black dark:text-white' />
        </button>

        <button
          onClick={handleRightButtonClick}
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
          className='absolute top-0 right-0 bg-transparent flex items-center justify-center'
        >
          <MdChevronRight className='h-10 w-10 text-black dark:text-white' />
        </button>

        {controls && (
          <div className={cn('relative w-full flex items-center h-8 mx-auto')}>
            {/* DOTS */}
            {dots && (
              <div className='w-full flex justify-center gap-3'>
                {movies.map((element, index: number | null | undefined) => {
                  if (index! % numberOfElements === 0) {
                    return (
                      <button
                        key={element.id}
                        onClick={() => handleDotButtonClick(index!)}
                        className={cn(
                          'w-2 h-2 rounded-full bg-gray-rg transition-all duration-300',
                          ((count % length) + length) % length === index
                            ? 'w-6 bg-black dark:bg-white'
                            : 'bg-black/20 dark:bg-white/20'
                        )}
                      />
                    );
                  }
                  return null;
                })}
                {/* Cover the remaining elements */}
                {length % numberOfElements !== 0 && (
                  <button
                    onClick={() => handleDotButtonClick(length - (length % numberOfElements))}
                    className={cn(
                      'w-2 h-2 rounded-full bg-gray-rg transition-all duration-300',
                      ((count % length) + length) % length === length - 1
                        ? 'w-6 bg-black dark:bg-white'
                        : 'bg-red=500 dark:bg-white/20'
                    )}
                  />
                )}
              </div>
            )}

            {/* AUTOPLAY */}
            {autoplay && (
              <>
                <button
                  onClick={() => setPaused((prev) => !prev)}
                  className={'absolute right-1 bg-black text-white p-0 m-0 w-6 h-6 rounded-full'}
                >
                  {paused ? <MdPlayCircle size={24} /> : <MdPauseCircle size={24} />}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
