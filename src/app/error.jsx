"use client";

import { BiSolidErrorAlt } from "react-icons/bi";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">

      {/* Logo */}
  
<h1 className="text-4xl font-bold text-pink-800">MovieMatrix</h1>
      {/* Error Icon */}
      <BiSolidErrorAlt size={80} className="text-red-500 animate-pulse" />

      {/* Text */}
      <h2 className="text-3xl font-bold">Oops! Something went wrong</h2>

      <p className="text-gray-500 text-center max-w-md">
        Sorry, an unexpected error occurred. Please try again.
      </p>

      {/* Reload Button */}
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Try Again
      </button>

    </div>
  );
}
