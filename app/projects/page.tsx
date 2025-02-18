import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects-component'

export default async function ProjectPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-24'>
      <div className='container mx-auto max-w-4xl px-6 sm:px-8'>
        <header className='mb-12 text-center'>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
            Projects
          </h2>
          <p className='mt-2 text-center text-gray-600 dark:text-gray-400'>
            A collection of my recent work.
          </p>
        </header>
        <div className='mt-8'>
          <Projects projects={projects} />
        </div>
      </div>
    </section>
  )
}
