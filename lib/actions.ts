'use server'

import { ContactFormSchema } from './schema'
import { z } from 'zod'
import { Resend } from 'resend'
import ContactFormEmail from '@/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)
const submissionMail = process.env.SUBMISSION_MAIL as string

type ContactFormInputs = z.infer<typeof ContactFormSchema>

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return {
      error: result.error.format()
    }
  }

  try {
    const { name, email, message } = result.data

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [submissionMail],
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: Promise.resolve(ContactFormEmail({ name, email, message }))
    })

    if (error) {
      console.log('Resend error:', error)
      throw new Error(`ailed to send email: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error: 'Failed to send email' }
  }
}
