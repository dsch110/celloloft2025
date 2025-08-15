'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function ClerkSignup() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  
  const getPlanTitle = () => {
    if (plan === 'with-teacher') return "Cellosophy with Teacher"
    if (plan === 'self-study') return "Cellosophy Self-Study"
    return "Cellosophy"
  }

  const getPlanDescription = () => {
    if (plan === 'with-teacher') return "Personal guidance from a certified teacher"
    if (plan === 'self-study') return "Learn at your own pace"
    return "Choose your learning path"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Sign Up for {getPlanTitle()}</h1>
          <p className="text-neutral-300">{getPlanDescription()}</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl",
              headerTitle: "text-white",
              headerSubtitle: "text-neutral-300",
              socialButtonsBlockButton: "bg-white/20 border-white/30 text-white hover:bg-white/30",
              formFieldInput: "bg-white/20 border-white/30 text-white placeholder:text-neutral-400",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              footerActionLink: "text-blue-400 hover:text-blue-300",
            }
          }}
          redirectUrl={`/signup/payment?plan=${plan || 'self-study'}`}
        />
      </div>
    </div>
  )
}
