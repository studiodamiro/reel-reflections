import { MovieType } from '@/lib/fetchMovies';
import { cn } from '@/lib/utils';
import { MotionValue, motion, useTransform } from 'framer-motion';

type ElementProps = {
  motionValue: MotionValue<number>;
  id: number;
  infinite: boolean;
  width: number;
  inView: boolean;
  viewDistance: number;
  numberOfElements: number;
  length: number;
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
  let x = useTransform(motionValue, (latest: number) => {
    let placeValue = latest % length;

    // offset left: Math.floor(numberOfElements / 2) * -1
    // offset right: Math.floor(numberOfElements / 2) * 1
    // no offset (centered): 0
    const offset = Math.floor(numberOfElements / 2) * -1;

    if (infinite) {
      let offsetValue = (length + id - placeValue + offset) % length; // Update the offset calculation using the 'offset' prop
      let memo = offsetValue * width;
      if (offsetValue > Math.floor(length / 2)) memo -= width * length;
      return memo;
    } else {
      let offsetValue = id - latest + offset; // Update the offset calculation using the 'offset' prop
      let memo = offsetValue * width;
      return memo;
    }
  });

  const hadleElementClick = (id: number) => {
    console.log(id, viewDistance, inView);
  };

  return (
    <motion.span style={{ x: x }} className={cn('absolute inset-0 flex justify-center group hover:z-10')}>
      <button
        onClick={() => hadleElementClick(id)}
        className={cn(
          'relative w-full h-full overflow-hidden m-0 p-0 rounded-sm md:rounded-md shadow-gray-md',
          'opacity-30 transition-all duration-700 object-cover object-center shadow-md shadow-black/50',
          'transform transition origin-center hover:scale-110 hover:duration-200 hover:delay-500',
          inView && 'opacity-100',
          viewDistance === 0 && 'origin-left',
          viewDistance === numberOfElements - 1 && 'origin-right'
        )}
      >
        <div className='relative w-full h-full bg-red-500 flex justify-center items-center'>
          {element.title}
          {/* <Image src={src} alt={alt} sizes='full' fill priority /> */}
        </div>
      </button>
    </motion.span>
  );
}
