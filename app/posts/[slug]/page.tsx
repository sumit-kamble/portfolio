import getPostBySlug from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const calculateReadTime = (content: string) => {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

export default async function Post({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // Await params before using

  if (!slug) return notFound()

  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt, tags } = metadata

  const readTime = calculateReadTime(content)

  const encodedTitle = encodeURIComponent(title ?? '')
  const shareUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug}`
  )

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    }
  ]

  return (
    <section className='pb-24 pt-32'>
      <div className='container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        <Link
          href='/posts'
          className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to posts</span>
        </Link>

        {image && (
          <div className='relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-lg sm:h-96'>
            <Image
              src={image}
              alt={title || 'Post image'}
              fill
              className='object-cover'
              priority
            />
          </div>
        )}

        <header className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>{title}</h1>
          <p className='mt-3 text-sm text-gray-500 dark:text-gray-400'>
            {author} • {formatDate(publishedAt ?? '')} • {readTime} min read
          </p>
        </header>

        {Array.isArray(tags)
          ? tags.length > 0 && (
              <div className='mt-4 flex flex-wrap justify-center gap-2'>
                {tags.map(tag => (
                  <span
                    key={tag}
                    className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )
          : tags && (
              <div className='mt-4 flex flex-wrap justify-center gap-2'>
                <span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800'>
                  #{tags}
                </span>
              </div>
            )}

        <article className='prose prose-lg dark:prose-invert mx-auto mt-8 leading-relaxed text-gray-800 dark:text-gray-300'>
          {await MDXRemote({
            source: content,
            components: {
              h1: props => (
                <h1 className='mt-8 text-3xl font-bold' {...props} />
              ),
              h2: props => (
                <h2 className='mt-6 text-2xl font-semibold' {...props} />
              ),
              h3: props => (
                <h3 className='mt-5 text-xl font-medium' {...props} />
              ),
              p: props => <p className='mt-4 text-lg' {...props} />,
              ul: props => (
                <ul
                  className='mt-4 list-inside list-disc space-y-2'
                  {...props}
                />
              ),
              ol: props => (
                <ol
                  className='mt-4 list-inside list-decimal space-y-2'
                  {...props}
                />
              ),
              blockquote: props => (
                <blockquote
                  className='border-l-4 border-gray-500 pl-4 italic text-gray-600 dark:text-gray-400'
                  {...props}
                />
              ),
              code: props => (
                <code
                  className='rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800'
                  {...props}
                />
              ),
              pre: props => (
                <pre
                  className='overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-200'
                  {...props}
                />
              ),
              a: props => (
                <a
                  className='text-blue-600 hover:underline dark:text-blue-400'
                  {...props}
                />
              )
            }
          })}
        </article>

        <div className='mt-12 flex justify-center gap-4'>
          {socialLinks.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-400'
            >
              Share on {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
