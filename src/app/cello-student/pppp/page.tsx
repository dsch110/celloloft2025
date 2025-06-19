'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PopperLesson {
  id: string;
  number?: string; // For etude number
  title: string;
  description: string;
  unit: number;
  isReview?: boolean;
}

export default function PopperCourse() {
  const lessons: PopperLesson[] = [
    // Unit 10
    {
      id: "unit-10-review",
      title: "Unit 10 Review",
      description: "Mastering Performance Practice",
      unit: 10,
      isReview: true
    },
    {
      id: "22",
      number: "22",
      title: "Showpiece Study II",
      description: "",
      unit: 10
    },
    {
      id: "13",
      number: "13",
      title: "Review of Isolation and Architecture",
      description: "",
      unit: 10
    },
    {
      id: "29",
      number: "29",
      title: "Review of Phrasing and Vibrato",
      description: "",
      unit: 10
    },
    {
      id: "24",
      number: "24",
      title: "Review of Roller Coasters and Timing",
      description: "",
      unit: 10
    },

    // Unit 9
    {
      id: "unit-9-review",
      title: "Unit 9 Review",
      description: "Drishti within Showmanship",
      unit: 9,
      isReview: true
    },
    {
      id: "39",
      number: "39",
      title: "Practicing Architecture after Practicing in Isolation",
      description: "",
      unit: 9
    },
    {
      id: "26",
      number: "26",
      title: "Practicing in Rhythmic Loops",
      description: "",
      unit: 9
    },
    {
      id: "35",
      number: "35",
      title: "Coloring by Thumb Zones",
      description: "",
      unit: 9
    },
    {
      id: "33",
      number: "33",
      title: "Zones 2 and Offset Timing",
      description: "",
      unit: 9
    },

    // Unit 8
    {
      id: "unit-8-review",
      title: "Unit 8 Review",
      description: "Drishti and Triangle Visualization #3",
      unit: 8,
      isReview: true
    },
    {
      id: "36",
      number: "36",
      title: "Showpiece Study I",
      description: "",
      unit: 8
    },
    {
      id: "30",
      number: "30",
      title: "Practicing when the LH or RH Leads Timing",
      description: "",
      unit: 8
    },
    {
      id: "37",
      number: "37",
      title: "Offbeat Practice for LH and RH",
      description: "",
      unit: 8
    },
    {
      id: "20",
      number: "20",
      title: "Systematizing how to Phrase",
      description: "",
      unit: 8
    },

    // Unit 7
    {
      id: "unit-7-review",
      title: "Unit 7 Review",
      description: "Drishti using Tuners",
      unit: 7,
      isReview: true
    },
    {
      id: "9",
      number: "9",
      title: "Vibrato Integration",
      description: "",
      unit: 7
    },
    {
      id: "31",
      number: "31",
      title: "Codifying & Systematizing Vibrato",
      description: "",
      unit: 7
    },
    {
      id: "4",
      number: "4",
      title: "Using a Tuner Correctly - the PAL Method",
      description: "",
      unit: 7
    },
    {
      id: "12",
      number: "12",
      title: "Isolating Zones in Thumb Position",
      description: "",
      unit: 7
    },

    // Unit 6
    {
      id: "unit-6-review",
      title: "Unit 6 Review",
      description: "Drishti using Drones",
      unit: 6,
      isReview: true
    },
    {
      id: "18",
      number: "18",
      title: "Grouping by Drones",
      description: "",
      unit: 6
    },
    {
      id: "7",
      number: "7",
      title: "Drone Practice Integration",
      description: "",
      unit: 6
    },
    {
      id: "27",
      number: "27",
      title: "Isolating Shifts from Fingers",
      description: "",
      unit: 6
    },
    {
      id: "15",
      number: "15",
      title: "Drones and Ninjas",
      description: "",
      unit: 6
    },

    // Unit 5
    {
      id: "unit-5-review",
      title: "Unit 5 Review",
      description: "Drishti using Fuzzy Focus (and Triangle Visualization #2)",
      unit: 5,
      isReview: true
    },
    {
      id: "28",
      number: "28",
      title: "Compartmentalize to Memorize",
      description: "",
      unit: 5
    },
    {
      id: "6",
      number: "6",
      title: "Memorize for LH work",
      description: "",
      unit: 5
    },
    {
      id: "19",
      number: "19",
      title: "Burst Practice by Offsetting Groups",
      description: "",
      unit: 5
    },
    {
      id: "40",
      number: "40",
      title: "Simplify to the Complex",
      description: "",
      unit: 5
    },

    // Unit 4
    {
      id: "unit-4-review",
      title: "Unit 4 Review",
      description: "Drishti using Bursts",
      unit: 4,
      isReview: true
    },
    {
      id: "21",
      number: "21",
      title: "Triangle Visualization #1",
      description: "",
      unit: 4
    },
    {
      id: "23",
      number: "23",
      title: "Singing",
      description: "",
      unit: 4
    },
    {
      id: "8",
      number: "8",
      title: "Practicing in Non-Linear Order",
      description: "",
      unit: 4
    },
    {
      id: "2",
      number: "2",
      title: "Burst Practice for String Crossings",
      description: "",
      unit: 4
    },

    // Unit 3
    {
      id: "unit-3-review",
      title: "Unit 3 Review",
      description: "Drishti using Metronomes",
      unit: 3,
      isReview: true
    },
    {
      id: "10",
      number: "10",
      title: "Roller Coasters with Doubled Bows",
      description: "",
      unit: 3
    },
    {
      id: "3",
      number: "3",
      title: "Burst Practice by Slur",
      description: "",
      unit: 3
    },
    {
      id: "32",
      number: "32",
      title: "Roller Coasters for Phrasing",
      description: "",
      unit: 3
    },
    {
      id: "14",
      number: "14",
      title: "Feeling Ahead to the Next Motor Response",
      description: "",
      unit: 3
    },

    // Unit 2
    {
      id: "unit-2-review",
      title: "Unit 2 Review",
      description: "Drishti using Metronomes",
      unit: 2,
      isReview: true
    },
    {
      id: "5",
      number: "5",
      title: "How to Make Your Own Practice Plan",
      description: "",
      unit: 2
    },
    {
      id: "25",
      number: "25",
      title: "Adding Double Stops to Solidify Intonation",
      description: "",
      unit: 2
    },
    {
      id: "17",
      number: "17",
      title: "Harmonics for Double Stops",
      description: "",
      unit: 2
    },
    {
      id: "34",
      number: "34",
      title: "Stop Bows for Double Stops",
      description: "",
      unit: 2
    },

    // Unit 1
    {
      id: "unit-1-review",
      title: "Unit 1 Review",
      description: "Drishti for Performance Anxiety",
      unit: 1,
      isReview: true
    },
    {
      id: "38",
      number: "38",
      title: "Systematizing Relative Shifts",
      description: "",
      unit: 1
    },
    {
      id: "1",
      number: "1",
      title: "Set Shift Practice using Colors",
      description: "",
      unit: 1
    },
    {
      id: "16",
      number: "16",
      title: "Marking the Score with Colors",
      description: "",
      unit: 1
    },
    {
      id: "11",
      number: "11",
      title: "Stop Bows",
      description: "",
      unit: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-light tracking-wider mb-12">Proper Popper Practice</h1>
        
        <div className="space-y-8">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                relative p-6 rounded-lg
                ${lesson.isReview 
                  ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm' 
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all cursor-pointer'}
              `}
            >
              {!lesson.isReview ? (
                <Link href={`/cello-student/pppp/unit-${lesson.unit}/etude-${lesson.number}`}>
                  {/* Unit indicator for review lessons */}
                  {lesson.isReview && (
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        {lesson.unit}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    {lesson.number && (
                      <div className="text-3xl font-light text-blue-400 w-16 text-right">
                        #{lesson.number}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-light tracking-wide mb-1">
                        {lesson.title}
                      </h2>
                      {lesson.description && (
                        <p className="text-blue-300 text-sm">{lesson.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-6">
                  {/* Unit indicator for review lessons */}
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      {lesson.unit}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-light tracking-wide mb-1">
                      {lesson.title}
                    </h2>
                    {lesson.description && (
                      <p className="text-blue-300 text-sm">{lesson.description}</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 