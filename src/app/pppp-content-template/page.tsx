'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface VideoData {
  title: string
  youtubeUrl: string
  order: number
}

export default function PPPPContentTemplate() {
  const [weekTitle, setWeekTitle] = useState('')
  const [weekSubtitle, setWeekSubtitle] = useState('')
  const [videos, setVideos] = useState<VideoData[]>([
    { title: '', youtubeUrl: '', order: 1 },
    { title: '', youtubeUrl: '', order: 2 },
    { title: '', youtubeUrl: '', order: 3 },
    { title: '', youtubeUrl: '', order: 4 },
    { title: '', youtubeUrl: '', order: 5 },
    { title: '', youtubeUrl: '', order: 6 },
  ])

  const updateVideo = (index: number, field: keyof VideoData, value: string) => {
    const newVideos = [...videos]
    newVideos[index] = { ...newVideos[index], [field]: value }
    setVideos(newVideos)
  }

  const generatePageCode = () => {
    const filteredVideos = videos.filter(v => v.title.trim() && v.youtubeUrl.trim())
    
    return `'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

export default function Week${weekTitle.replace(/\D/g, '')}Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="relative px-8 pt-24 max-w-6xl mx-auto">
        <Navigation />

        {/* Week Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
            ${weekTitle}
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            ${weekSubtitle}
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid gap-8 mb-12">
          ${filteredVideos.map((video, index) => `
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ${index * 0.1} }}
            className="bg-white/10 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">${video.title}</h3>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src="${video.youtubeUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}"
                title="${video.title}"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </motion.div>`).join('')}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center py-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            ← Previous Week
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Next Week →
          </button>
        </div>
      </div>
    </div>
  )
}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">PPPP Content Template Generator</h1>
        
        {/* Week Info */}
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Week Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Week Title</label>
              <input
                type="text"
                value={weekTitle}
                onChange={(e) => setWeekTitle(e.target.value)}
                placeholder="e.g., Week 1: Etude no. 11"
                className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Week Subtitle</label>
              <input
                type="text"
                value={weekSubtitle}
                onChange={(e) => setWeekSubtitle(e.target.value)}
                placeholder="e.g., Stop Bows"
                className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Videos */}
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Videos (up to 6)</h2>
          {videos.map((video, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-neutral-800 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">Video {index + 1} Title</label>
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => updateVideo(index, 'title', e.target.value)}
                  placeholder="e.g., Introduction to Stop Bows"
                  className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">YouTube URL</label>
                <input
                  type="text"
                  value={video.youtubeUrl}
                  onChange={(e) => updateVideo(index, 'youtubeUrl', e.target.value)}
                  placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                  className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Generated Code */}
        <div className="bg-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Generated Page Code</h2>
          <p className="text-neutral-300 mb-4">Copy this code and save it as a new page file:</p>
          <textarea
            value={generatePageCode()}
            readOnly
            className="w-full h-96 p-4 bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono text-sm"
          />
          <button
            onClick={() => navigator.clipboard.writeText(generatePageCode())}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  )
}
