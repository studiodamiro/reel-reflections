import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/Mdx';
import { stringToDate } from '@/lib/stringToDate';
import ArticlePost from '@/components/ArticlePost';

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
    <ArticlePost title={post.title}>
      {post.description && (
        <p className=' pt-4 text-center sm:text-left text-sm font-semibold sm:text-xl sm:font-normal'>
          {post.description}
        </p>
      )}
      <hr className='my-4' />
      <Mdx code={post.body.code} />
      <hr className='my-4' />
      {stringToDate(post.created)}
    </ArticlePost>
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
