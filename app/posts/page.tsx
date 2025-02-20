import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'
import PostsWithSearch from '@/components/posts-with-search'

export default async function PostPage() {
  const posts = await getPosts()

  return (
    <section className='pb-24 pt-24'>
      <div className='container mx-auto max-w-4xl px-6 sm:px-8'>
        <header className='mb-12 text-center'>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
            Blog Posts
          </h2>
          <p className='mt-2 text-center text-gray-600 dark:text-gray-400'>
            Insights, tutorials, and thoughts
          </p>
        </header>

        <div className='mt-8'>
          <PostsWithSearch posts={posts} />
        </div>
      </div>
    </section>
  )
}
