import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/Mdx';
import Article from '@/components/Article';
import { stringToDate } from '@/lib/stringToDate';

interface PostProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);
  if (!post) notFound();

  return (
    <Article title={post.title}>
      <h1 style={{ textWrap: 'balance' }} className='text-balance'>
        {post.article}
      </h1>
      <hr className='my-4' />
      {post.description && <p className='text-xl'>{post.description}</p>}
      <Mdx code={post.body.code} />
      <hr className='my-4' />
      {stringToDate(post.created)}
    </Article>
  );
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) null;

  return post;
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}
