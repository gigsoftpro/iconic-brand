import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      full_name,
      email,
      phone,
      location,
      role_interest,
      q1_what_we_do,
      q2_services,
      q3_ideal_client,
      why_iconic,
      availability,
    } = body

    // Validate required fields
    if (!full_name || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      )
    }

    const servicesText = Array.isArray(q2_services) && q2_services.length > 0
      ? q2_services.join(', ')
      : 'Not specified'

    // Internal notification email
    const emailContent = `
New Career Application Submission
===================================

Applicant Details:
------------------
Name:         ${full_name}
Email:        ${email}
Phone:        ${phone || 'Not provided'}
Location:     ${location || 'Not provided'}
Role Interest: ${role_interest || 'Not specified'}
Availability: ${availability || 'Not specified'}

Qualifying Questions:
---------------------
Q1 - What does Iconic Brand Group do?
${q1_what_we_do || 'No answer provided'}

Q2 - Services offered:
${servicesText}

Q3 - Ideal client description:
${q3_ideal_client || 'No answer provided'}

Why Iconic Brand Group?
${why_iconic || 'No answer provided'}

---
This application was submitted from the Iconic Brand Group Careers page.
    `.trim()

    // Send data to LeadConnector webhook
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/y0EPAykadmxG8MsoVDu8/webhook-trigger/EsE879ZlFBFUO1b8rbbx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: full_name, email, phone, location, role_interest, q1_what_we_do, q2_services: servicesText, q3_ideal_client, why_iconic, availability, form_type: 'careers' }),
      })
    } catch (webhookError) {
      console.error('Webhook error:', webhookError)
    }

    // Send internal notification
    const fromAddress = 'Iconic Brand Group <noreply@iconicbrandgroup.com>'
    const data = await resend.emails.send({
      from: fromAddress,
      to: ['grow@iconicbrandgroup.com'],
      replyTo: email,
      subject: `New Career Application: ${full_name} — ${role_interest || 'General Interest'}`,
      text: emailContent,
    })

    // Send confirmation email to applicant
    await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: 'Your Application to Iconic Brand Group — Received!',
      text: `Hi ${full_name},

Thank you for applying to join the Iconic Brand Group team! We've received your application and will review it carefully.

If your background aligns with what we're looking for, a member of our team will reach out within 3–5 business days.

In the meantime, feel free to learn more about us at https://www.iconicbrandgroup.com

Best regards,
The Iconic Brand Group Team`,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Careers form error:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit application. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

