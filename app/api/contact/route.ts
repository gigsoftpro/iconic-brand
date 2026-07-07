import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// contact form API route
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message, city, state, source, annualRevenue, marketingBudget } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Create the email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Service Interest: ${service || 'Not specified'}
Annual Revenue: ${annualRevenue || 'Not specified'}
Marketing Budget: ${marketingBudget || 'Not specified'}

${city ? `Location: ${city}, ${state || ''}\n` : ''}
${source ? `Source: ${source}\n` : ''}

Message:
${message || 'No message provided'}

---
This inquiry was submitted from the Iconic Brand Group website.
    `.trim()

    // Send data to LeadConnector webhook
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/y0EPAykadmxG8MsoVDu8/webhook-trigger/EsE879ZlFBFUO1b8rbbx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, service, message, city, state, source, annualRevenue, marketingBudget, form_type: 'contact' }),
      })
    } catch (webhookError) {
      console.error('Webhook error:', webhookError)
    }

    // Send email using Resend
    const fromAddress = 'Iconic Brand Group <noreply@iconicbrandgroup.com>'
    const data = await resend.emails.send({
      from: fromAddress,
      to: ['grow@iconicbrandgroup.com'],
      replyTo: email,
      subject: `New Contact Form Submission${city ? ` from ${city}` : ''}`,
      text: emailContent,
    })

    // Also send a confirmation email to the customer
    await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: 'Thank you for contacting Iconic Brand Group',
      text: `Hi ${name},

Thank you for reaching out to Iconic Brand Group! We've received your message and will get back to you within 24 hours.

${city ? `We're excited to help grow your ${city} business.\n\n` : ''}In the meantime, feel free to explore our services at https://www.iconicbrandgroup.com

Best regards,
The Iconic Brand Group Team`,
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        data 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
