"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow 'guest' for testing
    if (email === "guest" && password === "guest") {
      router.push("/cellosophy-student-dashboard");
    } else {
      setError("Invalid credentials. Use 'guest' for testing.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-light mb-6 text-center">Login</h1>
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
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition mb-2">Login</button>
        <p className="text-center text-neutral-400 text-sm">
          Don&apos;t have an account? <a href="/signup" className="text-blue-400 underline">Sign up</a>
        </p>
      </form>
    </div>
  );
} 