import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='whitespace-nowrap tracking-wider uppercase text-lg'>
      Reel <span className='font-bold'>Reflections</span>
    </Link>
  );
}
