import { getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { JSX } from 'react'
import Posts from './posts'

export default async function RecentPosts(): Promise<JSX.Element> {
  const posts = await getPosts(3)

  return (
    <section className='mt-12'>
      <div className='container mx-auto max-w-4xl px-6'>
        <h4 className='text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
          Recent Posts
        </h4>
        <p className='mt-2 text-left text-gray-600 dark:text-gray-400'>
          Latest posts or blogs on my fav topics.
        </p>

        <div className='mt-8 divide-y divide-gray-200 dark:divide-gray-700'>
          {posts.map(post => (
            <div
              key={post.slug}
              className='flex items-center justify-between py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <p className='text-sm text-gray-500'>
                {post.publishedAt ? formatDate(post.publishedAt) : 'No date'}
              </p>

              <div className='mx-4 flex-1'>
                <Link href={`/posts/${post.slug}`} className='block'>
                  <h5 className='text font-semibold text-gray-900 hover:underline dark:text-gray-100'>
                    {post.title}
                  </h5>
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {post.summary}
                  </p>
                </Link>
              </div>

              {/* Additional Info (Optional) */}
              {/* {post.readTime && (
                <p className='text-xs text-gray-500'>
                  {post.readTime} min read
                </p>
              )} */}
            </div>
          ))}
        </div>

        <div className='mt-8 text-center'>
          <Link
            href='/posts'
            className='inline-block rounded-lg bg-gray-900 px-6 py-2 text-white transition-all hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300'
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
