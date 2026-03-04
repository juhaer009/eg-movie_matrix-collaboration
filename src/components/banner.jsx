"use client";

import React from "react";
import Image from "next/image";
import banner from "../../public/banner.jpg";

const Banner = () => {
  return (
    <section className="relative w-full h-[95vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <Image
          src={banner}
          alt="Movie Background"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20"></div>
      </div>

      {/* Floating Glassmorphic Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Content with Glassmorphism */}
      <div className="relative z-20 px-6 max-w-5xl">
        {/* Glassmorphic Card */}
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl hover:bg-white/10 transition-all duration-500">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl">
            <span className="text-sm font-semibold text-purple-300 tracking-wider">✨ PREMIUM STREAMING</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Unlimited Movies,
            <br />
            TV Shows & More
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-200 font-light">
            Stream anywhere. Cancel anytime.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 text-purple-300">
            <span className="text-3xl font-bold">$2.99</span>
            <span className="text-sm opacity-70">/ month</span>
          </div>

          {/* CTA Button with Glossy Effect */}
          <button className="group mt-10 px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white text-lg font-bold rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative flex items-center gap-3">
              Get Started Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glossy Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px]">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0.3)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M0,60 C300,100 600,20 900,60 L900,120 L0,120 Z" fill="url(#wave-gradient)" filter="url(#glow)" opacity="0.6" />
          <path d="M0,80 C300,40 600,100 900,80 L900,120 L0,120 Z" fill="#000" />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
