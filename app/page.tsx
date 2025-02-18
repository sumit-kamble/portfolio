import Hero from '@/components/hero'
import RecentPosts from '@/components/recent-posts'

export default async function Home() {
  return (
    <section className='py-6'>
      <div className='flex flex-col items-center'>
        <Hero />
        <RecentPosts />
      </div>
    </section>
  )
}
