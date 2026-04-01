"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = ({ className, iconSize = 40, showText = true, textSize = "text-2xl" }) => {
  return (
    <div className={cn("flex items-center gap-4 group cursor-pointer", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse group-hover:bg-primary/40 transition-all duration-700" />

        <div className="relative z-10 p-1 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/5">
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110"
          >
            <circle cx="50" cy="50" r="48" fill="url(#logo-grad)" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" className="text-primary" />
            <path d="M20 20H80V80H20V20Z" stroke="currentColor" strokeWidth="0.2" strokeOpacity="0.1" className="text-primary" />

            <path
              d="M25 75V25L50 50L75 25V75"
              stroke="url(#m-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]"
            />

            <circle cx="50" cy="50" r="4" fill="white" className="animate-ping" style={{ animationDuration: '3s' }} />

            <defs>
              <linearGradient id="m-gradient" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E50914" />
                <stop offset="0.5" stopColor="#FF4D4D" />
                <stop offset="1" stopColor="#B20710" />
              </linearGradient>
              <radialGradient id="logo-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(50)">
                <stop stopColor="#E50914" />
                <stop offset="1" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white blur-xl rounded-full opacity-0 group-hover:opacity-40 group-hover:translate-x-6 group-hover:-translate-y-6 transition-all duration-1000" />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <h2 className={cn("font-[1000] tracking-[-0.05em] text-white uppercase transition-all duration-500 group-hover:tracking-[0.05em]", textSize)}>
            MOVIE
            <span className="bg-gradient-to-r from-primary via-red-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              MATRIX
            </span>
          </h2>
          <span className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] uppercase mt-1 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all duration-500">
            Digital Cinema
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Logo;
