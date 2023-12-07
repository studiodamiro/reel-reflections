import { allPosts } from '@/.contentlayer/generated';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='max-w-full prose dark:prose-invert prose-sm'>
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <>{post.description}</>}
        </article>
      ))}
    </div>
  );
}
