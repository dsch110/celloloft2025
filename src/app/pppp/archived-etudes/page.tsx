'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { FaArrowLeft, FaChevronDown, FaChevronRight, FaYoutube } from 'react-icons/fa'
import { BsPlayCircle, BsCheckCircleFill } from 'react-icons/bs'
import { getWeekData } from '@/utils/csvParser'

interface Video {
  title: string
  subtitle: string
  url: string
}

interface EtudeData {
  etudeNumber: string
  week1: {
    etude: string
    week: string
    welcomeText: string
    videoCount: string
    videos: Video[]
    specialText?: string
  } | null
  week2: {
    etude: string
    week: string
    welcomeText: string
    videoCount: string
    videos: Video[]
    specialText?: string
  } | null
}

export default function ArchivedEtudesPage() {
  const [csvContent, setCsvContent] = useState<string>('')
  const [expandedEtudes, setExpandedEtudes] = useState<Set<string>>(new Set())
  const [etudesData, setEtudesData] = useState<EtudeData[]>([])
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string; subtitle: string } | null>(null)

  // Chronological order based on the 53-week course structure
  // This represents the order etudes are studied (by week 4, we've completed: 11, 16, 1, 38)
  const completedEtudesInOrder = [
    { number: '11', columns: { week1: 0, week2: 1 } }, // CSV Columns 1-2 (getWeekData adds 1)
    { number: '16', columns: { week1: 2, week2: 3 } }, // CSV Columns 3-4 (getWeekData adds 1)
    { number: '1', columns: { week1: 4, week2: 5 } },  // CSV Columns 5-6 (getWeekData adds 1)
    { number: '38', columns: { week1: 6, week2: 7 } }, // CSV Columns 7-8 (getWeekData adds 1)
  ]

  useEffect(() => {
    const loadCSVAndParseEtudes = async () => {
      try {
        const response = await fetch('/PPPP - All Links for Website (Aug 16).csv')
        const content = await response.text()
        setCsvContent(content)

        // Parse all completed etudes
        const parsedEtudes: EtudeData[] = []
        
        for (const etude of completedEtudesInOrder) {
          const week1Data = parseColumnDirectly(content, etude.columns.week1)
          const week2Data = parseColumnDirectly(content, etude.columns.week2)
          
          parsedEtudes.push({
            etudeNumber: etude.number,
            week1: week1Data,
            week2: week2Data
          })
        }
        
        setEtudesData(parsedEtudes)
      } catch (error) {
        console.error('Error loading CSV:', error)
      }
    }

    loadCSVAndParseEtudes()
  }, [])

  const parseColumnDirectly = (csvContent: string, columnIndex: number) => {
    const lines = csvContent.split('\n')
    const videos: Video[] = []
    
    console.log(`Parsing column ${columnIndex}:`)
    
    // Parse videos starting from row 17 (index 16)
    // Every 3 rows = Title, Subtitle, URL
    for (let i = 16; i < lines.length; i += 3) {
      const titleRow = lines[i]?.split(',')
      const subtitleRow = lines[i + 1]?.split(',')
      const urlRow = lines[i + 2]?.split(',')
      
      const title = titleRow?.[columnIndex + 1]?.trim() || ''
      const subtitle = subtitleRow?.[columnIndex + 1]?.trim()?.replace(/"/g, '') || ''
      const url = urlRow?.[columnIndex + 1]?.trim() || 'TO UPLOAD'
      
      console.log(`Row ${i}: Title="${title}", Subtitle="${subtitle}", URL="${url}"`)
      
      if (title && title !== '') {
        videos.push({ title, subtitle, url })
      }
    }
    
    console.log(`Final videos for column ${columnIndex}:`, videos)
    
    return {
      week: '1 of 2',
      videoCount: `${videos.length} Videos:`,
      welcomeText: '',
      videos
    }
  }

  const toggleEtude = (etudeNumber: string) => {
    const newExpanded = new Set(expandedEtudes)
    if (newExpanded.has(etudeNumber)) {
      newExpanded.delete(etudeNumber)
    } else {
      newExpanded.add(etudeNumber)
    }
    setExpandedEtudes(newExpanded)
  }

  const [currentVideoId, setCurrentVideoId] = useState<string>('')

  const playVideo = (video: Video) => {
    let videoId = ''
    if (video.url.includes('youtu.be/')) {
      videoId = video.url.split('youtu.be/')[1].split('?')[0]
    } else if (video.url.includes('youtube.com/watch?v=')) {
      videoId = video.url.split('v=')[1].split('&')[0]
    }
    setCurrentVideoId(videoId)
  }

  const renderVideo = (video: Video, index: number, delay: number = 0) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
            console.log('Video clicked:', video.title, video.url)
            playVideo(video)
          }}
          className="flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer bg-neutral-700/30 border-neutral-600/30 hover:bg-neutral-700/50"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-600/50 flex-shrink-0">
            <FaYoutube className="text-lg text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate text-white">
              {video.title}
            </h4>
            <p className="text-sm truncate text-neutral-400">
              {video.subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <Navigation />
      
      {/* Main Content */}
      <div className="px-4 pt-20 pb-8 max-w-4xl mx-auto">
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link 
            href="/pppp-student-dashboard" 
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300 mb-4">
            Etude Archive
          </h1>
          <p className="text-lg text-neutral-300 mb-2">
            Your completed studies in chronological order
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
            <BsCheckCircleFill className="text-green-400" />
            <span>{etudesData.length} etudes completed</span>
          </div>
        </motion.div>

        {/* YouTube Player */}
        <div className="mb-8 flex justify-center">
          <iframe
            width="560"
            height="315"
            src={currentVideoId ? `https://www.youtube.com/embed/${currentVideoId}?autoplay=1` : ''}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="bg-neutral-700 rounded"
          ></iframe>
        </div>

        {/* Etudes List */}
        <div className="space-y-4">
          {etudesData.map((etudeData, index) => (
            <motion.div
              key={etudeData.etudeNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-neutral-800/50 to-neutral-700/30 border border-neutral-600/30 rounded-2xl overflow-hidden"
            >
              {/* Etude Header - Clickable Toggle */}
              <button
                onClick={() => toggleEtude(etudeData.etudeNumber)}
                className="w-full p-6 flex items-center justify-between hover:bg-neutral-700/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/40">
                    <BsCheckCircleFill className="text-green-400 text-xl" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-green-300">
                      Etude #{etudeData.etudeNumber}
                    </h2>
                    <p className="text-sm text-neutral-400">
                      {etudeData.week1 && etudeData.week2 ? 
                        `${etudeData.week1.videos.length + etudeData.week2.videos.length} videos total` : 
                        'Loading...'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400">
                    {expandedEtudes.has(etudeData.etudeNumber) ? 'Collapse' : 'Expand'}
                  </span>
                  {expandedEtudes.has(etudeData.etudeNumber) ? (
                    <FaChevronDown className="text-neutral-400" />
                  ) : (
                    <FaChevronRight className="text-neutral-400" />
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedEtudes.has(etudeData.etudeNumber) && etudeData.week1 && etudeData.week2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-neutral-600/30"
                  >
                    <div className="p-6">
                      
                      {/* Week 2 Videos */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-blue-300 mb-3">Week 2 Videos:</h4>
                        <div className="space-y-2">
                          {etudeData.week2.videos.map((video, videoIndex) => (
                            <div key={videoIndex} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded border border-neutral-600/30">
                              <div className="flex-1">
                                <h5 className="text-white font-medium">{video.title}</h5>
                                <p className="text-sm text-neutral-400">{video.subtitle}</p>
                              </div>
                              {video.url === 'TO UPLOAD' ? (
                                <div className="ml-4 px-4 py-2 bg-neutral-600 text-white text-xs rounded font-mono flex-shrink-0">
                                  TO UPLOAD
                                </div>
                              ) : (
                                <button
                                  onClick={() => playVideo(video)}
                                  className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors flex-shrink-0"
                                >
                                  Play
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Week 1 Videos */}
                      <div>
                        <h4 className="text-sm font-medium text-neutral-300 mb-3">Week 1 Videos:</h4>
                        <div className="space-y-2">
                          {etudeData.week1.videos.map((video, videoIndex) => (
                            <div key={videoIndex} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded border border-neutral-600/30">
                              <div className="flex-1">
                                <h5 className="text-white font-medium">{video.title}</h5>
                                <p className="text-sm text-neutral-400">{video.subtitle}</p>
                              </div>
                              {video.url === 'TO UPLOAD' ? (
                                <div className="ml-4 px-4 py-2 bg-neutral-600 text-white text-xs rounded font-mono flex-shrink-0">
                                  TO UPLOAD
                                </div>
                              ) : (
                                <button
                                  onClick={() => playVideo(video)}
                                  className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors flex-shrink-0"
                                >
                                  Play
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {etudesData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-neutral-400 mb-4">Loading your completed etudes...</div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-neutral-700"
        >
          <p className="text-sm text-neutral-400">
            More etudes will appear here as you complete them - keep rocking it!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
