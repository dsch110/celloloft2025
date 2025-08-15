'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { TeacherDiscount } from './teacher-discount';
import { useCart } from '@/app/cello-sheet-music/CartContext';
import { loadStripe } from '@stripe/stripe-js';

interface Product {
  sku: string;
  title: string;
  description: string;
  price: number;
  type: string;
  image: string;
  composer?: string;
  level?: string;
  video_demo?: string;
  youtube_url?: string;
  stripePriceId: string;
}

interface SheetMusicData {
  headers: string[];
  data: (string | null)[][];
}

const types = [
  { label: 'All', value: 'all' },
  { label: 'Instruction', value: 'instruction' },
  { label: 'Solo', value: 'solo' },
  { label: 'Duet', value: 'duet' },
  { label: 'Ensemble', value: 'ensemble' },
  { label: 'Bundle', value: 'bundle' },
  { label: 'Physical', value: 'physical' },
  { label: 'Digital', value: 'digital' },
];

const levels = [
  { label: 'All Levels', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

const composers = [
  { label: 'All Composers', value: 'all' },
  { label: 'Moore', value: 'Moore' },
  { label: 'Bach', value: 'Bach' },
  { label: 'Popper', value: 'Popper' },
  { label: 'Franchomme', value: 'Franchomme' },
  { label: 'Faure', value: 'Faure' },
  { label: 'Saint-Saens', value: 'Saint-Saens' },
  { label: 'Debussy', value: 'Debussy' },
  { label: 'Bartok', value: 'Bartok' },
  { label: 'System of a Down', value: 'System of a Down' },
];

// Map product SKUs to types for filtering (expand as needed)
const skuTypeMap: Record<string, string> = {
  CELLO1: 'instruction',
  RHYTHM1: 'instruction',
  FRANCHOMME12: 'instruction',
  POPPER40: 'instruction',
  POPPERFRAN: 'bundle',
  FRENCHSHOW: 'ensemble',
  MINUETFS6: 'solo',
  SYRINX: 'solo',
  FISSION: 'solo',
  MANTRAEMOTE: 'solo',
  MANTRAANX: 'solo',
  NINECLOUDS: 'solo',
  SONGWW1: 'solo',
  SOLILOQUY: 'ensemble',
  APRES2C: 'duet',
  ELEGIE2C: 'duet',
  PAPILLON2C: 'duet',
  SICILIENNE2C: 'duet',
  ALLEGRO2C: 'duet',
  SWAN2C: 'duet',
  MIKROKOSMOS: 'ensemble',
  DUOSPRINT: 'ensemble',
  DARKNESS: 'duet',
  ODYSSEY: 'duet',
  RECONCILIATION: 'duet',
  VORTEX: 'duet',
  CIRCLES: 'ensemble',
  FIVESONGS: 'ensemble',
  TWOSONGS: 'ensemble',
};

// Helper to extract YouTube video ID and build embed URL
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  // Handles both youtu.be and youtube.com URLs
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0`;
  }
  return url;
}



export default function CelloSheetMusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800">
      <CelloSheetMusicPageInner />
    </div>
  );
}

function CelloSheetMusicPageInner() {
  const [activeType, setActiveType] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [activeComposer, setActiveComposer] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isTeacherDiscountOpen, setIsTeacherDiscountOpen] = useState(false);
  const [showComposerVideo, setShowComposerVideo] = useState<string | null>(null);
  const [activeComposerVideo, setActiveComposerVideo] = useState<number>(0);
  const [miniPlayerVideoUrl, setMiniPlayerVideoUrl] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart, removeFromCart, clearCart, openCart, closeCart, isCartOpen, updateCartQuantity } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetch('/cello-sheet-music/sheet-music-skus.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: SheetMusicData) => {
        console.log('Loaded data:', data);
        const products = data.data.map(row => {
          const product: any = {};
          data.headers.forEach((header, index) => {
            if (header === 'price') {
              product[header] = parseFloat(row[index] as string);
            } else {
              product[header] = row[index];
            }
          });
          return product as Product;
        });
        console.log('Processed products:', products);
        setProducts(products);
      })
      .catch(error => {
        console.error('Error loading sheet music data:', error);
      });
  }, []);

  // Filter products by type, level, and composer
  const filteredProducts = products.filter(p => {
    const typeMatch = activeType === 'all' || skuTypeMap[p.sku] === activeType || p.type === activeType;
    const levelMatch = activeLevel === 'all' || p.level === activeLevel;
    const composerMatch = activeComposer === 'all' || (p.composer && p.composer.includes(activeComposer));
    return typeMatch && levelMatch && composerMatch;
  });

  // Featured products (bestsellers/bundles)
  const featured = [products.find(p => p.sku === 'CELLO1'), products.find(p => p.sku === 'POPPER40'), products.find(p => p.sku === 'POPPERFRAN')].filter((p): p is Product => p !== undefined);

  // When a composer video is opened, also open the mini player
  useEffect(() => {
    if (showComposerVideo && products.find(p => p.composer === showComposerVideo)) {
      setMiniPlayerVideoUrl(products.find(p => p.composer === showComposerVideo)?.youtube_url || null);
    }
  }, [showComposerVideo]);

  // Checkout handler
  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const items = cart.map(item => ({ price: item.stripePriceId, quantity: item.quantity, type: item.type }));
      const res = await fetch('/api/stripe/checkout/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          successUrl: window.location.origin + '/cello-sheet-music?success=1',
          cancelUrl: window.location.origin + '/cello-sheet-music?canceled=1',
        }),
      });
      const { sessionId } = await res.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
    } catch (e) {
      alert('Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="text-white">
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">Sheet Music</h1>
          <p className="text-xl text-neutral-300">
            Original compositions and arrangements for cello
          </p>
        </div>

        {/* Hero section */}
        <div className="w-full max-w-4xl mx-auto mt-12 mb-8 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Cello Loft Sheet Music</h1>
          <p className="text-lg md:text-2xl text-neutral-200 mb-6">Shop unique method books, original works, and advanced arrangements for every level.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {featured.map((p) => (
              <div key={p.sku} className="bg-white/10 rounded-xl p-4 flex flex-col items-center shadow w-48 mx-2">
                <div className="w-32 h-44 bg-neutral-700 rounded-lg mb-2 flex items-center justify-center text-neutral-400">Image</div>
                <h3 className="text-lg font-semibold text-white mb-1 text-center">{p.title}</h3>
                <span className="text-green-400 font-bold text-base mb-2">${p.price.toFixed(2)}</span>
                <div className="flex gap-2 w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1 rounded-lg shadow transition flex-1 text-sm" onClick={() => addToCart({ sku: p.sku, title: p.title, price: p.price, quantity: 1, stripePriceId: p.stripePriceId, type: p.type })}>Buy Now</button>
                  {p.youtube_url && (
                    <button 
                      onClick={() => p.youtube_url && setSelectedVideo(p.youtube_url)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-lg shadow transition text-sm"
                    >
                      Preview
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Teacher Discount Banner BELOW featured products */}
          <div className="flex justify-center mt-8">
            <button
              className="bg-yellow-400/20 text-yellow-700 px-6 py-2 rounded-full font-semibold text-sm shadow hover:bg-yellow-300/40 transition border-2 border-yellow-300"
              onClick={() => setIsTeacherDiscountOpen(true)}
              style={{ outline: 'none' }}
            >
              teachers: subscribe for 10% off!
            </button>
          </div>
        </div>

        {/* Main Content: Sidebar + Product Grid */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          {/* Sidebar Filters */}
          <aside className="md:w-64 w-full md:sticky md:top-8 mb-8 md:mb-0 bg-white/5 rounded-xl p-4 h-fit">
            <h2 className="text-lg font-bold mb-4 text-white">Filter By</h2>
            {/* Type Filter */}
            <details open className="mb-4">
              <summary className="cursor-pointer font-semibold text-blue-400 mb-2">Type</summary>
              <div className="flex flex-col gap-2 mt-2">
                {types.map(t => (
                  <button
                    key={t.value}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition border text-left ${activeType === t.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white/10 text-neutral-200 border-white/10 hover:bg-blue-600/30'}`}
                    onClick={() => setActiveType(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </details>
            {/* Level Filter */}
            <details open className="mb-4">
              <summary className="cursor-pointer font-semibold text-purple-400 mb-2">Level</summary>
              <div className="flex flex-col gap-2 mt-2">
                {levels.map(l => (
                  <button
                    key={l.value}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition border text-left ${activeLevel === l.value ? 'bg-purple-500 text-white border-purple-500' : 'bg-white/10 text-neutral-200 border-white/10 hover:bg-purple-600/30'}`}
                    onClick={() => setActiveLevel(l.value)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </details>
            {/* Composer Filter */}
            <details open>
              <summary className="cursor-pointer font-semibold text-green-400 mb-2">Composer</summary>
              <div className="flex flex-col gap-2 mt-2">
                {composers.map(c => (
                  <button
                    key={c.value}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition border text-left ${activeComposer === c.value ? 'bg-green-500 text-white border-green-500' : 'bg-white/10 text-neutral-200 border-white/10 hover:bg-green-600/30'}`}
                    onClick={() => setActiveComposer(c.value)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </details>
            {/* Clear All Button */}
            <button
              className="mt-6 w-full bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-2 rounded-lg transition"
              onClick={() => { setActiveType('all'); setActiveLevel('all'); setActiveComposer('all'); }}
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map(p => (
                <div key={p.sku} className={`bg-white/10 rounded-xl p-6 flex flex-col items-center shadow relative ${p.type === 'bundle' ? 'border-2 border-yellow-400' : ''}`}>
                  {p.type === 'bundle' && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">Bundle Deal</span>
                  )}
                  <div className="w-40 h-56 bg-neutral-700 rounded-lg mb-4 flex items-center justify-center text-neutral-400">Image</div>
                  <h3 className="text-xl font-bold text-white mb-1 text-center">{p.title}</h3>
                  {p.composer && (
                    <div className="mb-2 flex flex-col items-center">
                      <span className="text-lg font-bold text-green-300 mb-1">{p.composer}</span>
                      {p.youtube_url && (
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => setMiniPlayerVideoUrl(p.youtube_url!)}
                          title={`Watch ${p.composer} video`}
                        >
                          Watch Video
                        </button>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 mb-2">
                    {p.level && <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">{p.level}</span>}
                  </div>
                  <p className="text-neutral-300 mb-2 text-center text-sm">{p.description}</p>
                  <span className="text-green-400 font-bold text-lg mb-4">${p.price.toFixed(2)}</span>
                  <div className="flex gap-2 w-full">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition flex-1" onClick={() => addToCart({ sku: p.sku, title: p.title, price: p.price, quantity: 1, stripePriceId: p.stripePriceId, type: p.type })}>Add to Cart</button>
                    {p.youtube_url && (
                      <button 
                        onClick={() => p.youtube_url && setSelectedVideo(p.youtube_url)}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                      >
                        Preview
                      </button>
                    )}
                  </div>
                  {p.type === 'physical' && (
                    <span className="mt-2 text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">Teacher Discount Available</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Preview Modal */}
        <Dialog
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
            <div className="relative bg-neutral-900 rounded-xl p-4 max-w-3xl w-full mx-4">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 text-white hover:text-neutral-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedVideo && (
                <div className="aspect-video w-full">
                  <iframe
                    src={selectedVideo.replace('watch?v=', 'embed/')}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </Dialog>

        {/* Testimonials/Trust Section */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">What Musicians Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
              <p className="text-lg text-neutral-100 mb-4">"The Cellosophy books are the best investment I've made in my cello journey."</p>
              <span className="text-neutral-400 text-sm">— Alex, Adult Learner</span>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
              <p className="text-lg text-neutral-100 mb-4">"I love the variety and quality of the digital downloads. Highly recommended!"</p>
              <span className="text-neutral-400 text-sm">— Jamie, Conservatory Student</span>
            </div>
          </div>
        </div>

        {/* FAQ/Support Section */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">FAQ & Support</h2>
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-white mb-1">How do I receive my download?</h4>
              <p className="text-neutral-300 text-sm">Digital products are delivered instantly via email after purchase.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">How fast is shipping?</h4>
              <p className="text-neutral-300 text-sm">Physical books ship within 2 business days via USPS.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-neutral-900/90 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <Link href="/" className="text-white font-bold text-lg tracking-widest">Cello Loft</Link>
            <Link href="/cello-course-overview/cellosophy-cello-method" className="text-neutral-300 hover:text-white transition">Courses</Link>
            <Link href="/cello-sheet-music" className="text-neutral-300 hover:text-white transition">Sheet Music</Link>
            <Link href="/about" className="text-neutral-300 hover:text-white transition">About</Link>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 3.5zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg></a>
            <a href="https://youtube.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001s-.2-1.4-.8-2.001c-.7-.8-1.5-.8-1.9-.9C16.1 5 12 5 12 5h-.1s-4.1 0-7.1.1c-.4.1-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9c1.5.1 6.9.1 6.9.1s4.1 0 7.1-.1c.4-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 15.2V8.8l6.4 3.2l-6.4 3.2z"/></svg></a>
          </div>
          <div className="text-neutral-500 text-xs mt-4 md:mt-0">© {new Date().getFullYear()} Cello Loft. All rights reserved.</div>
        </div>
      </footer>
      <TeacherDiscount isOpen={isTeacherDiscountOpen} onClose={() => setIsTeacherDiscountOpen(false)} />

      {/* Mini Video Player (Floating) */}
      {miniPlayerVideoUrl && (
        <div className="fixed bottom-4 right-4 z-50 bg-neutral-900 rounded-lg shadow-lg w-80 max-w-full border-2 border-green-500 flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-green-700 rounded-t-lg">
            <span className="text-white font-semibold text-sm">Now Playing</span>
            <button
              className="text-white hover:text-green-200 ml-2"
              onClick={() => setMiniPlayerVideoUrl(null)}
              aria-label="Close video player"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={getYouTubeEmbedUrl(miniPlayerVideoUrl)}
              className="w-full h-full rounded-b-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Mini Player Video"
            />
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <Dialog open={isCartOpen} onClose={closeCart} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
            <div className="relative bg-neutral-900 rounded-xl p-6 max-w-md w-full mx-4">
              <button onClick={closeCart} className="absolute top-2 right-2 text-white hover:text-neutral-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4 text-white">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-neutral-300">Your cart is empty.</p>
              ) : (
                <ul className="mb-4 divide-y divide-neutral-700">
                  {cart.map(item => (
                    <li key={item.sku} className="flex items-center justify-between py-4 gap-2 border-b border-neutral-700 last:border-b-0">
                      <span className="flex-1 text-white font-medium">{item.title}</span>
                      <span className="w-24 text-green-400 font-bold text-right">${item.price.toFixed(2)}</span>
                      <div className="flex items-center gap-2 mx-2">
                        <button onClick={() => updateCartQuantity(item.sku, Math.max(1, item.quantity - 1))} className="w-7 h-7 rounded bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-neutral-700">-</button>
                        <input type="number" min={1} value={item.quantity} onChange={e => updateCartQuantity(item.sku, Math.max(1, parseInt(e.target.value)||1))} className="w-10 text-center rounded bg-neutral-800 text-white border border-neutral-700" />
                        <button onClick={() => updateCartQuantity(item.sku, item.quantity + 1)} className="w-7 h-7 rounded bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-neutral-700">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.sku)} className="ml-2 text-red-400 hover:text-red-600 font-medium">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-white">Total:</span>
                <span className="text-green-400 text-lg font-bold">${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</span>
              </div>
              <button
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                disabled={cart.length === 0 || checkoutLoading}
                onClick={handleCheckout}
              >
                {checkoutLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
} 