// stripe-create-products.js
// Usage: node stripe-create-products.js
// Requires: npm install stripe
// Set STRIPE_SECRET_KEY in your environment

const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const INPUT_JSON = path.join(__dirname, 'public/cello-sheet-music/sheet-music-skus.json');
const OUTPUT_JSON = path.join(__dirname, 'public/cello-sheet-music/sheet-music-skus.stripe.json');

async function main() {
  const raw = fs.readFileSync(INPUT_JSON, 'utf8');
  const sheet = JSON.parse(raw);
  const headers = sheet.headers;
  const data = sheet.data;
  const priceIdIdx = headers.indexOf('stripePriceId');
  if (priceIdIdx === -1) headers.push('stripePriceId');

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const [sku, title, description, price, type, image] = row;
    // Only create if not already present
    let stripePriceId = row[headers.length - 1];
    if (stripePriceId && stripePriceId.startsWith('price_')) continue;
    // Create product
    const product = await stripe.products.create({
      name: title,
      description: description || undefined,
      images: [],
      metadata: { sku, type, image },
    });
    // Create price (USD, one-time)
    const stripePrice = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(parseFloat(price) * 100),
      currency: 'usd',
    });
    // Update row
    if (priceIdIdx === -1) {
      row.push(stripePrice.id);
    } else {
      row[headers.length - 1] = stripePrice.id;
    }
    console.log(`Created: ${title} -> ${stripePrice.id}`);
  }
  // Write new JSON
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ headers, data }, null, 2));
  console.log(`\nDone! Updated file: ${OUTPUT_JSON}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 