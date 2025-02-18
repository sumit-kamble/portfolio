'use client'

import { PostMetadata } from '@/lib/posts'
import { useState } from 'react'
import Posts from './posts'
import { XIcon } from 'lucide-react'

export default function PostsWithSearch({ posts }: { posts: PostMetadata[] }) {
  const [query, setQuery] = useState('')

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(query.toLowerCase())
  )

  const isFiltered = query.length > 0

  function resetFilter() {
    setQuery('')
  }

  return (
    <div className='mx-auto max-w-3xl'>
      <div className='relative mb-6 flex items-center'>
        <input
          type='text'
          placeholder='Search posts...'
          className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {isFiltered && (
          <button
            onClick={resetFilter}
            className='absolute right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          >
            <XIcon className='h-4 w-4' />
          </button>
        )}
      </div>

      <Posts posts={filteredPosts} />

      {isFiltered && filteredPosts.length === 0 && (
        <p className='mt-4 text-center text-gray-500 dark:text-gray-400'>
          No posts found.
        </p>
      )}
    </div>
  )
}
