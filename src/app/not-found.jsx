"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const [errorId, setErrorId] = useState("");

  useEffect(() => {
    setErrorId(Math.random().toString(36).substr(2, 9));

    if (error) {
      console.error(error);
    }

    // Floating icon animation
    gsap.to(iconRef.current, {
      y: -25,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, [error]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* BLUR BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1505685296765-3a2736de412f)",
        }}
      />
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 bg-white/30 rounded-full absolute`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* CONTENT CARD */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-12 text-center max-w-lg"
      >
        {/* ERROR ICON */}
        <div ref={iconRef} className="mb-8 flex justify-center relative">
          <AlertCircle className="h-24 w-24 text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse" />
          <div className="absolute w-32 h-32 bg-red-500/20 blur-3xl rounded-full -z-10 animate-ping"></div>
        </div>

        {/* TITLE */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black mb-4 tracking-tight"
        >
          SYSTEM ERROR
        </motion.h1>

        {/* MESSAGE */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 mb-10"
        >
          Something broke in the matrix. Our AI engineers are fixing it.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-lg transition-transform"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>

          <Link href="/">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 hover:scale-105 hover:shadow-lg transition-all">
              <Home className="w-5 h-5" />
              Go Home
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ERROR ID */}
      <div className="absolute bottom-8 text-xs font-mono text-gray-400 tracking-widest">
        Error ID: {errorId || "LOADING..."}
      </div>

      {/* Floating particle animation keyframes */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0) translateX(-5px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}