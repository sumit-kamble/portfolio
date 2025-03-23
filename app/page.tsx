import Hero from '@/components/hero'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default async function Home() {
  return (
    <section className='py-6'>
      <div className='flex flex-col items-center'>
        <Hero />
        <div className='mt-6 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='md:col-span-1'>
            <RecentPosts />
          </div>

          <div className='md:col-span-2'>
            <RecentProjects />
          </div>
        </div>
      </div>
    </section>
  )
}
