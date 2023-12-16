import Image from 'next/image';
import { MovieType } from '@/lib/fetchMovies';
import { MotionValue, motion, useTransform } from 'framer-motion';
import { image_url } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type ElementProps = {
  id: number;
  motionValue: MotionValue<number>;
  infinite: boolean;
  width: number;
  inView: boolean;
  viewDistance: number;
  length: number;
  numberOfElements: number;
  element: MovieType;
};

export function CarouselElement({
  id,
  motionValue,
  infinite,
  width,
  inView,
  viewDistance,
  length,
  numberOfElements,
  element,
}: ElementProps) {
  const x = useTransform(motionValue, (latest: number) => {
    const placeValue = latest % length;

    // offset left: Math.floor(numberOfElements / 2) * -1
    // offset right: Math.floor(numberOfElements / 2) * 1
    // no offset (centered): 0
    const offset = Math.floor(numberOfElements / 2) * -1;

    if (infinite) {
      const offsetValue = (length + id - placeValue + offset) % length;
      let memo = numberOfElements % 2 === 0 ? offsetValue * width + width / 2 : offsetValue * width;
      if (offsetValue > Math.floor(length / 2)) memo -= width * length;
      return memo;
    } else {
      const offsetValue = id - latest + offset;
      let memo = offsetValue * width;
      return memo;
    }
  });

  const router = useRouter();
  const navToPost = (slug: string) => {
    router.push(slug);
  };

  return (
    <motion.span style={{ x: x }} className={cn('absolute inset-0 flex justify-center group hover:z-10')}>
      <button
        onClick={() => element.slug && navToPost(element.slug)}
        className={cn(
          'relative w-full h-full overflow-hidden m-0 p-0 rounded-sm md:rounded-md shadow-gray-md group',
          'opacity-30 transition-all duration-700 object-cover object-center shadow-md shadow-black/50',
          'transform transition origin-center hover:scale-110 hover:duration-200 hover:delay-500',
          inView && 'opacity-100',
          viewDistance === 0 && 'origin-left',
          viewDistance === numberOfElements - 1 && 'origin-right'
        )}
      >
        <div className='relative w-full h-full'>
          <Image
            src={`${image_url}${element.logos?.[0]}`}
            alt={`Movie logo for ${element.title}`}
            sizes='full'
            fill
            priority
            className='z-20 scale-[0.66] oject-center object-contain'
          />
          <div
            className={cn(
              'absolute z-10 inset-0 bg-black/60 group-hover:bg-black/0',
              'transition-full duration-700 delay-500'
            )}
          />
          <Image
            src={`${image_url}${element.backdrops?.[0]}`}
            alt={`Movie backdrop for ${element.title}`}
            sizes='full'
            fill
            className={cn(
              'z-0 object-center object-cover',
              'transition-full duration-700 delay-500',
              'grayscale group-hover:grayscale-0'
            )}
          />
        </div>
      </button>
    </motion.span>
  );
}
