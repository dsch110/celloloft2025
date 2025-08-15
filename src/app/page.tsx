'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import NewsletterForm from '@/components/NewsletterForm'

export default function Home() {
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

      <div className="relative px-8 pt-12 max-w-6xl mx-auto">
        <Navigation />

        {/* === HERO SECTION === */}
        <div className="text-center my-12 md:my-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4"
          >
            A Modern Path to Cello Mastery.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 mb-8"
          >
            Whether you're a dedicated student, a passionate teacher, or an advanced player, the Cello Loft provides the resources, curriculum, and community to elevate your art.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/cello-courses">
              <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore All Courses
              </span>
            </Link>
          </motion.div>
        </div>

        {/* === WHO IS THIS FOR? (The Boxes) === */}
        <div className="grid md:grid-cols-3 gap-8 my-16">
          {/* Box 1: For Students */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-blue-400">For Students & Parents</h3>
            <p className="text-neutral-400 mb-4 flex-grow">
              Follow a step-by-step method that makes learning logical, engaging, and fun. Master new pieces and techniques with a clear path to success.
            </p>
            <Link href="/signup">
                <span className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                    Start a Free Trial →
                </span>
            </Link>
          </div>

          {/* Box 2: For Teachers */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-blue-400">For Cello Teachers</h3>
            <p className="text-neutral-400 mb-4 flex-grow">
              Access a comprehensive curriculum and powerful tools to manage your studio, track student progress, and save hours of lesson planning.
            </p>
            <Link href="/cello-teachers">
                <span className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                    Explore Teacher Resources →
                </span>
            </Link>
          </div>

          {/* Box 3: For Advanced Players */}
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-blue-400">For Advanced Players</h3>
            <p className="text-neutral-400 mb-4 flex-grow">
              Tackle conservatory-level challenges with in-depth projects like the Proper Popper Practice Project, designed to refine your technique and artistry.
            </p>
            <Link href="/cello-course-overview/proper-popper-practice-project">
                <span className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                    Dive into Advanced Projects →
                </span>
            </Link>
          </div>
        </div>

        {/* === NEWSLETTER SIGNUP === */}
        <NewsletterForm />

      </div>
    </div>
  )
} 