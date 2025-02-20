import Hero from '@/components/hero'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default async function Home() {
  return (
    <section className='py-6'>
      <div className='flex flex-col items-center'>
        <Hero />
        <RecentPosts />
        <RecentProjects />
      </div>
    </section>
  )
}
