'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ExtractedVideo {
  title: string
  youtubeUrl: string
  type: 'intro' | 'experiment' | 'analysis' | 'practice'
  duration?: string
}

interface ExtractedData {
  pageTitle: string
  subtitle: string
  videoCount: number
  videos: ExtractedVideo[]
}

export default function PPPPHtmlConverter() {
  const [htmlInput, setHtmlInput] = useState('')
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [error, setError] = useState('')

  const extractDataFromHtml = (html: string): ExtractedData => {
    // Create a DOM parser
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Extract page title (looking for Etude patterns)
    let pageTitle = ''
    const titleElements = doc.querySelectorAll('h1, h2, .title, .heading')
    for (const el of titleElements) {
      const text = el.textContent?.trim() || ''
      if (text.includes('Etude') && text.includes('Week')) {
        pageTitle = text
        break
      }
    }
    
    // Extract subtitle (usually the next text after title)
    let subtitle = ''
    const allTextElements = doc.querySelectorAll('p, div, span')
    for (const el of allTextElements) {
      const text = el.textContent?.trim() || ''
      if (text.length > 10 && text.length < 100 && !text.includes('Video') && !text.includes('http')) {
        subtitle = text
        break
      }
    }
    
    // Extract video count
    let videoCount = 0
    for (const el of allTextElements) {
      const text = el.textContent?.trim() || ''
      const match = text.match(/(\d+)\s*Videos?:?/i)
      if (match) {
        videoCount = parseInt(match[1])
        break
      }
    }
    
    // Extract YouTube videos
    const videos: ExtractedVideo[] = []
    
    // Look for iframes
    const iframes = doc.querySelectorAll('iframe')
    iframes.forEach((iframe) => {
      const src = iframe.src || iframe.getAttribute('data-src') || ''
      if (src.includes('youtube.com') || src.includes('youtu.be')) {
        let title = 'Video'
        
        // Try to find title from nearby elements
        const parent = iframe.closest('div, section, article')
        if (parent) {
          const headings = parent.querySelectorAll('h1, h2, h3, h4, h5, h6')
          if (headings.length > 0) {
            title = headings[headings.length - 1].textContent?.trim() || title
          }
        }
        
        // Determine video type based on title
        let type: ExtractedVideo['type'] = 'intro'
        const titleLower = title.toLowerCase()
        if (titleLower.includes('introduction') || titleLower.includes('intro')) {
          type = 'intro'
        } else if (titleLower.includes('practice experiment') || titleLower.includes('experiment')) {
          type = 'experiment'
        } else if (titleLower.includes('analysis') || titleLower.includes('tips') || titleLower.includes('tricks')) {
          type = 'analysis'
        } else if (titleLower.includes('practice track') || titleLower.includes('track')) {
          type = 'practice'
        }
        
        videos.push({
          title,
          youtubeUrl: src,
          type
        })
      }
    })
    
    // Look for YouTube links in text
    const allLinks = doc.querySelectorAll('a')
    allLinks.forEach((link) => {
      const href = link.href
      if (href && (href.includes('youtube.com') || href.includes('youtu.be'))) {
        const title = link.textContent?.trim() || 'Video'
        if (!videos.some(v => v.youtubeUrl === href)) {
          videos.push({
            title,
            youtubeUrl: href,
            type: 'intro'
          })
        }
      }
    })
    
    return {
      pageTitle: pageTitle || 'Untitled',
      subtitle: subtitle || '',
      videoCount: videoCount || videos.length,
      videos
    }
  }

  const handleExtract = () => {
    try {
      setError('')
      const data = extractDataFromHtml(htmlInput)
      setExtractedData(data)
    } catch (err) {
      setError('Error parsing HTML. Please check your input.')
      console.error(err)
    }
  }

  const generatePageCode = () => {
    if (!extractedData) return ''
    
    return `'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

export default function ${extractedData.pageTitle.replace(/[^a-zA-Z0-9]/g, '')}Page() {
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
            ${extractedData.pageTitle}
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            ${extractedData.subtitle}
          </p>
          <div className="text-2xl font-bold text-blue-400">
            ${extractedData.videoCount} Videos:
          </div>
        </motion.div>

        {/* Videos */}
        <div className="space-y-12 mb-12">
          ${extractedData.videos.map((video, index) => `
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">PPPP HTML Converter</h1>
        <p className="text-center text-neutral-300 mb-8">
          Copy HTML from your Squarespace page and paste it here to auto-extract video data
        </p>
        
        {/* HTML Input */}
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Paste Squarespace HTML</h2>
          <p className="text-neutral-300 mb-4">
            1. Go to your PPPP page → Right-click → Inspect<br/>
            2. Find the main content div → Right-click → Copy element<br/>
            3. Paste it here:
          </p>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste your HTML here..."
            className="w-full h-40 p-4 bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono text-sm"
          />
          <button
            onClick={handleExtract}
            disabled={!htmlInput.trim()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Extract Data
          </button>
          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>

        {/* Extracted Data Preview */}
        {extractedData && (
          <div className="bg-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Extracted Data</h2>
            <div className="space-y-4 mb-6">
              <div>
                <strong>Title:</strong> {extractedData.pageTitle}
              </div>
              <div>
                <strong>Subtitle:</strong> {extractedData.subtitle}
              </div>
              <div>
                <strong>Video Count:</strong> {extractedData.videoCount}
              </div>
              <div>
                <strong>Videos Found:</strong>
                <ul className="list-disc list-inside ml-4 mt-2">
                  {extractedData.videos.map((video, i) => (
                    <li key={i}>
                      {video.title} ({video.type})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Generated Code */}
        {extractedData && (
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Generated Page Code</h2>
            <textarea
              value={generatePageCode()}
              readOnly
              className="w-full h-96 p-4 bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono text-sm"
            />
            <button
              onClick={() => navigator.clipboard.writeText(generatePageCode())}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Copy Generated Code
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
