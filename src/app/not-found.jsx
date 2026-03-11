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

    // GSAP: Floating animation for the icon
    gsap.to(iconRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // GSAP: Subtle background pulse
    gsap.to(containerRef.current, {
      backgroundColor: "#0f172a", // slate-900
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [error]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-slate-100 p-6 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        {/* Icon with GSAP Ref */}
        <div ref={iconRef} className="mb-8 relative">
          <AlertCircle className="h-24 w-24 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 bg-red-500 blur-3xl opacity-20 -z-10"
          />
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black mb-4 tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
        >
          SYSTEM ERROR
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 text-slate-400 text-lg leading-relaxed"
        >
          Something broke in the matrix. We've logged the incident and our
          engineers are on it.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => reset()}
            className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link href="/">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white font-bold rounded-full border border-slate-700 hover:bg-slate-700 transition-all">
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-xs font-mono text-slate-600 uppercase tracking-widest"
      >
        Error ID: {errorId || "LOADING..."}
      </motion.div>
    </div>
  );
}