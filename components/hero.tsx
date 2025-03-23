import Image from 'next/image'
import Link from 'next/link'
export default function Hero() {
  return (
    <main className='mt-16 flex max-h-screen items-center justify-center bg-background px-6'>
      <div className='container mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row'>
        <div className='flex flex-1 flex-col items-center space-y-6 text-center md:items-start md:text-left'>
          <h1 className='text-3xl font-bold leading-tight tracking-tight sm:text-4xl'>
            Hi, 👋 <br /> I'm Sumit Kamble
          </h1>
          <p className='max-w-lg text-lg text-muted-foreground'>
            A software engineer crafting scalable and efficient web
            applications.
          </p>

          <div className='flex flex-wrap justify-center gap-4 md:justify-start'>
            <Link
              href='/projects'
              className='rounded-lg bg-primary px-6 py-2 text-white transition hover:bg-primary/80 dark:text-black'
            >
              View Projects
            </Link>
            <Link
              href='/contact'
              className='rounded-lg border border-muted px-6 py-2 transition hover:bg-muted/20'
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className='relative'>
          <Image
            src='/profile.jpeg'
            alt='Sumit Kamble'
            width={200}
            height={200}
            className='flex-1 rounded-lg grayscale'
            priority
          />
        </div>
      </div>
    </main>
  )
}
