"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firbase";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await confirmPasswordReset(auth, oobCode, password);

      setMessage("✅ Password successfully updated!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6">

      
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Lock className="w-6 h-6 text-indigo-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Reset Your Password
          </h1>

          <p className="text-gray-500 text-sm">
            Enter new password to secure your account
          </p>
        </div>

        
        <form onSubmit={handleReset} className="space-y-4">

          
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none pr-10"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

      
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

      
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

      </div>
    </div>
  );
}