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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-black flex flex-col items-center justify-center text-white overflow-hidden">

    
      <div className="relative flex items-center justify-center">

        <div className="absolute w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        <h1 className="text-5xl font-bold tracking-widest z-10">
          Movie<span className="text-blue-400">Matrix</span>
        </h1>
      </div>

      {/* AI Scanning Text */}
      <p className="mt-6 text-lg text-blue-300 animate-pulse">
        AI is analyzing your cinematic experience...
      </p>

      {/* Progress Bar */}
      <div className="w-80 h-3 bg-blue-800 rounded-full mt-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-200 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-blue-400">{progress}%</p>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-10 left-10 animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-300 rounded-full absolute bottom-20 right-20 animate-ping"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/3 right-1/4 animate-pulse"></div>
      </div>

    </div>
  );
};