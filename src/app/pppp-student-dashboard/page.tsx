'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsPlayCircle, BsCheckCircleFill, BsDownload, BsChevronDown, BsChevronUp, BsChevronLeft, BsChevronRight, BsPlayFill } from 'react-icons/bs'
import { FiClock, FiUsers, FiCalendar, FiVideo } from 'react-icons/fi'
import { IoTrophyOutline, IoCalendarOutline } from 'react-icons/io5'
import { FaYoutube, FaFlask, FaGraduationCap, FaMusic } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'
import { HiOutlineAcademicCap, HiOutlineArchive } from 'react-icons/hi'
import ProgressCircle from '@/components/ProgressCircle'
import Image from 'next/image'
import { PPPP_COURSE_STRUCTURE, getWeekByNumber, isUnitReview } from '@/data/pppp-course-structure'
import { getWeekData, parseWeekFromCSV, type WeekData } from '@/utils/csvParser'

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

// Helper function to get video type styling
function getVideoTypeStyle(type: string, title: string, subtitle: string, index: number) {
  const isLongPracticeTrack = title.toLowerCase().includes('long') || subtitle.toLowerCase().includes('long')
  const isShortPracticeTrack = title.toLowerCase().includes('short') || subtitle.toLowerCase().includes('short') || subtitle.toLowerCase().includes('track')
  const isPracticeIntro = subtitle.toLowerCase().includes('practice intro') || subtitle.toLowerCase().includes('short practice intro')
  
  switch (type) {
    case 'experiment':
      return {
        icon: <FaFlask className="text-purple-400 text-3xl" />,
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-500/30',
        numberColor: 'text-purple-300',
        number: index + 1,
        label: 'Experiment'
      }
    case 'practice':
      // Practice intros should be treated as informational (blue)
      if (isPracticeIntro) {
        return {
          icon: <FaGraduationCap className="text-blue-400 text-3xl" />,
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          numberColor: 'text-blue-300',
          number: index + 1,
          label: 'Intro'
        }
      } else if (isLongPracticeTrack) {
        return {
          icon: <span className="text-emerald-400 text-4xl font-bold">𝄢</span>,
          bgColor: 'bg-emerald-500/20',
          borderColor: 'border-emerald-500/30',
          numberColor: 'text-emerald-300',
          number: index + 1,
          label: 'Long Practice'
        }
      } else if (isShortPracticeTrack) {
        return {
          icon: <span className="text-green-400 text-4xl font-bold">𝄢</span>,
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          numberColor: 'text-green-300',
          number: index + 1,
          label: 'Short Practice'
        }
      }
      return {
        icon: <span className="text-green-400 text-4xl font-bold">𝄢</span>,
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/30',
        numberColor: 'text-green-300',
        number: index + 1,
        label: 'Practice'
      }
    case 'analysis':
      return {
        icon: <FaGraduationCap className="text-blue-400 text-3xl" />,
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-500/30',
        numberColor: 'text-blue-300',
        number: index + 1,
        label: 'Analysis'
      }
    default:
      return {
        icon: <FiVideo className="text-neutral-400 text-3xl" />,
        bgColor: 'bg-neutral-500/20',
        borderColor: 'border-neutral-500/30',
        numberColor: 'text-neutral-300',
        number: index + 1,
        label: 'Video'
      }
  }
}

