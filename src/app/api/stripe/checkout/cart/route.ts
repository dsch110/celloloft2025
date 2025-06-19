import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Hardcoded shipping price (in cents)
const SHIPPING_AMOUNT = 485;

export async function POST(req: Request) {
  try {
    const { items, successUrl, cancelUrl } = await req.json();
    if (!Array.isArray(items) || !successUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Prepare line items for Stripe
    const line_items = items.map((item: { price: string, quantity: number }) => ({
      price: item.price,
      quantity: item.quantity,
    }));

    // Add shipping if any item is physical
    const hasPhysical = items.some((item: { type: string }) => item.type === 'physical');
    if (hasPhysical) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping & Handling',
          },
          unit_amount: SHIPPING_AMOUNT,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe cart checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 