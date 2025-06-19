"use client"

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock data
const students = [
  {
    id: 1,
    name: "Hermione Granger",
    avatar: "/images/students/hermione.jpg",
    certifiedVolumes: [1, 2],
    progress: 85,
    referralCode: "HERMIONE123",
  },
  {
    id: 2,
    name: "Harry Potter",
    avatar: "/images/students/harry.jpg",
    certifiedVolumes: [1],
    progress: 60,
    referralCode: "HARRY456",
  },
  {
    id: 3,
    name: "Ron Weasley",
    avatar: "/images/students/ron.jpg",
    certifiedVolumes: [],
    progress: 30,
    referralCode: "RON789",
  },
];

const upcomingPayout = {
  amount: "$320.00",
  date: "2024-07-15",
};

const nextMastermind = {
  date: "2024-07-20",
  time: "5:00 PM EST",
  link: "#",
};

const recentAchievements = [
  { student: "Hermione Granger", achievement: "Certified in Volume 2!" },
  { student: "Harry Potter", achievement: "Completed 60% of Volume 1!" },
];

// Mock: students needing certification review
const certificationQueue = [
  { id: 1, name: "Hermione Granger", progress: 95, volume: 2 },
  { id: 2, name: "Ron Weasley", progress: 85, volume: 1 },
];

// Add mock teacher certification course data
const teacherCourse = {
  title: "Cellosophy Teacher Certification",
  progress: 60, // percent
  modules: [
    { id: 1, title: "Welcome & Orientation", completed: true },
    { id: 2, title: "Teaching Philosophy", completed: true },
    { id: 3, title: "Curriculum Overview", completed: true },
    { id: 4, title: "Lesson Planning", completed: false },
    { id: 5, title: "Assessment & Certification", completed: false },
  ],
};

export default function TeacherDashboard() {
  const [message, setMessage] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [policiesFile, setPoliciesFile] = useState<File | null>(null);
  const [studioClassTime, setStudioClassTime] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New student referral code (mock)
  const newStudentReferral = "JOINCELLO2024";

  const handleSendReferral = (studentName: string, code: string) => {
    setMessage(`Referral code for ${studentName} copied: ${code}`);
    navigator.clipboard.writeText(code);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white px-8 pt-24 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-light mb-4">Teacher Dashboard</h1>
        <p className="text-xl text-neutral-300">Welcome back! Here's your teaching overview.</p>
      </div>

      {/* Referral code for new students */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light mb-2">Invite New Students</h2>
          <p className="text-neutral-300 mb-2">Share your referral code to invite new students:</p>
          <div className="flex items-center gap-2">
            <span className="bg-white/10 px-3 py-1 rounded text-lg font-mono">{newStudentReferral}</span>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded shadow transition"
              onClick={() => {navigator.clipboard.writeText(newStudentReferral); setMessage("Referral code copied!"); setTimeout(()=>setMessage(""),2000);}}
            >Copy</button>
          </div>
        </div>
      </div>

      {/* Payouts at the top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Upcoming Payout */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-4">Upcoming Payout</h2>
          <p className="text-3xl font-semibold mb-2">{upcomingPayout.amount}</p>
          <p className="text-neutral-400">Scheduled for {upcomingPayout.date}</p>
        </motion.div>

        {/* Next Mastermind */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-4">Next Teacher Mastermind</h2>
          <p className="text-lg mb-2">{nextMastermind.date} at {nextMastermind.time}</p>
          <a href={nextMastermind.link} className="text-blue-400 underline">Join Event</a>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-4">Recent Student Achievements</h2>
          <ul className="space-y-2">
            {recentAchievements.map((a, i) => (
              <li key={i} className="text-neutral-300">{a.student}: <span className="text-green-400">{a.achievement}</span></li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Teacher Certification Progress */}
      <div className="mb-12 bg-white/10 rounded-xl p-6">
        <h2 className="text-2xl font-light mb-4">Your Certification Progress</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-neutral-300">{teacherCourse.title}</span>
            <span className="text-blue-400 font-semibold">{teacherCourse.progress}%</span>
          </div>
          <div className="w-full bg-neutral-700 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${teacherCourse.progress}%` }}></div>
          </div>
        </div>
        <ul className="mb-4 space-y-2">
          {teacherCourse.modules.map(module => (
            <li key={module.id} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${module.completed ? 'bg-green-400' : 'bg-neutral-500'}`}></span>
              <span className={module.completed ? 'text-green-300' : 'text-neutral-300'}>{module.title}</span>
            </li>
          ))}
        </ul>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition">Continue Course</button>
      </div>

      {/* Students List */}
      <div className="bg-white/10 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-light mb-6">Your Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((student) => (
            <div key={student.id} className="flex items-center bg-white/5 rounded-lg p-4 gap-4 border border-white/10">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20">
                <Image src={student.avatar} alt={student.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{student.name}</p>
                <p className="text-neutral-400 text-sm mb-1">Certified Volumes: {student.certifiedVolumes.length > 0 ? student.certifiedVolumes.join(", ") : "None yet"}</p>
                <div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Zoom link and Policies PDF at the bottom */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 rounded-xl p-6">
          <h2 className="text-xl font-light mb-2">Studio Zoom Link</h2>
          <input
            type="text"
            className="w-full p-2 rounded bg-neutral-800 text-white border border-white/20 mb-2"
            placeholder="Paste Zoom link here"
            value={zoomLink}
            onChange={e => setZoomLink(e.target.value)}
          />
          <p className="text-neutral-400 text-xs">This link will be shown to your students.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-6">
          <h2 className="text-xl font-light mb-2">Studio Policies PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="mb-2"
            onChange={e => setPoliciesFile(e.target.files?.[0] || null)}
          />
          {policiesFile && <p className="text-green-400 text-xs">Uploaded: {policiesFile.name}</p>}
          <p className="text-neutral-400 text-xs">Upload a PDF of your studio policies for students to download.</p>
        </div>
      </div>

      {/* Notification */}
      {message && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}
    </div>
  );
} 