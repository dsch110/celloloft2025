/**
 * CSV Parser for PPPP Course Content
 * Converts CSV spreadsheet data into template-ready weekData objects
 */

export interface VideoData {
  title: string
  subtitle: string
  url: string
  type: 'practice' | 'analysis' | 'experiment' | 'bonus' | 'review'
}

export interface WeekData {
  etude: string
  week: string
  specialText: string
  videoCount: string
  welcomeText: string
  videos: VideoData[]
}

/**
 * Parses CSV content and returns week data for a specific column
 * @param csvContent - Raw CSV file content as string
 * @param columnIndex - Column index (1-based, matches your CSV structure)
 * @returns WeekData object ready for templates
 */
export function parseWeekFromCSV(csvContent: string, columnIndex: number): WeekData {
  const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line)
  
  // Parse CSV into rows and columns
  const rows: string[][] = []
  lines.forEach(line => {
    // Simple CSV parsing - handles basic quotes and commas
    const columns: string[] = []
    let currentColumn = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"' && (i === 0 || line[i-1] === ',')) {
        inQuotes = true
      } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
        inQuotes = false
      } else if (char === ',' && !inQuotes) {
        columns.push(currentColumn.trim())
        currentColumn = ''
      } else {
        currentColumn += char
      }
    }
    columns.push(currentColumn.trim())
    rows.push(columns)
  })

  // Extract data for the specified column (convert to 0-based index)
  const colIndex = columnIndex
  
  // Row mappings based on your CSV structure
  const title = rows[1]?.[colIndex] || '' // Row 2: Title
  const week = rows[2]?.[colIndex] || '' // Row 3: Week
  const specialText = rows[3]?.[colIndex]?.replace(/"/g, '') || '' // Row 4-13: Special Text (multiline)
  const videoCount = rows[14]?.[colIndex] || '' // Row 15: Number of Videos
  const welcomeText = rows[15]?.[colIndex]?.replace(/"/g, '') || '' // Row 16: Text
  
  // Parse videos starting from row 17
  const videos: VideoData[] = []
  
  // Video parsing: Every 3 rows = 1 video, but display Title/Subtitle pairs (skip URL row for display)
  for (let videoIndex = 0; videoIndex < 8; videoIndex++) { // Max 8 videos
    const titleRowIndex = 15 + (videoIndex * 3) // Row 17, 20, 23, 26, 29, 32. Eric, you had to change this from 16 on the left side of the equation.
    const subtitleRowIndex = titleRowIndex + 1  // Row 18, 21, 24, 27, 30, 33
    const urlRowIndex = titleRowIndex + 2       // Row 19, 22, 25, 28, 31, 34
    
    const videoTitle = rows[titleRowIndex]?.[colIndex]?.trim()
    const videoSubtitle = rows[subtitleRowIndex]?.[colIndex]?.trim()
    const videoUrl = rows[urlRowIndex]?.[colIndex]?.trim()
    
    // Only add video if title exists
    if (videoTitle && videoTitle !== '') {
      videos.push({
        title: videoTitle,
        subtitle: videoSubtitle || '',
        url: videoUrl || 'TO UPLOAD',
        type: getVideoType(videoTitle, videoSubtitle)
      })
    }
  }

  return {
    etude: title ? `#${title.replace('Etude #', '').replace('Unit ', '')}` : '#Unknown',
    week: week || '1 of 2',
    specialText: specialText || '',
    videoCount: `${videos.length} Video${videos.length !== 1 ? 's' : ''}:`,
    welcomeText: welcomeText || 'Welcome to this week\'s content!',
    videos
  }
}

/**
 * Determines video type based on title and subtitle
 */
function getVideoType(title: string, subtitle: string): VideoData['type'] {
  const titleLower = title.toLowerCase()
  const subtitleLower = subtitle.toLowerCase()
  
  if (titleLower.includes('practice experiment') || titleLower.includes('experiment')) {
    return 'experiment'
  }
  if (subtitleLower.includes('tips') || subtitleLower.includes('analysis')) {
    return 'analysis'
  }
  if (titleLower.includes('bonus') || subtitleLower.includes('bonus')) {
    return 'bonus'
  }
  if (titleLower.includes('unit') && titleLower.includes('review')) {
    return 'review'
  }
  return 'practice'
}

/**
 * Gets the current week number based on start date and Saturday releases
 * @param startDate - Course start date
 * @param pauseWeeks - Array of week numbers to pause/skip
 * @returns Current week number (1-53) or null if course hasn't started
 */
export function getCurrentWeekNumber(startDate: Date, pauseWeeks: number[] = []): number | null {
  const now = new Date()
  const timeDiff = now.getTime() - startDate.getTime()
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
  
  // Calculate weeks since start (Saturday releases)
  const weeksSinceStart = Math.floor(daysDiff / 7) + 1
  
  // Adjust for pause weeks
  let currentWeek = weeksSinceStart
  pauseWeeks.forEach(pauseWeek => {
    if (pauseWeek <= weeksSinceStart) {
      currentWeek--
    }
  })
  
  // Ensure we're within the 53-week course
  if (currentWeek < 1) return null
  if (currentWeek > 53) return 53
  
  return currentWeek
}

/**
 * Gets week data for a specific week number
 * @param csvContent - Raw CSV content
 * @param weekNumber - Week number (1-53)
 * @returns WeekData for that week
 */
export function getWeekData(csvContent: string, weekNumber: number): WeekData {
  // Week numbers map to CSV columns (1-based)
  // Week 1 = Column 2, Week 2 = Column 3, etc.
  const columnIndex = weekNumber + 1
  return parseWeekFromCSV(csvContent, columnIndex)
}


