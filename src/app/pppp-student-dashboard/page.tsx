'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { BsPlayCircle, BsCheckCircleFill, BsDownload } from 'react-icons/bs'
import { FiClock, FiUsers } from 'react-icons/fi'
import { IoTrophyOutline, IoCalendarOutline } from 'react-icons/io5'
import { FaYoutube } from 'react-icons/fa'
import ProgressCircle from '@/components/ProgressCircle'
import Image from 'next/image'
import { PPPP_COURSE_STRUCTURE, getWeekByNumber, isUnitReview } from '@/data/pppp-course-structure'

interface PPPPVideo {
  id: string
  title: string
  description: string
  videoUrl?: string
  youtubeId?: string
  duration: string
  isPracticeTrack: boolean
  isWatched: boolean
  orderInWeek: number
}

interface PPPPResource {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  fileSize: string
  isDownloaded: boolean
}

export default function PPPPStudentDashboard() {
  const [studentName] = useState("Hermione")
  const [cohortName] = useState("Cohort 1")
  const [currentWeek] = useState(3)
  const [referralCode] = useState("HERMIONE250")
  const [totalEarnings] = useState(500)
  const [referralCount] = useState(2)
  
  // Get current week data from the course structure
  const currentWeekData = getWeekByNumber(currentWeek)
  const isCurrentWeekReview = isUnitReview(currentWeek)
  
  // Mock videos for current week (you can replace with real data later)
  const currentWeekVideos: PPPPVideo[] = [
    {
      id: "3.1",
      title: "Etude #16 Introduction",
      description: "Welcome to Etude #16 - building on previous techniques",
      youtubeId: "dQw4w9WgXcQ",
      duration: "18:45",
      isPracticeTrack: false,
      isWatched: false,
      orderInWeek: 1
    },
    {
      id: "3.2",
      title: "Etude #1 Deep Dive",
      description: "Comprehensive analysis of Etude #1",
      youtubeId: "dQw4w9WgXcQ",
      duration: "22:30",
      isPracticeTrack: false,
      isWatched: false,
      orderInWeek: 2
    },
    {
      id: "3.3",
      title: "Practice Track - Combined",
      description: "Guided practice session for both etudes",
      youtubeId: "dQw4w9WgXcQ",
      duration: "15:20",
      isPracticeTrack: true,
      isWatched: false,
      orderInWeek: 3
    }
  ]

  // Mock resources
  const resources: PPPPResource[] = [
    {
      id: "1",
      title: "Popper 40 Etudes - Complete Score",
      description: "Full score of all 40 Popper etudes",
      fileUrl: "/resources/popper-40-etudes.pdf",
      fileType: "pdf",
      fileSize: "15.2 MB",
      isDownloaded: true
    },
    {
      id: "2",
      title: "Practice Schedule Template",
      description: "Weekly practice planning worksheet",
      fileUrl: "/resources/practice-schedule.pdf",
      fileType: "pdf",
      fileSize: "2.1 MB",
      isDownloaded: false
    },
    {
      id: "3",
      title: "Technique Reference Guide",
      description: "Essential cello techniques for Popper etudes",
      fileUrl: "/resources/technique-guide.pdf",
      fileType: "pdf",
      fileSize: "8.7 MB",
      isDownloaded: false
    }
  ]

  // Calculate progress based on completed weeks (mock data for now)
  const completedWeeks = 2 // Weeks 1-2 completed
  const progress = (completedWeeks / 53) * 100

  const nextMasterclass = {
    date: "2024-07-25",
    time: "6:00 PM EST",
    zoomLink: "https://zoom.us/j/1234567890",
    title: "PPP Masterclass: Etude #16 & #1 Deep Dive"
  }

  const studioPoliciesUrl = "/studio-policies.pdf"

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
            "Mastering Popper one etude at a time - your journey to cello excellence continues!"
          </p>
          <p className="text-lg text-neutral-400 mt-2">
            {cohortName} • Week {currentWeek} of 53
          </p>
        </motion.div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Studio Policies</h2>
            <a href={studioPoliciesUrl} download className="text-blue-400 underline">Download PDF</a>
          </div>
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Next Masterclass</h2>
            <p className="text-lg mb-2">{nextMasterclass.date} at {nextMasterclass.time}</p>
            <a href={nextMasterclass.zoomLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Join Zoom</a>
          </div>
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Your Referral Code</h2>
            <p className="text-lg font-mono text-green-400 mb-2">{referralCode}</p>
            <p className="text-sm text-neutral-400">Earn $250 per referral!</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-light mb-2">Total Earnings</h2>
            <p className="text-2xl font-bold text-green-400 mb-1">${totalEarnings}</p>
            <p className="text-sm text-neutral-400">{referralCount} referrals</p>
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
            <h2 className="text-2xl font-light mb-4">PPP Progress</h2>
            <div className="flex justify-center mb-4">
              <ProgressCircle value={progress} />
            </div>
            <p className="text-center text-neutral-300">
              {completedWeeks} of 53 weeks completed
            </p>
            <p className="text-center text-blue-400 text-sm mt-2">
              Week {currentWeek} • {currentWeekData?.title}
            </p>
          </motion.div>

          {/* Current Week */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-xl p-6"
          >
            <h2 className="text-2xl font-light mb-4">Current Week</h2>
            {currentWeekData && (
              <div className="text-center">
                <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg ${
                  isCurrentWeekReview ? 'border border-yellow-500/50' : ''
                }`}>
                  <h3 className="text-xl font-semibold mb-4">Week {currentWeek}</h3>
                  <p className="text-lg font-medium mb-2">
                    {currentWeekData.title}
                  </p>
                  {isCurrentWeekReview && (
                    <p className="text-yellow-400 text-sm mb-4">Unit Review Week</p>
                  )}
                  <p className="text-neutral-400 mb-4">
                    {currentWeekVideos.length} videos available
                  </p>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition">
                    Continue Learning
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
                  <p className="text-xl">8.5 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IoTrophyOutline className="text-2xl text-yellow-400" />
                <div>
                  <p className="text-neutral-400">Streak</p>
                  <p className="text-xl">5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiUsers className="text-2xl text-green-400" />
                <div>
                  <p className="text-neutral-400">Cohort</p>
                  <p className="text-xl">{cohortName}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Current Week Videos */}
        <div className="bg-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-light mb-6">Week {currentWeek} Videos</h2>
          <div className="space-y-4">
            {currentWeekVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg ${
                  video.isPracticeTrack 
                    ? 'bg-blue-500/20 border border-blue-500/50' 
                    : video.isWatched 
                      ? 'bg-green-500/20 border border-green-500/50' 
                      : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {video.isPracticeTrack ? (
                        <BsPlayCircle className="text-blue-400 text-xl" />
                      ) : (
                        <FaYoutube className="text-red-400 text-xl" />
                      )}
                      <span className="text-sm text-neutral-400">#{video.orderInWeek}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-light">{video.title}</h3>
                      <p className="text-neutral-400 text-sm">{video.description}</p>
                      <p className="text-neutral-500 text-xs">{video.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {video.isWatched && (
                      <BsCheckCircleFill className="text-green-400 text-xl" />
                    )}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded shadow transition">
                      Watch
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-light mb-6">Course Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  resource.isDownloaded 
                    ? 'bg-green-500/20 border border-green-500/50' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BsDownload className="text-blue-400 text-xl" />
                    <div>
                      <h3 className="text-lg font-light">{resource.title}</h3>
                      <p className="text-neutral-400 text-sm">{resource.description}</p>
                      <p className="text-neutral-500 text-xs">{resource.fileSize} • {resource.fileType.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {resource.isDownloaded && (
                      <BsCheckCircleFill className="text-green-400 text-xl" />
                    )}
                    <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded shadow transition">
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Weeks Preview */}
        <div className="bg-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-light mb-6">Upcoming Weeks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PPPP_COURSE_STRUCTURE.slice(currentWeek, currentWeek + 3).map((week) => (
              <motion.div
                key={week.weekNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  isUnitReview(week.weekNumber)
                    ? 'bg-yellow-500/20 border border-yellow-500/50' 
                    : 'bg-white/5 border border-white/10 opacity-50'
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Week {week.weekNumber}</h3>
                  <p className="text-neutral-400 text-sm mb-2">{week.title}</p>
                  <div className="flex items-center justify-center gap-2">
                    {isUnitReview(week.weekNumber) ? (
                      <span className="text-yellow-400 text-sm">Unit Review</span>
                    ) : (
                      <span className="text-neutral-500 text-sm">Coming Soon</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 