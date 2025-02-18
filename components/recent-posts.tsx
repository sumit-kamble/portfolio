import { getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { JSX } from 'react'
import Posts from './posts'

export default async function RecentPosts(): Promise<JSX.Element> {
  const posts = await getPosts(3)

  return (
    <section className='mt-12'>
      <div className='container mx-auto max-w-4xl px-6 text-center'>
        <h4 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
          Recent Posts
        </h4>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          Stay updated with my latest articles.
        </p>

        <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map(post => (
            <div
              key={post.slug}
              className='transform rounded-lg border border-gray-200 bg-background shadow-lg transition-all hover:scale-105 hover:shadow-xl'
            >
              <Link href={`/posts/${post.slug}`} className='block p-6'>
                <h5 className='text-lg font-semibold'>{post.title}</h5>
                <p className='mt-3 text-sm text-gray-500'>{post.summary}</p>
                {post.publishedAt && (
                  <p className='mt-4 text-xs text-gray-400'>
                    Published on {formatDate(post.publishedAt)}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className='mt-8'>
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
