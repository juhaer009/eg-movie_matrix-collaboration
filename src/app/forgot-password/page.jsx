

"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AuthContext } from "@/Authcontex/AuthContext";

export default function ForgotPasswordPage() {

  const { forgotPassword } = useContext(AuthContext); 

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
      await forgotPassword(email);

      setMessage("✅ Password reset email sent. Check your inbox.");
      setEmail("");

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Side Image */}
      <div className="hidden md:flex items-center justify-center bg-indigo-950 p-10">
        <Image
          src="/forgot-password.webp"
          alt="Forgot Password Illustration"
          width={500}
          height={500}
          className="rounded-2xl shadow-2xl object-contain"
        />
      </div>

      {/* Right Side Form */}
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