'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack, IoChevronDown } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import YouTubeEmbed from '@/components/YouTubeEmbed';

interface VideoItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  youtubeId?: string;
  isExternal?: boolean;
  duration?: string;
  isPracticeTrack?: boolean;
  week: number;
}

// Helper function to extract YouTube ID from URL
function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function Etude11() {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const [videoOrders, setVideoOrders] = useState<{ [week: number]: string[] }>({});

  const videos: VideoItem[] = [
    // Week 2
    {
      id: "2.1",
      title: "Short Practice Track Introduction",
      subtitle: "Getting started with the short practice track",
      youtubeId: "your-video-id-here",
      week: 2
    },
    {
      id: "2.2",
      title: "Short Practice Track",
      subtitle: "Focused practice session",
      url: "https://youtu.be/vRhpjQaU_TQ",
      youtubeId: "vRhpjQaU_TQ",
      isExternal: true,
      isPracticeTrack: true,
      week: 2
    },
    // Week 1
    {
      id: "1.1",
      title: "Tips, Tricks, and Analysis",
      subtitle: "Understanding the fundamentals of Stop Bows",
      youtubeId: "your-video-id-here",
      week: 1
    },
    {
      id: "1.2",
      title: "Stop Bows Practice Guide",
      subtitle: "Step-by-step practice method",
      youtubeId: "your-video-id-here",
      week: 1
    },
    {
      id: "1.3",
      title: "Practice Track Introduction",
      subtitle: "How to use the practice track effectively",
      youtubeId: "your-video-id-here",
      week: 1
    },
    {
      id: "1.4",
      title: "Long Practice Track",
      subtitle: "Full practice session with guidance",
      url: "https://youtu.be/7P10t9_LWi0",
      youtubeId: "7P10t9_LWi0",
      isExternal: true,
      isPracticeTrack: true,
      week: 1
    },
    {
      id: "1.5",
      title: "Reference Performance",
      subtitle: "Complete performance demonstration",
      url: "https://youtu.be/jw49kUrY1K0",
      youtubeId: "jw49kUrY1K0",
      isExternal: true,
      week: 1
    }
  ];

  // Initialize video orders by week
  useEffect(() => {
    if (Object.keys(videoOrders).length === 0) {
      const orders = videos.reduce((acc, video) => {
        if (!acc[video.week]) {
          acc[video.week] = [];
        }
        acc[video.week].push(video.id);
        return acc;
      }, {} as { [week: number]: string[] });
      setVideoOrders(orders);
    }
  }, []);

  // Load watched videos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watchedVideos-etude11');
    if (saved) {
      setWatchedVideos(new Set(JSON.parse(saved)));
    }
  }, []);

  // Handle video completion
  const handleVideoComplete = (videoId: string) => {
    const newWatchedVideos = new Set(watchedVideos);
    newWatchedVideos.add(videoId);
    setWatchedVideos(newWatchedVideos);
    localStorage.setItem('watchedVideos-etude11', JSON.stringify(Array.from(newWatchedVideos)));

    const video = videos.find(v => v.id === videoId);
    if (video && !video.isPracticeTrack) {
      // Only reorder non-practice track videos
      const weekOrder = [...videoOrders[video.week]];
      const practiceTrack = weekOrder.find(id => 
        videos.find(v => v.id === id)?.isPracticeTrack
      );
      const otherVideos = weekOrder.filter(id => id !== videoId && id !== practiceTrack);
      
      // Keep practice track at top, move completed video to bottom
      const newWeekOrder = [
        practiceTrack,
        ...otherVideos,
        videoId
      ].filter(Boolean); // Remove undefined if no practice track
      
      setVideoOrders({
        ...videoOrders,
        [video.week]: newWeekOrder
      });
    }
  };

  // Sort videos by week and maintain order within weeks
  const sortedVideosByWeek = Object.entries(videoOrders).reduce((acc, [week, order]) => {
    acc[parseInt(week)] = order
      .map(id => videos.find(v => v.id === id))
      .filter((v): v is VideoItem => v !== undefined);
    return acc;
  }, {} as { [week: number]: VideoItem[] });

  // Check if week 1 is complete
  const isWeek1Complete = videos
    .filter(v => v.week === 1 && !v.isPracticeTrack)
    .every(v => watchedVideos.has(v.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      {/* Sticky header with back button and title */}
      <div className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/cello-student/pppp"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            <span className="hidden sm:inline">Back to Course</span>
          </Link>
          <div className="text-center flex-1 sm:flex-none">
            <h1 className="text-2xl font-light">Stop Bows</h1>
            <p className="text-sm text-neutral-400">Etude #11</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
        >
          <h2 className="text-xl font-light mb-4">Introduction & Materials</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-neutral-300 mb-4">
                Master the fundamental technique of Stop Bows to establish precise control 
                over bow placement and movement.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="/pdfs/etude-11.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                  transition-colors rounded-lg text-white font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
                Download Score
              </a>
            </div>
          </div>
        </motion.div>

        {/* Video Sections */}
        <div className="space-y-8">
          {Object.entries(sortedVideosByWeek)
            .sort(([weekA], [weekB]) => parseInt(weekB) - parseInt(weekA))
            .map(([week, weekVideos]) => {
              const weekNum = parseInt(week);
              const isWeekLocked = weekNum > 1 && !isWeek1Complete;
              const weekProgress = weekVideos.filter(v => !v.isPracticeTrack)
                .filter(v => watchedVideos.has(v.id)).length;
              const totalVideos = weekVideos.filter(v => !v.isPracticeTrack).length;

              return (
                <motion.div
                  key={week}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-light flex items-center gap-3">
                      Week {week}
                      {isWeekLocked ? (
                        <span className="text-sm px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
                          🔒 Complete Week 1 to unlock
                        </span>
                      ) : (
                        <span className="text-sm px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                          {weekProgress}/{totalVideos} completed
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {(!isWeekLocked ? weekVideos : []).map((video) => (
                      <motion.div
                        key={video.id}
                        layout
                        className={`bg-white/5 rounded-lg overflow-hidden border border-transparent
                          ${video.isPracticeTrack ? 'border-blue-500/30 shadow-lg shadow-blue-500/10' : ''}
                          ${watchedVideos.has(video.id) ? 'border-green-500/30' : ''}`}
                      >
                        <motion.button
                          onClick={() => setExpandedVideo(expandedVideo === video.id ? null : video.id)}
                          className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 
                            transition-all gap-4"
                        >
                          <div className="flex items-start gap-4">
                            {watchedVideos.has(video.id) ? (
                              <BsCheckCircleFill className="text-green-500 text-xl flex-shrink-0 mt-1" />
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-neutral-500 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-1 text-left">
                              <h4 className="text-lg font-light mb-1 flex flex-wrap items-center gap-2">
                                {video.title}
                                {video.isPracticeTrack && (
                                  <span className="text-sm px-2 py-0.5 bg-blue-500/20 text-blue-300 
                                    rounded-full whitespace-nowrap">
                                    Practice Track
                                  </span>
                                )}
                              </h4>
                              {video.subtitle && (
                                <p className="text-sm text-neutral-400">{video.subtitle}</p>
                              )}
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedVideo === video.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IoChevronDown className="text-xl text-neutral-400" />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {expandedVideo === video.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              onAnimationComplete={() => {
                                if (!watchedVideos.has(video.id)) {
                                  handleVideoComplete(video.id);
                                }
                              }}
                            >
                              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                <YouTubeEmbed videoId={video.youtubeId} title={video.title} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
} 