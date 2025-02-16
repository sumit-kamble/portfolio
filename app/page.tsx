import { MDXRemote } from 'next-mdx-remote/rsc'
import Hero from '@/components/hero'

export default async function Home() {
  const content = `
  # This is a markdown heading
  `

  return (
    <section className='py-6'>
      <div className='flex flex-col items-center'>
        <Hero />
        {await MDXRemote({ source: content })}
      </div>
    </section>
  )
}
