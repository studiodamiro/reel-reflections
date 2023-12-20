import Link from 'next/link';
import { cn } from '@/lib/utils';
import { image_url } from '@/lib/constants';
import { useWidth } from '@/providers/WidthProvider';
import { MovieType } from '@/lib/fetchMovies';
import ImageFadeIn from './ImageFadeIn';
import Marker from './Marker';

type CollectionCardProps = {
  id: number;
  movie: MovieType;
};

export default function CollectionCard({ movie, id }: CollectionCardProps) {
  const { elementWidth } = useWidth();

  return (
    <div style={{ width: elementWidth }} className='px-1 sm:px-2 py-6'>
      <Link href={`${movie.slug}`}>
        <div className='relative z-0 group'>
          {/* MARKER */}
          <Marker
            text={'latest'}
            id={id}
            color={'red'}
            className='scale-100 group-hover:scale-110 origin-top-left transition-all duration-300'
          />

          <div
            className={cn(
              'object-center object-cover w-full aspect-[3/4] overflow-hidden rounded-md m-0 p-0 shadow-black/20 shadow-md',
              'opacity-50 hover:opacity-100 scale-100 hover:scale-110',
              'transition-all duration-300'
            )}
          >
            {/* ARTICLE TITLE */}
            <div
              className={cn(
                'absolute z-[2] bottom-0 w-full p-4',
                'bg-gradient-to-b from-0% via-1% to-100% ',
                'from-slate-900/0 via-slate-900/90 to-slate-900',
                'opacity-100 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:translate-y-8 group-hover:translate-y-0',
                'transition-all duration-300 delay-300'
              )}
            >
              <p style={{ textWrap: 'balance' }} className='text-xs sm:text-sm font-semibold leading-1'>
                {movie.article}
              </p>
            </div>

            {/* POSTER IMAGE */}
            <div
              className={cn(
                'hidden sm:block absolute z-[1] inset-0 bg-slate-950/20 group-hover:bg-slate-950/0',
                'backdrop-grayscale group-hover:backdrop-grayscale-0',
                'transition-all duration-300 mix-blend-multiply'
              )}
            />
            {movie.poster ? (
              <ImageFadeIn
                src={`${image_url}${movie.poster}`}
                alt={`${movie.title} poster image`}
                className='object-center object-cover'
              />
            ) : (
              <div className='w-full h-full bg-slate-800' />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
