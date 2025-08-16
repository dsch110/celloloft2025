'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

// Data extracted from CSV for Etude #16 (Columns 3 & 4)
const week2Data = {
  etude: "#16",
  week: "2 of 2",
  specialText: "", // No special text for week 2
  videoCount: "2 Videos:",
  welcomeText: "Hey! I hope you're having an awesome week :) Here's the new stuff.",
  videos: [
    {
      title: "Etude #16",
      subtitle: "Short Practice Intro",
      url: "TO UPLOAD",
      type: "practice"
    },
    {
      title: "Etude #16",
      subtitle: "Short Practice Track",
      url: "https://youtu.be/Z0r16R7IIlk",
      type: "practice"
    }
  ]
}

const week1Data = {
  etude: "#16",
  week: "1 of 2",
  specialText: `Hey! The books are all on their way but for this etude, we will use a special copy.

Download the normal and special copies here
ETUDE #16 - NORMAL
ETUDE #16 - COLORS`,
  videoCount: "3 Videos:",
  welcomeText: "I have a few videos to watch, and then the practice track will be at the bottom.",
  videos: [
    {
      title: "Practice Experiment #2",
      subtitle: "Colors - Practicing by Position",
      url: "TO UPLOAD",
      type: "experiment"
    },
    {
      title: "Etude #16",
      subtitle: "Tips, Tricks, & Analysis", 
      url: "TO UPLOAD",
      type: "analysis"
    },
    {
      title: "Etude #16",
      subtitle: "Long Practice Track",
      url: "https://youtu.be/zlxOrrukrhI",
      type: "practice"
    }
  ]
}

export default function Etude1Week1Page() {
  const renderWeekSection = (weekData: typeof week1Data, weekLabel: string, startDelay: number = 0) => {
    return (
      <div className="mb-16">
        {/* Week Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: startDelay }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-3">
            Week {weekData.week}
          </h2>
          
          {/* Video Count */}
          <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">
            {weekData.videoCount}
          </div>
          
          {/* Welcome Text */}
          <p className="text-sm md:text-base text-neutral-300 mb-6 leading-relaxed">
            {weekData.welcomeText}
          </p>
        </motion.div>

        {/* Special Text/Download Section */}
        {weekData.specialText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: startDelay + 0.1 }}
            className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 mb-8"
          >
            <div className="text-sm md:text-base text-blue-100 whitespace-pre-line">
              {weekData.specialText}
            </div>
          </motion.div>
        )}

        {/* Videos */}
        <div className="space-y-6">
          {weekData.videos.map((video, index) => renderVideo(video, index, startDelay + 0.2 + (index * 0.1)))}
        </div>
      </div>
    )
  }

  const renderVideo = (video: typeof week1Data.videos[0], index: number, delay: number = 0) => {
    const isToUpload = video.url === "TO UPLOAD" || !video.url

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay }}
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
            Etude {week2Data.etude}
          </h1>
          <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
            Week {week2Data.week}
          </h2>
          <p className="text-base md:text-lg text-neutral-300 mb-6 leading-relaxed">
            {week2Data.welcomeText}
          </p>
          <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-8">
            {week2Data.videoCount}
          </div>
        </motion.div>

        {/* Week 2 Videos */}
        <div className="space-y-6 mb-16">
          {week2Data.videos.map((video, index) => renderVideo(video, index, 0.2 + (index * 0.1)))}
        </div>
        
        {/* Week 1 Section (Last Week) */}
        {renderWeekSection(week1Data, "Last Week", 0.4)}

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
