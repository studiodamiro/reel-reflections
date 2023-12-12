'use client';

import Image from 'next/image';
import useMeasure from 'react-use-measure';
import useTimedFunction from '@/hooks/useTimedFunction';
import { useEffect, useState } from 'react';
import { useWidth } from '@/providers/WidthProvider';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { MdChevronLeft, MdChevronRight, MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { allPosts as elements, type Post } from 'contentlayer/generated';

type CarouselProps = {
  infinite?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
};

// const elements = movieData;
const AUTOPLAY_INTERVAL = 5000;

export default function Carousel({ infinite = true, dots, controls, autoplay, className }: CarouselProps) {
  const { numberOfElements, elementBtnRatio, elementWidth, setElementWidth } = useWidth();
  const [paused, setPaused] = useState(true);
  const [count, setCount] = useState(0);
  const [refImage, { width, height, left }] = useMeasure();
  const animatedValue = useSpring(count, { stiffness: 50, damping: 12, duration: 1000 });

  useEffect(() => {
    handleWindowResize(); // Calculate on initial render
    window.addEventListener('resize', handleWindowResize); // on resize event
    return () => window.removeEventListener('resize', handleWindowResize); // cleanup
  }, [numberOfElements, elementBtnRatio, setElementWidth]);

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

    // CENTERED
    // const distance = Math.min(Math.abs(validCount - id), elements.length - Math.abs(validCount - id));
    // return distance <= numberOfElements / 2;

    // LEFT
    const distance = (id - validCount + elements.length) % elements.length;
    return distance <= numberOfElements - 1;
  };

  const viewDistanceValue = (id: number) => {
    const validCount = ((count % elements.length) + elements.length) % elements.length;
    return (id - validCount + elements.length) % elements.length;
  };

  useTimedFunction({
    interval: AUTOPLAY_INTERVAL,
    targetFunction: () => {
      handleRightButtonClick();
    },
    isPaused: paused,
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
            {elements.map((element, index) => (
              <Element
                key={index}
                id={index}
                infinite={infinite}
                motionValue={animatedValue}
                width={width}
                inView={isInView(index)}
                viewDistance={viewDistanceValue(index)}
                numberOfElements={numberOfElements}
                element={element}
              />
            ))}
          </div>
        </div>

        {/* LEFT & RIGHT BUTTONS */}
        <button
          onClick={handleLeftButtonClick}
          style={{ height: height, width: elementWidth * (elementBtnRatio / 2) + 'px' }}
          className='absolute top-0 left-0 bg-blue-500/10 flex items-center justify-center '
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
  infinite: boolean;
  width: number;
  inView: boolean;
  viewDistance: number;
  numberOfElements: number;
  element: Post;
};

function Element({ id, motionValue, infinite, width, inView, viewDistance, numberOfElements, element }: ElementProps) {
  const x = useTransform(motionValue, (latest: number) => {
    const length = elements.length;
    const placeValue = latest % length;

    // offset left: Math.floor(numberOfElements / 2) * -1
    // offset right: Math.floor(numberOfElements / 2) * 1
    // no offset (centered): 0
    const offset = Math.floor(numberOfElements / 2) * -1;

    if (infinite) {
      const offsetValue = (length + id - placeValue + offset) % length; // Update the offset calculation using the 'offset' prop
      let memo = offsetValue * width;
      if (offsetValue > Math.floor(length / 2)) memo -= width * length;
      return memo;
    } else {
      const offsetValue = id - latest + offset; // Update the offset calculation using the 'offset' prop
      let memo = offsetValue * width;
      return memo;
    }
  });

  const hadleElementClick = (id: number) => {
    console.log(id, viewDistance, inView);
  };

  return (
    <motion.span style={{ x: x }} className={cn('absolute inset-0 flex justify-center group hover:z-10')}>
      <div
        onClick={() => hadleElementClick(id)}
        className={cn(
          'relative w-full h-full overflow-hidden m-0 p-0 rounded-sm md:rounded-md shadow-gray-md',
          'opacity-30 transition-all duration-700 object-cover object-center shadow-md shadow-black/50',
          inView && 'opacity-100',
          'transform transition origin-center hover:scale-110 hover:duration-200 hover:delay-500',
          viewDistance === 0 && 'origin-left',
          viewDistance === numberOfElements - 1 && 'origin-right'
        )}
      >
        <div className='absolute inset-0 bg-red500'>
          {element.release.substring(0, 4)} - {element.title}
        </div>
      </div>
    </motion.span>
  );
}
