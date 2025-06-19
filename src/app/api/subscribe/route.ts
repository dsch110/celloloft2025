import { NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID!;

function generateDiscountCode() {
  return `TEACHER${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate a unique discount code
    const discountCode = generateDiscountCode();

    // Add subscriber to MailerLite
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email,
        fields: {
          discount_code: discountCode,
        },
        groups: [MAILERLITE_GROUP_ID],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe to MailerLite');
    }

    // Send welcome email with discount code
    await fetch('https://api.mailerlite.com/api/v2/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        type: 'regular',
        subject: 'Welcome to Cello Loft - Your Teacher Discount Code',
        from: 'Cello Loft <teachers@celloloft.com>',
        from_name: 'Cello Loft',
        groups: [MAILERLITE_GROUP_ID],
        content: {
          html: `
            <h1>Welcome to Cello Loft!</h1>
            <p>Thank you for signing up for our teacher discount program.</p>
            <p>Your discount code is: <strong>${discountCode}</strong></p>
            <p>This code gives you 10% off all sheet music purchases.</p>
            <p>Happy teaching!</p>
          `,
        },
      }),
    });

    return NextResponse.json({
      success: true,
      message: 'Please check your email to get your discount code.',
    });
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 