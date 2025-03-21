'use client'

import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema } from '@/lib/schema'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { sendEmail } from '@/lib/actions'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }
    toast.success('Message sent successfully!')
    reset()
  }

  return (
    <section className='bg-background'>
      <div className='container mx-auto max-w-2xl px-6 lg:px-8'>
        <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Get in Touch
        </h2>
        <p className='mt-3 text-center text-gray-600 dark:text-gray-400'>
          Have a project in mind? Let's connect and discuss how I can help.
        </p>

        <form
          onSubmit={handleSubmit(processForm)}
          className='mt-8 space-y-6 rounded-lg bg-background p-6 shadow-lg'
          noValidate
        >
          <div>
            <label
              htmlFor='name'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Name
            </label>
            <Input
              id='name'
              type='text'
              placeholder='John Doe'
              autoComplete='given-name'
              {...register('name')}
              className='mt-2 w-full'
            />
            {errors.name?.message && (
              <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='email'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Email
            </label>
            <Input
              type='email'
              id='email'
              autoComplete='email'
              placeholder='your@email.com'
              {...register('email')}
              className='mt-2 w-full'
            />
            {errors.email?.message && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='message'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Message
            </label>
            <Textarea
              rows={4}
              placeholder='Write your message here...'
              {...register('message')}
              className='mt-2 w-full'
            />
            {errors.message?.message && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.message.message}
              </p>
            )}
          </div>

          <div className='flex justify-center'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full sm:w-auto'
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </div>

          <p className='mt-4 text-center text-xs text-gray-500'>
            By submitting this form, you agree to the{' '}
            <Link
              href='/privacy'
              className='text-blue-600 hover:underline dark:text-blue-400'
            >
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  )
}
