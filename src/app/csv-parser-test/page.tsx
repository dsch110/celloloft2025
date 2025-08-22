'use client'

import { useState, useEffect } from 'react'
import { parseWeekFromCSV, getWeekData, type WeekData } from '@/utils/csvParser'
import Navigation from '@/components/Navigation'

export default function CSVParserTestPage() {
  const [csvContent, setCsvContent] = useState<string>('')
  const [weekData, setWeekData] = useState<WeekData | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<number>(1)
  const [loading, setLoading] = useState(true)

  // Load CSV on component mount
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('/PPPP - All Links for Website (Aug 16).csv')
        const content = await response.text()
        setCsvContent(content)
        
        // Parse first week by default
        const data = getWeekData(content, 1)
        setWeekData(data)
      } catch (error) {
        console.error('Error loading CSV:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadCSV()
  }, [])

  const handleWeekChange = (weekNum: number) => {
    if (csvContent) {
      setSelectedWeek(weekNum)
      const data = getWeekData(csvContent, weekNum)
      setWeekData(data)
    }
  }

  const renderVideo = (video: WeekData['videos'][0], index: number) => {
    const isToUpload = video.url === "TO UPLOAD" || !video.url

    return (
      <div key={index} className="mb-8 p-4 bg-neutral-800 rounded-lg">
        <h4 className="text-lg font-bold text-white mb-1">{video.title}</h4>
        <p className="text-neutral-300 text-sm mb-2">{video.subtitle}</p>
        <div className="text-xs text-neutral-400 mb-2">
          Type: <span className="text-blue-400">{video.type}</span>
        </div>
        {isToUpload ? (
          <div className="text-orange-400 text-sm">📹 TO UPLOAD</div>
        ) : (
          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            🎥 Watch Video
          </a>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">📊 Loading CSV Parser...</div>
          <div className="text-neutral-400">Reading course data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <Navigation />
      
      <div className="px-4 pt-20 pb-8 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
            CSV Parser Test
          </h1>
          <p className="text-neutral-300 mb-6">
            Test the CSV parser with your PPPP course data
          </p>
        </div>

        {/* Week Selector */}
        <div className="mb-8 text-center">
          <label className="block text-lg font-bold mb-4">Select Week to Parse:</label>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(weekNum => (
              <button
                key={weekNum}
                onClick={() => handleWeekChange(weekNum)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedWeek === weekNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                Week {weekNum}
              </button>
            ))}
          </div>
          <p className="text-neutral-400 text-sm mt-2">
            Showing first 10 weeks for testing
          </p>
        </div>

        {/* Parsed Data Display */}
        {weekData && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Raw Data */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">
                📋 Parsed Data Object
              </h2>
              <div className="text-sm text-neutral-300 space-y-2">
                <div><strong>Etude:</strong> {weekData.etude}</div>
                <div><strong>Week:</strong> {weekData.week}</div>
                <div><strong>Video Count:</strong> {weekData.videoCount}</div>
                <div><strong>Welcome Text:</strong></div>
                <div className="text-xs bg-neutral-700 p-2 rounded">{weekData.welcomeText}</div>
                {weekData.specialText && (
                  <>
                    <div><strong>Special Text:</strong></div>
                    <div className="text-xs bg-neutral-700 p-2 rounded whitespace-pre-line">
                      {weekData.specialText}
                    </div>
                  </>
                )}
                <div><strong>Videos:</strong> {weekData.videos.length}</div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-green-400">
                🎨 Template Preview
              </h2>
              
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
                  Etude {weekData.etude}
                </h3>
                <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
                  Week {weekData.week}
                </h4>
                <p className="text-neutral-300 text-sm mb-2">{weekData.welcomeText}</p>
                <div className="text-blue-400 font-bold">{weekData.videoCount}</div>
              </div>

              {/* Special Text */}
              {weekData.specialText && (
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3 mb-6">
                  <div className="text-blue-100 text-sm whitespace-pre-line">
                    {weekData.specialText}
                  </div>
                </div>
              )}

              {/* Videos */}
              <div className="space-y-4">
                {weekData.videos.map((video, index) => renderVideo(video, index))}
              </div>
            </div>
          </div>
        )}

        {/* CSV Content Preview */}
        <div className="mt-8 bg-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-400">
            📄 CSV Content (First 10 Lines)
          </h2>
          <pre className="text-xs text-neutral-300 bg-neutral-900 p-4 rounded overflow-x-auto">
            {csvContent.split('\n').slice(0, 10).join('\n')}
          </pre>
        </div>
      </div>
    </div>
  )
}


