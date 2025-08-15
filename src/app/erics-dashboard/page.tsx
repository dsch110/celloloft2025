'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RevenueData {
  month: string;
  popper: number;
  cellosophy: number;
}

interface PayoutData {
  month: string;
  copyrights: number;
  popperReferral: number;
  cellosophyUncertified: number;
  cellosophyCertified: number;
}

interface CohortSettings {
  id: string;
  name: string;
  masterclassTime: string;
  autoUploadDay: string;
  autoUploadTime: string;
  nextManualUpload: string;
  autoUploadEnabled: boolean;
}

interface StudentStats {
  totalStudents: number;
  newLastWeek: number;
  lastUpdated: string;
}

export default function EricsDashboard() {
  // Sample data - replace with real data from your backend
  const [revenueData] = useState<RevenueData[]>([
    {
      month: '2024-02',
      popper: 2500,
      cellosophy: 3500,
    },
    // Add more months...
  ]);

  const [payoutData] = useState<PayoutData[]>([
    {
      month: '2024-02',
      copyrights: 500,
      popperReferral: 250,
      cellosophyUncertified: 1000,
      cellosophyCertified: 1500,
    },
    // Add more months...
  ]);

  const [studentStats] = useState<StudentStats>({
    totalStudents: 156,
    newLastWeek: 12,
    lastUpdated: '2024-02-20T09:00:00Z'
  });

  const [cohorts, setCohorts] = useState<CohortSettings[]>([
    {
      id: 'cohort-1',
      name: 'Spring 2024',
      masterclassTime: '2024-02-20T18:00',
      autoUploadDay: 'Monday',
      autoUploadTime: '09:00',
      nextManualUpload: '2024-02-27',
      autoUploadEnabled: true,
    },
    // Add more cohorts...
  ]);

  const [zoomLink] = useState('https://zoom.us/j/your-meeting-id');

  const toggleAutoUpload = (cohortId: string) => {
    setCohorts(cohorts.map(cohort => 
      cohort.id === cohortId 
        ? { ...cohort, autoUploadEnabled: !cohort.autoUploadEnabled }
        : cohort
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-light">Eric's Dashboard</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              Refresh Data
            </button>
          </div>
        </div>

        {/* Student Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-light mb-4">Student Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-neutral-400 mb-1">Total Cellosophy Students</div>
              <div className="text-3xl font-light text-blue-400">
                {studentStats.totalStudents}
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-neutral-400 mb-1">New Students (Last 7 Days)</div>
              <div className="text-3xl font-light text-green-400">
                +{studentStats.newLastWeek}
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-neutral-400">
            Last updated: {new Date(studentStats.lastUpdated).toLocaleString()}
          </div>
        </motion.div>

        {/* Revenue and Payouts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Revenue Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <h2 className="text-xl font-light mb-4">Monthly Revenue</h2>
            <div className="space-y-4">
              {revenueData.map((data) => (
                <div key={data.month} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-400">
                      {new Date(data.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-green-400 font-medium">
                      ${(data.popper + data.cellosophy).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Popper</span>
                      <span>${data.popper.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cellosophy</span>
                      <span>${data.cellosophy.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly Payouts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <h2 className="text-xl font-light mb-4">Monthly Payouts</h2>
            <div className="space-y-4">
              {payoutData.map((data) => (
                <div key={data.month} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-400">
                      {new Date(data.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-blue-400 font-medium">
                      ${(
                        data.copyrights +
                        data.popperReferral +
                        data.cellosophyUncertified +
                        data.cellosophyCertified
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Copyrights</span>
                      <span>${data.copyrights.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Popper Referral</span>
                      <span>${data.popperReferral.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cellosophy (Uncertified)</span>
                      <span>${data.cellosophyUncertified.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cellosophy (Certified)</span>
                      <span>${data.cellosophyCertified.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Zoom Link Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-light mb-4">Zoom Link</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={zoomLink}
              readOnly
              className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white"
            />
            <button
              onClick={() => navigator.clipboard.writeText(zoomLink)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Copy
            </button>
          </div>
        </motion.div>

        {/* Cohorts Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light">Cohorts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cohorts.map((cohort) => (
              <motion.div
                key={cohort.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-lg p-6"
              >
                <h3 className="text-xl font-light mb-4">{cohort.name}</h3>
                <div className="space-y-4">
                  {/* Masterclass Time */}
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                      Masterclass Time
                    </label>
                    <input
                      type="datetime-local"
                      value={cohort.masterclassTime}
                      onChange={() => {}}
                      className="w-full bg-white/5 rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  {/* Auto Upload Settings */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-neutral-400">
                        Auto Upload Schedule
                      </label>
                      <button
                        onClick={() => toggleAutoUpload(cohort.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none ${
                          cohort.autoUploadEnabled ? 'bg-blue-500' : 'bg-neutral-700'
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            cohort.autoUploadEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <div className={`flex gap-4 transition-opacity ${cohort.autoUploadEnabled ? 'opacity-100' : 'opacity-50'}`}>
                      <select
                        value={cohort.autoUploadDay}
                        onChange={() => {}}
                        disabled={!cohort.autoUploadEnabled}
                        className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white"
                      >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                      </select>
                      <input
                        type="time"
                        value={cohort.autoUploadTime}
                        onChange={() => {}}
                        disabled={!cohort.autoUploadEnabled}
                        className="bg-white/5 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                  </div>

                  {/* Manual Upload */}
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                      Next Manual Upload
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="date"
                        value={cohort.nextManualUpload}
                        onChange={() => {}}
                        className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white"
                      />
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                        Upload Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 