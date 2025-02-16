'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './theme-toggle'
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/80 shadow-sm backdrop-blur-md'>
      <nav className='container mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <div>
          <Link
            href='/'
            className='text-3xl font-semibold tracking-tight transition-opacity hover:opacity-60'
          >
            Sumit Kamble
          </Link>
        </div>

        <ul className='hidden max-w-lg items-center gap-6 text-lg font-medium text-muted-foreground md:flex'>
          {['Posts', 'Projects', 'Contact'].map(item => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className='transition-colors hover:text-foreground'
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className='text-muted-foreground md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className='hidden md:block'>
          <ThemeToggle />
        </div>
      </nav>

      {isOpen && (
        <div className='absolute inset-x-0 top-16 bg-background/90 shadow-md backdrop-blur-lg md:hidden'>
          <ul className='flex flex-col items-center gap-4 py-4 text-lg font-medium text-muted-foreground'>
            {['Posts', 'Projects', 'Contact'].map(item => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className='block px-6 py-2 transition-colors hover:text-foreground'
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
