"use client";

import React from "react";

const ReasonsToJoin = () => {
  const reasons = [
    {
      title: "Enjoy on your TV",
      description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      icon: "📺",
      gradient: "from-purple-600/20 to-blue-600/20",
      borderGradient: "from-purple-500/50 to-blue-500/50",
    },
    {
      title: "Download your shows to watch offline",
      description: "Save your favorites easily and always have something to watch.",
      icon: "📥",
      gradient: "from-pink-600/20 to-rose-600/20",
      borderGradient: "from-pink-500/50 to-rose-500/50",
    },
    {
      title: "Watch everywhere",
      description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      icon: "📱",
      gradient: "from-violet-600/20 to-purple-600/20",
      borderGradient: "from-violet-500/50 to-purple-500/50",
    },
    {
      title: "Create profiles for kids",
      description: "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      icon: "👦",
      gradient: "from-fuchsia-600/20 to-pink-600/20",
      borderGradient: "from-fuchsia-500/50 to-pink-500/50",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl">
            <span className="text-sm font-semibold text-purple-300 tracking-wider">WHY CHOOSE US</span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-black mb-4">
            More Reasons to Join
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience entertainment without limits across all your devices
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative min-h-[320px] p-8 rounded-3xl backdrop-blur-xl bg-white/5 
                         flex flex-col justify-between border border-white/10
                         transition-all duration-500 ease-out 
                         hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)] 
                         hover:border-white/20 cursor-pointer overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Glossy Border Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.borderGradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                      {reason.icon}
                    </span>
                  </div>
                </div>

                <h3 className="text-white text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                  {reason.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {reason.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="relative z-10 flex justify-end mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-45">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsToJoin;