import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPages } from 'contentlayer/generated';
import { Mdx } from '@/components/Mdx';
import ArticlePage from '@/components/ArticlePage';

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <ArticlePage>
      <h1>{page.title}</h1>
      {page.description && <p className=' pt-4 text-sm font-semibold sm:text-xl sm:font-normal'>{page.description}</p>}
      <hr className='my-4' />
      <Mdx code={page.body.code} />
    </ArticlePage>
  );
}
