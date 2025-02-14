import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/theme-toggle'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex min-h-screen items-center justify-center bg-background px-6'>
        <div className='container mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row'>
          <div className='flex flex-1 flex-col items-center space-y-6 text-center md:items-start md:text-left'>
            <h1 className='text-4xl font-bold leading-tight tracking-tight sm:text-5xl'>
              Hi, 👋 <br /> I'm Sumit Kamble
            </h1>
            <p className='max-w-lg text-lg text-muted-foreground'>
              A passionate software engineer crafting scalable and efficient web
              applications.
            </p>

            <div className='flex flex-wrap justify-center gap-4 md:justify-start'>
              <a
                href='/projects'
                className='rounded-lg bg-primary px-6 py-2 text-white transition hover:bg-primary/80 dark:text-black'
              >
                View Projects
              </a>
              <a
                href='/contact'
                className='rounded-lg border border-muted px-6 py-2 transition hover:bg-muted/20'
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className='md:justify-right mt-6 flex flex-1 justify-center'>
            <Image
              src='/profile.jpeg'
              alt='Sumit Kamble'
              width={150}
              height={150}
              className='h-80 w-80 rounded-full border border-muted object-cover shadow-lg'
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
