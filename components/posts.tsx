import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PostMetadata } from '@/lib/posts' // Ensure this is correctly imported

export default function Posts({ posts }: { posts: PostMetadata[] }) {
  return (
    <ul className='flex flex-col gap-8'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className='flex flex-col justify-between gap-x-6 gap-y-1 sm:flex-1'
          >
            <div>
              <p className='text-lg font-semibold'>{post.title}</p>
              <p className='text-gray-600 dark:text-gray-400'>{post.summary}</p>
            </div>

            {post.publishedAt && (
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {formatDate(post.publishedAt)}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
