import sgMail from '@sendgrid/mail'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.SENDGRID_API_KEY
  const toast = useToast()

  if (!apiKey || !apiKey.startsWith('SG.')) {
    toast.error('Email service not properly configured')
    console.error('Invalid or missing SendGrid API key')
    throw createError({
      statusCode: 500,
      message: 'Email service not properly configured.'
    })
  }

  sgMail.setApiKey(apiKey)

  const body = await readBody(event)
  const { name, email, message } = body

  const msg = {
    to: 'streams@dbconvert.com',
    // from: 'noreply@dbconvert.com', // Make sure this email is verified in SendGrid
    from: 'streams@dbconvert.com', // Make sure this email is verified in SendGrid
    replyTo: email,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  }

  try {
    await sgMail.send(msg)
    return { status: 'success', message: 'Thank you! Your message has been sent.' }
  } catch (error) {
    toast.error('Failed to send the message')
    console.error('SendGrid error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send email. Please try again later.'
    })
  }
}) 