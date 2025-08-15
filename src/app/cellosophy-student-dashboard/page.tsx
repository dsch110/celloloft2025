'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { BsPlayCircle, BsCheckCircleFill } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { IoTrophyOutline } from 'react-icons/io5'
import ProgressCircle from '@/components/ProgressCircle'
import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'

interface Piece {
  composer: string
  title: string
  id: string
  completed?: boolean
  current?: boolean
}

// Composer portrait mapping
const composerPortraits = {
  'Hildegard von Bingen': '/images/composers/hildegard.jpg',
  'Béla Bartók': '/images/composers/bartok.jpg',
  'Felix Mendelssohn': '/images/composers/mendelssohn.jpg',
  'Ludwig van Beethoven': '/images/composers/beethoven.jpg',
  'Erik Satie': '/images/composers/satie.jpg',
  'Modest Mussorgsky': '/images/composers/mussorgsky.jpg',
  'Daniel Pesca': '/images/composers/pesca.jpg',
  'Sergei Rachmaninoff': '/images/composers/rachmaninoff.jpg',
  'Piotr Ilyich Tchaikovsky': '/images/composers/tchaikovsky.jpg',
  'Johannes Brahms': '/images/composers/brahms.jpg',
  'Maurice Ravel': '/images/composers/ravel.jpg',
  'Andrew Lloyd Webber': '/images/composers/webber.jpg',
  'Edgar Meyer': '/images/composers/meyer.jpg',
  'Wolfgang Amadeus Mozart': '/images/composers/mozart.jpg',
  'J.S. Bach': '/images/composers/bach.jpg',
  'Eric Moore': '/images/composers/moore.jpg'
};

export default function StudentDashboard() {
  const [studentName] = useState("Hermione")
  const [teacherName] = useState("Eric Moore")
  const [activeSection, setActiveSection] = useState('overview')
  
  const volumeOnePieces: Piece[] = [
    { composer: "Hildegard von Bingen", title: "Caritas Variations", id: "caritas", completed: true },
    { composer: "Béla Bartók", title: "Two Hungarian Songs", id: "hungarian", completed: true },
    { composer: "Felix Mendelssohn", title: "Song Without Words", id: "mendelssohn", completed: true },
    { composer: "Ludwig van Beethoven", title: "Symphony #9 Variations", id: "beethoven", completed: true },
    { composer: "Erik Satie", title: "Gymnopedies", id: "satie", completed: true },
    { composer: "Modest Mussorgsky", title: "Promenade", id: "mussorgsky", current: true },
    { composer: "Daniel Pesca", title: "Moto Perpetuo #1", id: "pesca" },
    { composer: "Sergei Rachmaninoff", title: "Piano Concerto #2", id: "rachmaninoff" },
    { composer: "Piotr Ilyich Tchaikovsky", title: "Symphony #5", id: "tchaikovsky" },
    { composer: "Johannes Brahms", title: "Symphony #1", id: "brahms" },
    { composer: "Maurice Ravel", title: "Alborada del Gracioso", id: "ravel" },
    { composer: "Andrew Lloyd Webber", title: "Music of the Night", id: "webber" },
    { composer: "Edgar Meyer", title: "Short Trip Home", id: "meyer" },
    { composer: "Wolfgang Amadeus Mozart", title: "Piano Concerto #24", id: "mozart" },
    { composer: "J.S. Bach", title: "Menuet from French Suite #5", id: "bach" },
    { composer: "Eric Moore", title: "Fission", id: "moore" }
  ]

  const completedPieces = volumeOnePieces.filter(piece => piece.completed).length
  const progress = (completedPieces / volumeOnePieces.length) * 100

  const currentPiece = volumeOnePieces.find(piece => piece.current)

  const studioPoliciesUrl = "/studio-policies.pdf"; // mock
  const studioZoomLink = "https://zoom.us/j/1234567890"; // mock
  const nextStudioClass = {
    date: "2024-07-22",
    time: "4:00 PM EST",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] grid-rows-[repeat(auto-fill,minmax(50px,1fr))]">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="border-[0.5px] border-white/5"
              style={{
                transform: `scale(${1 + Math.sin(i * 0.1) * 0.1})`,
                opacity: 0.1 + Math.sin(i * 0.1) * 0.05
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative px-8 pt-24 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-light mb-4">Welcome back, {studentName}! 🎻</h1>
          <p className="text-xl text-neutral-300">
            "Keep bowing forward, and remember: every note is a step closer to cello-brating your success!"
          </p>
          <p className="text-lg text-neutral-400 mt-2">
            Studying with {teacherName}
          </p>
        </motion.div>

        {/* Studio Policies, Upcoming Class, Zoom Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Studio Policies</h2>
            <a href={studioPoliciesUrl} download className="text-blue-400 underline">Download PDF</a>
          </div>
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Upcoming Studio Class</h2>
            <p className="text-lg mb-2">{nextStudioClass.date} at {nextStudioClass.time}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Zoom Link</h2>
            <a href={studioZoomLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Join Class</a>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Progress Overview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 rounded-xl p-6"
          >
            <h2 className="text-2xl font-light mb-4">Volume One Progress</h2>
            <div className="flex justify-center mb-4">
              <ProgressCircle progress={progress} size={120} />
            </div>
            <p className="text-center text-neutral-300">
              {completedPieces} of {volumeOnePieces.length} pieces completed
            </p>
          </motion.div>

          {/* Current Piece */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-xl p-6"
          >
            <h2 className="text-2xl font-light mb-4">Current Piece</h2>
            {currentPiece && (
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Current Piece</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={composerPortraits[currentPiece.composer]}
                        alt={currentPiece.composer}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{currentPiece.title}</p>
                      <p className="text-neutral-400">{currentPiece.composer}</p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition">
                    Practice Now
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Practice Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 rounded-xl p-6"
          >
            <h2 className="text-2xl font-light mb-4">Practice Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiClock className="text-2xl text-blue-400" />
                <div>
                  <p className="text-neutral-400">This Week</p>
                  <p className="text-xl">12.5 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IoTrophyOutline className="text-2xl text-yellow-400" />
                <div>
                  <p className="text-neutral-400">Streak</p>
                  <p className="text-xl">7 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pieces Carousel */}
        <div className="bg-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-light mb-6">Volume One Pieces</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {volumeOnePieces.map((piece, index) => (
              <motion.div
                key={piece.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${
                  piece.current 
                    ? 'bg-blue-500/20 border border-blue-500/50' 
                    : piece.completed 
                      ? 'bg-green-500/20 border border-green-500/50' 
                      : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                      <Image
                        src={composerPortraits[piece.composer]}
                        alt={piece.composer}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-light">{piece.title}</h3>
                      <p className="text-neutral-400">{piece.composer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {piece.current && (
                      <span className="text-blue-400 text-sm">Current Piece</span>
                    )}
                    {piece.completed && (
                      <BsCheckCircleFill className="text-green-400 text-xl" />
                    )}
                    {!piece.completed && !piece.current && (
                      <span className="text-neutral-500 text-sm">Upcoming</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Practice Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 rounded-xl p-6 mb-12"
        >
          <h2 className="text-2xl font-light mb-4">Today's Practice Tip</h2>
          <p className="text-neutral-300">
            "Remember to practice your current piece, 'Promenade', with a focus on the walking bass line. 
            Try playing it pizzicato first to really feel the rhythm in your fingers!"
          </p>
        </motion.div>
        <NewsletterForm note="Eric - you need to customize the .env.local so the MiailerLite GroupID reflects the correct subscriber sequence." />
      </div>
    </div>
  )
} 