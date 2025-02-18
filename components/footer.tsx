import { SVGProps } from 'react'
const navigation = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sumitkamble7',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        fill='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
      >
        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.268h-3v-5.632c0-1.347-.026-3.078-1.877-3.078-1.879 0-2.167 1.466-2.167 2.984v5.726h-3v-10h2.88v1.364h.041c.401-.758 1.38-1.557 2.842-1.557 3.042 0 3.604 2.002 3.604 4.604v5.589z' />
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/sumit-kamble',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        fill='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
      >
        <path d='M12 2c-5.523 0-10 4.477-10 10 0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.482 0-.237-.008-.868-.013-1.704-2.782.603-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.031 1.53 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.097-2.646 0 0 .84-.269 2.75 1.025a9.563 9.563 0 012.5-.337c.849.004 1.704.115 2.5.337 1.91-1.294 2.75-1.025 2.75-1.025.543 1.376.2 2.393.097 2.646.64.698 1.029 1.591 1.029 2.682 0 3.842-2.338 4.687-4.565 4.937.359.309.678.92.678 1.852 0 1.337-.012 2.415-.012 2.742 0 .267.181.577.688.479 3.977-1.322 6.838-5.071 6.838-9.489 0-5.523-4.477-10-10-10z' />
      </svg>
    )
  }
]

export default function Footer() {
  return (
    <footer className='w-full border-t bg-background py-6'>
      <div className='container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row'>
        <p className='text-sm text-muted-foreground'>
          © {new Date().getFullYear()} Sumit Kamble.
        </p>
        <ul className='flex gap-4'>
          {navigation.map(item => (
            <li key={item.name}>
              <a
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                <item.icon className='h-5 w-5' />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