export default function PPPPStudentDashboard() {
  const [studentName] = useState("Hermione")
  const [currentWeek] = useState(4) // Week 4 as requested
  const [referralCode] = useState("HERMIONE250")
  const [totalEarnings] = useState(500)
  const [referralCount] = useState(2)
  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false)

  const [archiveViewMode, setArchiveViewMode] = useState<'number' | 'week' | 'masterclass'>('number')
  const [csvContent, setCsvContent] = useState<string>('')
  const [weekContent, setWeekContent] = useState<{week1: WeekData | null, week2: WeekData | null}>({week1: null, week2: null})
  const [carouselIndex, setCarouselIndex] = useState(3) // Start at current week (Week 4, index 3)
  
  // Load CSV and parse week content
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('/PPPP - All Links for Website (Aug 16).csv')
        const content = await response.text()
        setCsvContent(content)
        
        // For Week 4: Look for columns labeled "Week 4"
        // Column 6 = Etude #1 Week 2 (shows "Week 4" in header)
        // Column 7 = Etude #38 Week 1 (shows "Week 4" in header)
        const etude1Week2 = parseWeekFromCSV(content, 6)   // Etude #1 Week 2 of 2 (Column 6)
        const etude38Week1 = parseWeekFromCSV(content, 7)  // Etude #38 Week 1 of 2 (Column 7)
        

        
        setWeekContent({
          week1: etude1Week2,   // Etude #1 Week 2 of 2 (Column 6)
          week2: etude38Week1   // Etude #38 Week 1 of 2 (Column 7)
        })
      } catch (error) {
        console.error('Error loading CSV:', error)
      }
    }
    
    loadCSV()
  }, [])
  
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

  // Calculate progress based on completed weeks
  const completedWeeks = 3 // Weeks 1-3 completed, Week 4 is current
  const progress = (completedWeeks / 53) * 100

  const nextMasterclass = {
    date: "Saturday, July 25",
    time: "6:00 PM EST",
    zoomLink: "https://zoom.us/j/1234567890",
    title: "Etude #16 & #1 Deep Dive",
    description: "Advanced techniques and performance insights"
  }

  // Generate archive data - Week 4 completed etudes: #11, #16, #1, #38
  const completedEtudeNumbers = [1, 11, 16, 38] // Etudes studied by Week 4
  const etudes = Array.from({ length: 40 }, (_, i) => ({
    number: i + 1,
    isCompleted: completedEtudeNumbers.includes(i + 1),
    title: `Etude #${i + 1}`
  }))

  const units = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    isCompleted: i < 1, // Only Unit 1 completed so far
    title: `Unit ${i + 1}`
  }))

  // Generate carousel weeks data
  const carouselWeeks = Array.from({ length: currentWeek }, (_, i) => {
    const weekNum = i + 1
    let title = ""
    let etudes: string[] = []
    
    // Map weeks to their etudes based on CSV structure
    switch(weekNum) {
      case 1:
        title = "Etude #11 - Week 1"
        etudes = ["#11"]
        break
      case 2:
        title = "Etude #11 - Week 2 & #16 - Week 1"
        etudes = ["#11", "#16"]
        break
      case 3:
        title = "Etude #16 - Week 2 & #1 - Week 1"
        etudes = ["#16", "#1"]
        break
      case 4:
        title = "Etude #1 - Week 2 & #38 - Week 1"
        etudes = ["#1", "#38"]
        break
      default:
        title = `Week ${weekNum}`
        etudes = []
    }
    
    return {
      weekNumber: weekNum,
      title,
      etudes,
      isCurrent: weekNum === currentWeek
    }
  })

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
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Welcome back, {studentName}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Mastering Popper one etude at a time — your journey to cello excellence continues
          </p>
          </motion.div>

                {/* Week at a Glance - Combined */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-neutral-800/50 to-neutral-700/30 border border-neutral-600/30 rounded-2xl p-6 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Week {currentWeek} of 53
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Etude #1 Week 2 of 2 */}
            {weekContent.week1 && (
              <div className="space-y-4">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-teal-300 mb-2">
                    Etude {weekContent.week1.etude}
                  </h3>
                  <p className="text-neutral-400 text-lg mb-2">
                    Week {weekContent.week1.week}
                  </p>
                  <span className="inline-block text-teal-400 font-medium">
                    {weekContent.week1.videos.length} Videos
                  </span>
                </div>
                
                {/* Full page button */}
                <Link href="/pppp/week-2-videos" className="block mb-6">
                  <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold px-6 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                    Open Full Page →
                  </button>
                </Link>
                
                {/* Individual videos */}
                <div className="space-y-3">
                  {weekContent.week1.videos.map((video, index) => {
                    const videoStyle = getVideoTypeStyle(video.type, video.title, video.subtitle, index)
                    return (
                      <motion.div
                        key={`week1-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl transition-all ${videoStyle.bgColor} ${videoStyle.borderColor} border hover:bg-opacity-80`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4">
                              <span className={`text-2xl font-bold ${videoStyle.numberColor} w-8 text-center`}>
                                {videoStyle.number}
                              </span>
                              <div className="w-8 flex justify-center items-center">
                                {videoStyle.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold leading-tight text-white">{video.subtitle}</h4>
                              <p className="text-neutral-400 text-sm leading-tight mt-1 font-medium">{video.title}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => video.url !== 'TO UPLOAD' && window.open(video.url, '_blank')}
                              className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                                video.url === 'TO UPLOAD' 
                                  ? 'bg-neutral-600 cursor-not-allowed' 
                                  : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                              }`}
                              disabled={video.url === 'TO UPLOAD'}
                            >
                              <BsPlayFill className="text-white text-2xl" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Etude #38 Week 1 of 2 */}
            {weekContent.week2 && (
              <div className="space-y-4">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-blue-300 mb-2">
                    Etude {weekContent.week2.etude}
                  </h3>
                  <p className="text-neutral-400 text-lg mb-2">
                    Week {weekContent.week2.week}
                  </p>
                  <span className="inline-block text-blue-400 font-medium">
                    {weekContent.week2.videos.length} Videos
                  </span>
                </div>
                
                {/* Full page button */}
                <Link href="/pppp/week-1-videos" className="block mb-6">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-6 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                    Open Full Page →
                  </button>
                </Link>
                
                {/* Individual videos */}
                <div className="space-y-3">
                  {weekContent.week2.videos.map((video, index) => {
                    const videoStyle = getVideoTypeStyle(video.type, video.title, video.subtitle, (weekContent.week1?.videos.length || 0) + index)
                    return (
                      <motion.div
                        key={`week2-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (weekContent.week1?.videos.length || 0) * 0.1 + index * 0.1 }}
                        className={`p-4 rounded-xl transition-all ${videoStyle.bgColor} ${videoStyle.borderColor} border hover:bg-opacity-80`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4">
                              <span className={`text-2xl font-bold ${videoStyle.numberColor} w-8 text-center`}>
                                {videoStyle.number}
                              </span>
                              <div className="w-8 flex justify-center items-center">
                                {videoStyle.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold leading-tight text-white">{video.subtitle}</h4>
                              <p className="text-neutral-400 text-sm leading-tight mt-1 font-medium">{video.title}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => video.url !== 'TO UPLOAD' && window.open(video.url, '_blank')}
                              className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                                video.url === 'TO UPLOAD' 
                                  ? 'bg-neutral-600 cursor-not-allowed' 
                                  : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                              }`}
                              disabled={video.url === 'TO UPLOAD'}
                            >
                              <BsPlayFill className="text-white text-2xl" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Loading state */}
          {!weekContent.week1 && !weekContent.week2 && (
            <div className="text-center py-8">
              <div className="text-neutral-400">Loading this week's content...</div>
            </div>
          )}
        </motion.div>



        {/* Next Masterclass */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-300 mb-2">Next Masterclass</h2>
              <p className="text-neutral-400 text-sm mb-1">{nextMasterclass.date}</p>
              <p className="text-neutral-400 text-sm">{nextMasterclass.time}</p>
            </div>
            <a 
              href={nextMasterclass.zoomLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Join Session
            </a>
          </div>
        </motion.div>



        
        {/* Referral Program */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">Referral Program</h3>
              <p className="text-sm text-neutral-400 mb-1">Share your unique code and earn rewards!</p>
              <p className="text-sm text-neutral-400">Code: <span className="text-green-400 font-mono text-base font-bold">{referralCode}</span></p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400 mb-1">${totalEarnings}</p>
              <p className="text-sm text-neutral-400">$250 + $250 earned</p>
              <button className="mt-3 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                Share Code
              </button>
            </div>
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-neutral-800/50 to-neutral-700/30 border border-neutral-600/30 rounded-2xl p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6">Course Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl transition-all ${
                  resource.isDownloaded 
                    ? 'bg-green-500/20 border border-green-500/30 hover:bg-green-500/30' 
                    : 'bg-neutral-700/30 border border-neutral-600/30 hover:bg-neutral-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-600/50">
                    <BsDownload className="text-blue-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">{resource.title}</h3>
                      <p className="text-neutral-400 text-sm mb-1">{resource.description}</p>
                      <p className="text-neutral-500 text-xs">{resource.fileSize} • {resource.fileType.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {resource.isDownloaded && (
                      <BsCheckCircleFill className="text-green-400 text-xl" />
                    )}
                    <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                      {resource.isDownloaded ? 'Downloaded' : 'Download'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Archive of Etudes Studied - Full Width */}
        <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setIsArchiveExpanded(!isArchiveExpanded)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <HiOutlineArchive className="text-2xl text-purple-400" />
              <h2 className="text-2xl font-semibold">Video Archive</h2>
            </button>
            {isArchiveExpanded && (
              <button
                onClick={() => setIsArchiveExpanded(!isArchiveExpanded)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <BsChevronUp />
              </button>
            )}
          </div>
          
          {/* Progress Summary */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-lg font-medium text-purple-300">
                {etudes.filter(e => e.isCompleted).length} of {etudes.length} etudes completed
              </p>
              <p className="text-sm text-neutral-400">
                You've mastered: Etudes #1, #11, #16, #38
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setArchiveViewMode('number')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  archiveViewMode === 'number'
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                    : 'bg-neutral-600/30 text-neutral-400 hover:bg-neutral-600/50 border border-neutral-600/50'
                }`}
              >
                View by Number
              </button>
              <button
                onClick={() => setArchiveViewMode('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  archiveViewMode === 'week'
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                    : 'bg-neutral-600/30 text-neutral-400 hover:bg-neutral-600/50 border border-neutral-600/50'
                }`}
              >
                View by Week
              </button>
              <button
                onClick={() => setArchiveViewMode('masterclass')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  archiveViewMode === 'masterclass'
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                    : 'bg-neutral-600/30 text-neutral-400 hover:bg-neutral-600/50 border border-neutral-600/50'
                }`}
              >
                Masterclasses
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-neutral-700 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(etudes.filter(e => e.isCompleted).length / etudes.length) * 100}%` }}
            />
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isArchiveExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8">
                  {archiveViewMode === 'number' ? (
                    <>
                      {/* Etudes Section */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                          <HiOutlineAcademicCap className="text-purple-400" />
                          Popper Etudes
                        </h3>
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {etudes.map((etude) => (
                            <motion.div
                              key={etude.number}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: etude.number * 0.02 }}
                            >
                              {etude.isCompleted ? (
                                <Link href="/pppp/archived-etudes">
                                  <div className="p-3 rounded-lg font-medium transition-all bg-green-500/20 border border-green-500/40 text-green-300 hover:bg-green-500/30 cursor-pointer">
                                    <div className="text-sm">{etude.title}</div>
                                    <BsCheckCircleFill className="text-green-400 text-xs mt-1 mx-auto" />
                                  </div>
                                </Link>
                              ) : (
                                <div className="p-3 rounded-lg font-medium bg-neutral-700/50 border border-neutral-600/50 text-neutral-400">
                                  <div className="text-sm">{etude.title}</div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Unit Reviews Section */}
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                          <IoTrophyOutline className="text-yellow-400" />
                          Unit Reviews
                        </h3>
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {units.map((unit) => (
                            <motion.button
                              key={unit.number}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: unit.number * 0.05 }}
                              className={`p-4 rounded-lg font-medium transition-all ${
                                unit.isCompleted
                                  ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/30'
                                  : 'bg-neutral-700/50 border border-neutral-600/50 text-neutral-400 hover:bg-neutral-700/70'
                              }`}
                            >
                              <div className="text-sm">{unit.title}</div>
                              {unit.isCompleted && (
                                <BsCheckCircleFill className="text-yellow-400 text-xs mt-1 mx-auto" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : archiveViewMode === 'week' ? (
                    /* By Week View */
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <IoCalendarOutline className="text-purple-400" />
                        Progress by Week
                      </h3>
                      <div className="space-y-4">
                        {carouselWeeks.map((week) => (
                          <motion.div
                            key={week.weekNumber}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: week.weekNumber * 0.1 }}
                            className={`p-4 rounded-xl border transition-all ${
                              week.weekNumber < currentWeek
                                ? 'bg-green-500/10 border-green-500/30'
                                : week.weekNumber === currentWeek
                                  ? 'bg-blue-500/10 border-blue-500/30'
                                  : 'bg-neutral-700/30 border-neutral-600/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-xl font-semibold">Week {week.weekNumber}</h4>
                              <div className="text-right">
                                {week.weekNumber < currentWeek ? (
                                  <BsCheckCircleFill className="text-green-400 text-xl" />
                                ) : week.weekNumber === currentWeek ? (
                                  <div className="flex items-center gap-2">
                                    <BsPlayCircle className="text-blue-400 text-xl" />
                                    <span className="text-blue-400 font-medium">Current</span>
                                  </div>
                                ) : (
                                  <span className="text-neutral-500 text-sm">Coming Soon</span>
                                )}
                              </div>
                            </div>
                            
                            {/* Etude tiles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {week.etudes.map((etude, index) => (
                                <div 
                                  key={index}
                                  className={`p-3 rounded-lg text-center transition-all ${
                                    week.weekNumber < currentWeek
                                      ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                                      : week.weekNumber === currentWeek
                                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-200'
                                        : 'bg-neutral-600/30 border border-neutral-500/30 text-neutral-300'
                                  }`}
                                >
                                  <span className="font-medium">{etude}</span>
                                </div>
                              ))}
                            </div>
              </motion.div>
            ))}
          </div>
        </div>
                  ) : (
                    /* Masterclass View */
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <HiOutlineAcademicCap className="text-blue-400" />
                        Masterclasses
                      </h3>
                      
                      {/* Next Masterclass */}
                      <div className="mb-6">
                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-blue-300 mb-2">Next Masterclass</h4>
                              <p className="text-neutral-400 text-sm mb-1">{nextMasterclass.date}</p>
                              <p className="text-neutral-400 text-sm mb-2">{nextMasterclass.time}</p>
                              <p className="text-blue-200 text-sm">{nextMasterclass.title}</p>
                              <p className="text-neutral-400 text-xs">{nextMasterclass.description}</p>
                            </div>
                            <a 
                              href={nextMasterclass.zoomLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                            >
                              Join Session
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Archived Masterclasses */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-neutral-300">Previous Masterclasses</h4>
                        <div className="bg-neutral-700/30 border border-neutral-600/30 rounded-xl p-6 text-center">
                          <p className="text-neutral-400 text-sm">
                            No archived masterclasses yet. Recordings will appear here after each session.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>



      </div>
    </div>
  )
} 