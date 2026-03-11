"use client";

import { useEffect, useState } from "react";

export default function MoviesLoading() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-black flex flex-col items-center justify-center text-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <h1 className="text-4xl font-bold tracking-widest z-10">
          Loading Movies...
        </h1>
      </div>

      <p className="mt-6 text-lg text-blue-300 animate-pulse">
        Fetching the latest collection for you
      </p>

      <div className="w-80 h-3 bg-blue-800 rounded-full mt-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-200 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-blue-400">{progress}%</p>

      {/* Movie Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-blue-900/30 rounded-lg h-64 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
