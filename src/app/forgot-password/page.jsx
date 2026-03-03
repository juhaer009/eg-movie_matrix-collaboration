
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  setError("");

  try {
    const res = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
    } else {
      setMessage(data.message);
      setEmail("");
    }
  } catch (err) {
    setError("Cannot connect to server");
  }

  setLoading(false);
};
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      
      {/* 🔹 Left Side Image */}
      <div className="hidden md:flex items-center justify-center bg-indigo-950 p-10">
        <Image
          src="/forgot-password.webp"
          alt="Forgot Password Illustration"
          width={500}
          height={500}
          className="rounded-2xl shadow-2xl object-contain"
        />
      </div>

      {/* 🔹 Right Side Form */}
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <Link
            href="/login"
            className="inline-flex items-center text-slate-600 mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>

          <h1 className="text-2xl font-semibold mb-2">Forgot Password</h1>
          <p className="text-slate-600 mb-6">
            Enter your email to receive reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Sending..." : "Send Instructions"}
            </button>
          </form>

          {message && (
            <p className="text-green-600 text-sm mt-4">{message}</p>
          )}

          {error && (
            <p className="text-red-600 text-sm mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}