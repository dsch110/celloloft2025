// PPPP Course Structure - 53 Weeks
// Each week covers specific etudes and techniques as provided

export interface PPPPWeekData {
  weekNumber: number
  title: string
  subtitle: string
  etudeNumbers?: number[] // For weeks with multiple etudes
  isUnitReview?: boolean
}

export const PPPP_COURSE_STRUCTURE: PPPPWeekData[] = [
  {
    weekNumber: 1,
    title: "Etude no. 11",
    subtitle: "Stop Bows"
  },
  {
    weekNumber: 2,
    title: "Etude no. 11 & no. 16",
    subtitle: "Stop Bows & Marking the Score with Colors"
  },
  {
    weekNumber: 3,
    title: "Etude no. 16 & no. 1",
    subtitle: "Marking the Score with Colors & Set Shift Practice using Colors"
  },
  {
    weekNumber: 4,
    title: "Etude no. 1 & no. 38",
    subtitle: "Set Shift Practice using Colors & Systematizing Relative Shifts"
  },
  {
    weekNumber: 5,
    title: "Unit 1 Review",
    subtitle: "Drishti for Performance Anxiety"
  },
  {
    weekNumber: 6,
    title: "Etude no. 34",
    subtitle: "Stop Bows for Double Stops"
  },
  {
    weekNumber: 7,
    title: "Etude no. 17",
    subtitle: "Harmonics for Double Stops"
  },
  {
    weekNumber: 8,
    title: "Etude no. 25",
    subtitle: "Adding Double Stops to Solidify Intonation"
  },
  {
    weekNumber: 9,
    title: "Etude no. 5",
    subtitle: "Hot to Make Your Own Practice Plan"
  },
  {
    weekNumber: 10,
    title: "Unit 2 Review",
    subtitle: "Drishti using Metronomes"
  },
  {
    weekNumber: 11,
    title: "Etude no. 14",
    subtitle: "Feeling Ahead to the Next Motor Response"
  },
  {
    weekNumber: 12,
    title: "Etude no. 32",
    subtitle: "Roller Coasters for Phrasing"
  },
  {
    weekNumber: 13,
    title: "Etude no. 3",
    subtitle: "Burst Practice by Slur"
  },
  {
    weekNumber: 14,
    title: "Etude no. 10",
    subtitle: "Roller Coasters with Doubled Bows"
  },
  {
    weekNumber: 15,
    title: "Unit 3 Review",
    subtitle: "Drishti using Bursts"
  },
  {
    weekNumber: 16,
    title: "Etude no. 2",
    subtitle: "Burst Practice for String Crossings"
  },
  {
    weekNumber: 17,
    title: "Etude no. 8",
    subtitle: "Practicing in Non-Linear Order"
  },
  {
    weekNumber: 18,
    title: "Etude no. 23",
    subtitle: "Singing"
  },
  {
    weekNumber: 19,
    title: "Etude no. 21",
    subtitle: "Triangle Visualization #1"
  },
  {
    weekNumber: 20,
    title: "Unit 4 Review",
    subtitle: "Drishti using Fuzzy Focus (and Triangle Visualization #2)"
  },
  {
    weekNumber: 21,
    title: "Etude no. 40",
    subtitle: "Simplify to the Complex"
  },
  {
    weekNumber: 22,
    title: "Etude no. 19",
    subtitle: "Burst Practice by Offsetting Groups"
  },
  {
    weekNumber: 23,
    title: "Etude no. 6",
    subtitle: "Memorize for LH work"
  },
  {
    weekNumber: 24,
    title: "Etude no. 28",
    subtitle: "Compartmentalize to Memorize"
  },
  {
    weekNumber: 25,
    title: "Unit 5 Review",
    subtitle: "Drishti using Memorization and Mirror"
  },
  {
    weekNumber: 26,
    title: "Etude no. 15",
    subtitle: "Drones and Ninjas"
  },
  {
    weekNumber: 27,
    title: "Etude no. 27",
    subtitle: "Isolating Shifts from Fingers"
  },
  {
    weekNumber: 28,
    title: "Etude no. 7",
    subtitle: "Drone Practice Integration"
  },
  {
    weekNumber: 29,
    title: "Etude no. 18",
    subtitle: "Grouping by Drones"
  },
  {
    weekNumber: 30,
    title: "Unit 6 Review",
    subtitle: "Drishti using Drones"
  },
  {
    weekNumber: 31,
    title: "Etude no. 12",
    subtitle: "Isolating Zones in Thumb Position"
  },
  {
    weekNumber: 32,
    title: "Etude no. 4",
    subtitle: "Using a Tuner Correctly - the PAL Method"
  },
  {
    weekNumber: 33,
    title: "Etude no. 31",
    subtitle: "Codifying & Systematizing Vibrato"
  },
  {
    weekNumber: 34,
    title: "Etude no. 9",
    subtitle: "Vibrato Integration"
  },
  {
    weekNumber: 35,
    title: "Unit 7 Review",
    subtitle: "Drishti using Tuners"
  },
  {
    weekNumber: 36,
    title: "Etude no. 20",
    subtitle: "Systematizing how to Phrase"
  },
  {
    weekNumber: 37,
    title: "Etude no. 37",
    subtitle: "Offbeat Practice for LH and RH"
  },
  {
    weekNumber: 38,
    title: "Etude no. 30",
    subtitle: "Practice when the LH or RH Leads Timing"
  },
  {
    weekNumber: 39,
    title: "Etude no. 36",
    subtitle: "Showpiece Study I"
  },
  {
    weekNumber: 40,
    title: "Unit 8 Review",
    subtitle: "Drishti and Triangle Visualization #3"
  },
  {
    weekNumber: 41,
    title: "Etude no. 33",
    subtitle: "Zones 2 and Offset Timing"
  },
  {
    weekNumber: 42,
    title: "Etude no. 35",
    subtitle: "Coloring by Thumb Zones"
  },
  {
    weekNumber: 43,
    title: "Etude no. 26",
    subtitle: "Practicing in Rhythmic Loops"
  },
  {
    weekNumber: 44,
    title: "Etude no. 39",
    subtitle: "Practicing Architecture after Practicing in Isolation"
  },
  {
    weekNumber: 45,
    title: "Unit 9 Review",
    subtitle: "Drishti within Showmanship"
  },
  {
    weekNumber: 46,
    title: "Etude no. 24",
    subtitle: "Review of Roller Coasters and Timing"
  },
  {
    weekNumber: 47,
    title: "Etude no. 29",
    subtitle: "Review of Phrasing and Vibrato"
  },
  {
    weekNumber: 48,
    title: "Etude no. 13",
    subtitle: "Review of Isolation and Architecture"
  },
  {
    weekNumber: 49,
    title: "Etude no. 22",
    subtitle: "Showpiece Study II"
  },
  {
    weekNumber: 50,
    title: "Unit 10 Review",
    subtitle: "Mastering Performance Practice"
  },
  {
    weekNumber: 51,
    title: "Stop Bows",
    subtitle: "Review and Integration"
  },
  {
    weekNumber: 52,
    title: "Marking the Score with Colors",
    subtitle: "Review and Integration"
  },
  {
    weekNumber: 53,
    title: "Set Shift Practice using Colors",
    subtitle: "Systematizing Relative Shifts"
  }
]

// Helper functions
export const getWeekByNumber = (weekNumber: number): PPPPWeekData | undefined => {
  return PPPP_COURSE_STRUCTURE.find(week => week.weekNumber === weekNumber)
}

export const getTotalWeeks = (): number => {
  return PPPP_COURSE_STRUCTURE.length
}

export const isUnitReview = (weekNumber: number): boolean => {
  const week = getWeekByNumber(weekNumber)
  return week?.title.includes('Unit') && week?.title.includes('Review') || false
} 