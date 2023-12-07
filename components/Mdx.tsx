import NextImage, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Counter from './Counter';

const components = {
  // Image using next/image
  // USAGE: <Image src="..." alt="..." />
  Image: (props: ImageProps) => (
    <div className='relative aspect-video object-cover object-center overflow-hidden rounded-lg items-center justify-center flex'>
      <NextImage {...props} fill sizes='full' priority className='m-0 object-center object-cover' />
    </div>
  ),

  // Sample custom component
  // USAGE: <Counter />
  Counter,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
