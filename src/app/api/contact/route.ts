import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: In production, you would send this email or save to database
    // For now, just log it and return success
    console.log('Contact form submission:', { name, email, message });

    // Simulate sending email (in production, use Nodemailer, SendGrid, etc.)
    // await sendEmail({
    //   to: 'lunanovabookkeeping@gmail.com',
    //   from: email,
    //   subject: `New message from ${name}`,
    //   text: message,
    // });

    return NextResponse.json(
      { message: 'Message received! We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
