"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return oldProgress + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center animate-fadeIn">

        {/* Logo */}
        <div className="relative flex items-center justify-center">

          <div className="absolute w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

          <h1 className="text-6xl font-extrabold tracking-widest animate-[pulse_3s_infinite]">

            <span className="text-white">Movie</span>

            <span className="text-red-500 drop-shadow-[0_0_10px_red]">
              Matrix
            </span>

          </h1>

        </div>

        {/* AI Text */}
        <p className="mt-6 text-lg text-gray-200 animate-pulse">
          AI is analyzing your cinematic experience...
        </p>

        {/* Progress Bar */}
        <div className="w-80 h-3 bg-white/20 rounded-full mt-8 overflow-hidden backdrop-blur-sm">

          <div
            className="h-full bg-gradient-to-r from-red-500 via-red-400 to-red-600 shadow-[0_0_15px_red] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />

        </div>

        <p className="mt-2 text-sm text-gray-200">{progress}%</p>

      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="w-2 h-2 bg-red-400 rounded-full absolute top-10 left-10 animate-bounce"></div>

        <div className="w-3 h-3 bg-red-300 rounded-full absolute bottom-20 right-20 animate-ping"></div>

        <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1/3 right-1/4 animate-pulse"></div>

      </div>

    </div>
  );
}