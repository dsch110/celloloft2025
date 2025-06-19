'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Cello Courses</span>
            </Link>
            <Link href="/cello-sheet-music" className="ml-6 text-lg font-medium text-neutral-200 hover:text-white transition">Sheet Music</Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => router.push('/cello-student-dashboard')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 