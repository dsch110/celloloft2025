'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import NewsletterForm from '@/components/NewsletterForm'

export default function TeachersPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-neutral-100 overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] grid-rows-[repeat(auto-fill,minmax(50px,1fr))]">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="border-[0.5px] border-white/5"
            />
          ))}
        </div>
      </div>

      <div className="relative px-8 pt-24 max-w-6xl mx-auto">
        <Navigation />

        {/* === HERO SECTION === */}
        <div className="text-center my-24 md:my-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4"
          >
            The Cello Method Your Students Will Actually Love.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 mb-8"
          >
            Stop wasting hours searching for quality repertoire. Cellosophy provides a comprehensive, standards-based curriculum that guides students from their first notes to advanced concertos, so you can focus on what you do best: teaching.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/cello-course-overview/cellosophy-cello-method">
              <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore The Curriculum
              </span>
            </Link>
          </motion.div>
        </div>

        {/* === BENEFITS SECTION (The Boxes) === */}
        <div className="grid md:grid-cols-3 gap-8 my-24">
          {/* Box 1: For Teachers */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50">
            <h3 className="text-xl font-bold mb-2 text-blue-400">For Cello Teachers</h3>
            <p className="text-neutral-400">
              Get access to a full curriculum, teacher-specific resources, and a dashboard to track all of your students' progress. Simplify your studio management and lesson planning.
            </p>
          </div>

          {/* Box 2: The Curriculum */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50">
            <h3 className="text-xl font-bold mb-2 text-blue-400">A Living Method</h3>
            <p className="text-neutral-400">
              Nine volumes of carefully curated repertoire, etudes, and excerpts. From the Renaissance to contemporary and popular styles, keep your students engaged and inspired.
            </p>
          </div>

          {/* Box 3: For Advanced Students */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Challenge Your Top Players</h3>
            <p className="text-neutral-400">
              The Proper Popper Practice Project (PPPP) provides an advanced track for your most ambitious students, preparing them for conservatory-level studies and competitions.
            </p>
          </div>
        </div>

        {/* === FINAL CTA === */}
        <div className="text-center my-24">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Join the community of teachers using Cellosophy to build the next generation of great cellists.
          </p>
          <Link href="/signup">
            <span className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Free 1-Month Teacher Trial
            </span>
          </Link>
        </div>

        <NewsletterForm note="Eric - you need to customize the .env.local so the MiailerLite GroupID reflects the correct subscriber sequence." />
      </div>
    </div>
  )
} 