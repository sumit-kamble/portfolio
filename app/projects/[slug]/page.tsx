import { getProjectBySlug, getProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))

  return slugs
}

export default async function Project({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) return notFound()

  const project = await getProjectBySlug(slug)
  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
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
            {author} • {formatDate(publishedAt ?? '')}
          </p>
        </header>

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
      </div>
    </section>
  )
}
