import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <section className='container mx-auto max-w-5xl px-6'>
      <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2'>
        {projects.map(project => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className='group overflow-hidden rounded-lg border border-gray-200 bg-background shadow-lg transition-all hover:scale-105 hover:shadow-xl'
          >
            {project.image && (
              <div className='relative h-48 w-full'>
                <Image
                  src={project.image}
                  alt={project.title || 'Project Image'}
                  layout='fill'
                  objectFit='cover'
                  className='transition-transform duration-300 group-hover:scale-105'
                />
              </div>
            )}

            <div className='p-5'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                {project.title}
              </h3>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                {project.summary}
              </p>
              <p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
                {formatDate(project.publishedAt ?? '')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
