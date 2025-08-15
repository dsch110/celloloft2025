'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  note?: string;
}

export default function NewsletterForm({ note }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setIsLoading(true)
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setMessage(data.message || 'Subscription successful!');
      setEmail('');

    } catch (error: any) {
      setMessage(error.message || 'Subscription failed. Please try again later.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center my-24 py-16 bg-neutral-800/40 rounded-2xl border border-neutral-700/50">
      <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">Become a Cellosopher</h2>
      <p className="text-neutral-300 mb-6 max-w-lg mx-auto">
        Get free practice tips, exclusive sheet music, and course updates delivered to your inbox.
      </p>
      {note && (
        <p className="text-yellow-400 bg-yellow-900/30 border border-yellow-700/50 rounded-md p-3 max-w-lg mx-auto mb-6 text-sm">
          {note}
        </p>
      )}
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow px-4 py-2 rounded-md bg-neutral-700/50 border border-neutral-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-neutral-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-neutral-400">{message}</p>}
    </div>
  )
} 