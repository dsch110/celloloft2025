'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

// Data extracted from CSV for Etude #11 Week 1 (Column 1)
const weekData = {
  etude: "#11",
  week: "1 of 2", 
  specialText: `Download the sheet music to the etude here
ETUDE #11 SHEET MUSIC
The boxes underneath the staff are "Set Shift" boxes. You can ignore them for now - there will be a practice experiment about them soon.`,
  videoCount: "5 Videos:",
  welcomeText: "I have a few introductory videos to watch, and then the practice track will be at the bottom.",
  videos: [
    {
      title: "Introduction Video",
      subtitle: "Thoughts on how to approach the course",
      url: "TO UPLOAD",
      type: "intro"
    },
    {
      title: "Etude #11",
      subtitle: "Tips, Tricks, & Analysis",
      url: "TO UPLOAD",
      type: "analysis"
    },
    {
      title: "Practice Experiment #1",
      subtitle: "Stop Bows",
      url: "TO UPLOAD",
      type: "experiment"
    },
    {
      title: "Etude #11",
      subtitle: "Long Practice Intro",
      url: "TO UPLOAD",
      type: "practice"
    },
    {
      title: "Etude #11",
      subtitle: "Long Practice Track",
      url: "https://youtu.be/7P10t9_LWi0",
      type: "practice"
    }
  ]
}

export default function Etude1Week1Page() {
  const renderVideo = (video: typeof weekData.videos[0], index: number) => {
    const isToUpload = video.url === "TO UPLOAD" || !video.url

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="mb-12"
      >
        {/* Video Title */}
        <h3 className="text-xl md:text-2xl font-bold text-center mb-2 text-white underline decoration-2 underline-offset-4">
          {video.title}
        </h3>
        
        {/* Video Subtitle */}
        <p className="text-md md:text-lg text-center mb-4 text-neutral-300">
          {video.subtitle}
        </p>

        {/* Video Container */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative">
          {isToUpload ? (
            /* Placeholder for videos not yet uploaded */
            <div className="w-full h-full flex items-center justify-center bg-neutral-800 border-2 border-dashed border-neutral-600">
              <div className="text-center text-neutral-400">
                <div className="text-4xl mb-2">📹</div>
                <div className="text-sm font-medium">Video Coming Soon</div>
                <div className="text-xs opacity-75">{video.title}</div>
              </div>
            </div>
          ) : (
            /* Actual YouTube embed */
            <iframe
              src={video.url.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/')}
              title={`${video.title} - ${video.subtitle}`}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
        
        {/* Horizontal separator bar */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent mt-8"></div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content Container - Mobile First */}
      <div className="px-4 pt-20 pb-8 max-w-4xl mx-auto">
        
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-6">
            Etude {weekData.etude}
          </h1>
          <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
            Week {weekData.week}
          </h2>
          <p className="text-base md:text-lg text-neutral-300 mb-6 leading-relaxed">
            {weekData.welcomeText}
          </p>
          <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-8">
            {weekData.videoCount}
          </div>
        </motion.div>

        {/* Special Text/Download Section */}
        {weekData.specialText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 mb-8"
          >
            <div className="text-sm md:text-base text-blue-100 whitespace-pre-line">
              {weekData.specialText}
            </div>
          </motion.div>
        )}

        {/* Videos */}
        <div className="space-y-6">
          {weekData.videos.map((video, index) => renderVideo(video, index))}
        </div>

        {/* Navigation Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-neutral-700"
        >
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
            ← Previous Week
          </button>
          <div className="text-neutral-400 text-sm">
            Week 3 • Etude #1 - Week 1 of 2
          </div>
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
            Next Week →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
