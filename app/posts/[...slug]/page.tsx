import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/Mdx';
import Article from '@/components/Article';

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <Article>
      <h1>{post.title}</h1>
      {post.description && <p className='text-xl'>{post.description}</p>}
      <hr className='my-4' />
      <Mdx code={post.body.code} />
    </Article>
  );
}
