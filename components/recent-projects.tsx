import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { JSX } from 'react'
import { getProjects } from '@/lib/projects'
import Image from 'next/image'

export default async function RecentProjects(): Promise<JSX.Element> {
  const projects = await getProjects(3)

  return (
    <section className='mt-12'>
      <div className='container mx-auto max-w-6xl px-6'>
        <h4 className='text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
          Recent Projects
        </h4>
        <p className='mt-2 text-left text-gray-600 dark:text-gray-400'>
          Currently working on or completed projects.
        </p>

        <div className='mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map(project => (
            <div
              key={project.slug}
              className='group relative overflow-hidden rounded-lg border border-gray-200 bg-background shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-gray-700'
            >
              {/* Project Image */}
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className='h-34 w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
              )}

              <div className='p-3'>
                {/* Title */}
                <Link href={`/projects/${project.slug}`} className='block'>
                  <h5 className='text font-semibold text-gray-900 group-hover:underline dark:text-gray-100'>
                    {project.title}
                  </h5>
                </Link>

                {/* Project details */}
                {/* <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  {project.summary}
                </p> */}

                {/* Tech stack */}
                {/* {project.techStack && (
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className='inline-block rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )} */}

                {/* Meta info */}
                <div className='mt-2 text-xs text-gray-500'>
                  {project.publishedAt && (
                    <p>{formatDate(project.publishedAt)}</p>
                  )}
                  {/* {project.status && (
                    <p>
                      Status:{' '}
                      <span className='font-semibold'>{project.status}</span>
                    </p>
                  )} */}
                  {/* {project.duration && <p>Duration: {project.duration}</p>} */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 text-center'>
          <Link
            href='/projects'
            className='inline-block rounded-lg bg-gray-900 px-6 py-2 text-white transition-all hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300'
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
