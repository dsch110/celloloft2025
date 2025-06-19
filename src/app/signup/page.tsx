"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [plan, setPlan] = useState("monthly");
  const [card, setCard] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Pricing logic
  const hasReferral = referral.trim().toLowerCase() === "guest";
  const isMonthly = plan === "monthly";
  const isYearly = plan === "yearly";
  const fullPrice = isMonthly ? 99 : 999;
  const discountPrice = isMonthly ? 39 : 399;
  const price = hasReferral ? discountPrice : fullPrice;
  const showFree = hasReferral;
  // Calculate yearly save percent: 1 - (399/(39*12)) = ~0.1487 = 15%
  const yearlySavePercent = 15;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow 'guest' for all fields and 4242... for card
    if (
      name === "guest" &&
      email === "guest" &&
      password === "guest" &&
      (card === "4242 4242 4242 4242" || card === "4242424242424242")
    ) {
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => router.push("/cellosophy-student-dashboard"), 1200);
    } else {
      setError("For testing, use 'guest' for all fields and 4242 4242 4242 4242 for card.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <form onSubmit={handleSignup} className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-light mb-6 text-center">Sign Up for Cellosophy</h1>
        <div className="mb-4 flex flex-col items-center gap-1">
          <div className="flex gap-2">
            <button type="button" className={`px-4 py-2 rounded ${isMonthly ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-neutral-300'}`} onClick={() => setPlan('monthly')}>Monthly</button>
            <div className="flex flex-col items-center">
              <button type="button" className={`px-4 py-2 rounded flex items-center gap-2 ${isYearly ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-neutral-300'}`} onClick={() => setPlan('yearly')}>
                Yearly
                <span className="ml-2 bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-0.5 rounded">Save {yearlySavePercent}%</span>
              </button>
            
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white border border-white/20"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white border border-white/20"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white border border-white/20"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Referral Code (ask your teacher!)"
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white border border-blue-400"
          value={referral}
          onChange={e => setReferral(e.target.value)}
        />
        <div className="mb-4 text-center">
          {hasReferral ? (
            <>
              <div className="text-3xl font-bold text-green-400 mb-1">
                ${discountPrice}
                <span className="text-lg text-neutral-400 font-normal ml-2 line-through">${fullPrice}</span>
              </div>
              <div className="text-green-400 font-bold">First Month Free!</div>
              <div className="text-neutral-300 text-sm mt-1">
                Then ${discountPrice}, billed {isMonthly ? 'monthly' : 'yearly'}.
              </div>
            </>
          ) : (
            <div className="text-3xl font-bold mb-1">${fullPrice}<span className="text-lg text-neutral-400 font-normal ml-2">{isMonthly ? '/mo' : ' one-time'}</span></div>
          )}
        </div>
        <input
          type="text"
          placeholder="Card Number (4242 4242 4242 4242)"
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white border border-white/20"
          value={card}
          onChange={e => setCard(e.target.value)}
        />
        <div className="text-neutral-400 text-xs mb-4 text-center">
          {showFree ? 'You will not be charged today. Your card will be charged in 30 days.' : 'You will be charged immediately.'}
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4">{success}</p>}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition mb-2">Sign Up</button>
        <p className="text-center text-neutral-400 text-sm">
          Already have an account? <a href="/login" className="text-blue-400 underline">Login</a>
        </p>
      </form>
    </div>
  );
} 