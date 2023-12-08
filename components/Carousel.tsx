'use client';

import Image from 'next/image';
import useMeasure from 'react-use-measure';
import { useEffect, useState } from 'react';
import { useWidth } from '@/providers/WidthProvider';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { MdChevronLeft, MdChevronRight, MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { movieData } from '@/data/movies';
import TimedFunctionExecutor from './TimedFunctionExecutor';

const elements = movieData;

type CarouselProps = {
  infinite?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
};

export default function Carousel({ infinite = true, dots, controls, autoplay, className }: CarouselProps) {
  const AUTOPLAYDELAY = 5000;
  const { numberOfElements, elementBtnRatio, elementWidth, setElementWidth } = useWidth();

  const handleWindowResize = () => {
    const elementWidth = window.innerWidth / (numberOfElements + elementBtnRatio);
    setElementWidth(elementWidth);
  };

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render
    window.addEventListener('resize', handleWindowResize); // on resize event
    return () => window.removeEventListener('resize', handleWindowResize); // cleanup
  }, [numberOfElements, elementBtnRatio, setElementWidth]);

  let [paused, setPaused] = useState(true);
  let [count, setCount] = useState(0);
  let [refImage, { width, height, left }] = useMeasure();
  let animatedValue = useSpring(count, { stiffness: 50, damping: 12, duration: 1000 });

  useEffect(() => {
    animatedValue.set(count);
  }, [animatedValue, count]);

  const handleLeftButtonClick = () => {
    setCount((prev) => {
      if (infinite) {
        return prev - numberOfElements;
      } else {
        return prev - numberOfElements < 0 ? elements.length - 1 : prev - numberOfElements;
      }
    });
  };

  const handleRightButtonClick = () => {
    setCount((prevCount) => {
      if (infinite) {
        return prevCount + numberOfElements;
      } else {
        return prevCount + numberOfElements >= elements.length ? 0 : prevCount + numberOfElements;
      }
    });
  };

  const handleDotButtonClick = (index: number) => {
    const remainder = count % elements.length;

    if (remainder > index) {
      const offset = remainder - index;
      setCount(count - offset);
    } else {
      const offset = index - remainder;
      setCount(count + offset);
    }
  };

  const isInView = (id: number) => {
    const validCount = ((count % elements.length) + elements.length) % elements.length;
    const distance = Math.min(Math.abs(validCount - id), elements.length - Math.abs(validCount - id));
    return distance <= numberOfElements / 2;
  };

  const viewDistanceValue = (id: number) => {
    const validCount = ((count % elements.length) + elements.length) % elements.length;
    const distance = (validCount - id + elements.length) % elements.length;
    return distance <= elements.length / 2 ? distance : distance - elements.length;
  };

  return (
    <div className={className}>
      <div className='relative pb-0 overflow-visible'>
        {/* CAROUSEL */}
        <div
          ref={refImage}
          style={{ maxWidth: elementWidth + 'px' }}
          className={cn('flex px-1 md:px-2 mx-auto aspect-video')}
        >
          <div className={'relative w-full'}>
            {elements.map((element, index) => (
              <Element
                key={index}
                id={element.id}
                infinite={infinite}
                motionValue={animatedValue}
                src={element.src}
                width={width}
                alt={element.tagline}
                inView={isInView(element.id)}
                viewDistance={viewDistanceValue(element.id)}
              />
            ))}
          </div>
        </div>

        {/* LEFT & RIGHT BUTTONS */}
        <button
          onClick={handleLeftButtonClick}
          className='absolute top-0 left-0 bg-transparent flex items-center justify-center'
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
        >
          <MdChevronLeft className='h-10 w-10 text-black dark:text-white' />
        </button>

        <button
          onClick={handleRightButtonClick}
          className='absolute top-0 right-0 bg-transparent flex items-center justify-center'
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
        >
          <MdChevronRight className='h-10 w-10 text-black dark:text-white' />
        </button>

        {controls && (
          <div className={cn('relative w-full flex items-center h-8 mx-auto')}>
            {/* DOTS */}
            {dots && (
              <div className='w-full flex justify-center gap-3'>
                {elements.map((_, index) => {
                  if (index % numberOfElements === 0) {
                    return (
                      <button
                        key={index}
                        onClick={() => handleDotButtonClick(index)}
                        className={cn(
                          'w-2 h-2 rounded-full bg-gray-rg transition-all duration-300',
                          ((count % elements.length) + elements.length) % elements.length === index
                            ? 'w-6 bg-black dark:bg-white'
                            : 'bg-black/20 dark:bg-white/20'
                        )}
                      />
                    );
                  }
                  return null;
                })}
                {/* Cover the remaining elements */}
                {elements.length % numberOfElements !== 0 && (
                  <button
                    onClick={() => handleDotButtonClick(elements.length - (elements.length % numberOfElements))}
                    className={cn(
                      'w-2 h-2 rounded-full bg-gray-rg transition-all duration-300',
                      ((count % elements.length) + elements.length) % elements.length === elements.length - 1
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
                <TimedFunctionExecutor
                  delayMs={AUTOPLAYDELAY}
                  targetFunction={() => handleRightButtonClick()}
                  isPaused={paused}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type ElementProps = {
  motionValue: MotionValue<number>;
  id: number;
  src: string;
  infinite: boolean;
  width: number;
  alt: string;
  inView: boolean;
  viewDistance: number;
};

function Element({ src, alt, id, motionValue, infinite, width, inView, viewDistance }: ElementProps) {
  let x = useTransform(motionValue, (latest: number) => {
    let length = elements.length;
    let placeValue = latest % length;

    if (infinite) {
      let offset = (length + id - placeValue) % length;
      let memo = offset * width;
      if (offset > Math.floor(length / 2)) memo -= width * length;
      return memo;
    } else {
      let offset = id - latest;
      let memo = offset * width;
      return memo;
    }
  });

  return (
    <motion.span style={{ x: x }} className={cn('absolute inset-0 flex justify-center group hover:z-10')}>
      <button
        onClick={() => console.log(viewDistance)}
        className={cn(
          'relative w-full h-full overflow-hidden m-0 p-0 rounded-sm md:rounded-md shadow-gray-md',
          'opacity-30 transition-all duration-700 object-cover object-center shadow-md shadow-black/50',
          inView && 'opacity-100',
          'transform transition origin-center hover:scale-110 hover:duration-200 hover:delay-500',
          viewDistance === -2 && 'origin-right',
          viewDistance === 2 && 'origin-left'
        )}
      >
        <Image src={src} alt={alt} sizes='full' fill priority />
      </button>
    </motion.span>
  );
}
