// This is the API route for handling newsletter subscriptions.

import { NextResponse } from 'next/server';

// The API key and Group ID will be stored in environment variables
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api/subscribers';

export async function POST(request: Request) {
  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    console.error("MailerLite API Key or Group ID is not configured in .env.local");
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const { email } = await request.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required and must be a string.' }, { status: 400 });
  }

  const data = {
    email: email,
    groups: [MAILERLITE_GROUP_ID],
  };

  try {
    const response = await fetch(MAILERLITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MailerLite API Error:', errorData);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for subscribing!' });

  } catch (error) {
    console.error('Network or other error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 