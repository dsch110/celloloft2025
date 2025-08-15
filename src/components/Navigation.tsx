'use client';

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/app/cello-sheet-music/CartContext';
import { UserButton, useAuth } from '@clerk/nextjs';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, openCart } = useCart();
  const { isSignedIn } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-neutral-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Logo and main links */}
            <div className="flex items-center gap-8">
              <Link 
                href="/" 
                className="text-white font-bold text-lg tracking-wider"
              >
                CELLO LOFT
              </Link>
              <div className="flex items-center gap-8">
                <Link 
                  href="/cello-courses" 
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Courses
                </Link>
                <Link 
                  href="/cello-teachers" 
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Teachers
                </Link>
                <Link 
                  href="/cello-sheet-music" 
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Sheet Music
                </Link>
              </div>
            </div>

            {/* Right side - Cart and Login */}
            <div className="flex items-center gap-4">
              {/* Only show cart on sheet music pages */}
              {pathname.includes('/cello-sheet-music') && (
                <button 
                  onClick={openCart}
                  className="relative text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.5 19h9a2 2 0 0 0 1.85-1.3L21 13M7 13V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v7" 
                    />
                  </svg>
                  {cart?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              )}
              {isSignedIn ? (
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                      userButtonPopoverCard: "bg-neutral-800 border border-neutral-700",
                      userButtonPopoverText: "text-white",
                      userButtonPopoverActionButton: "text-neutral-300 hover:text-white hover:bg-neutral-700",
                    }
                  }}
                />
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push('/login')}
                    className="text-neutral-400 hover:text-white px-4 py-2 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => router.push('/signup')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 