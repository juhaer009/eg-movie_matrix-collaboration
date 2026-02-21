"use client";

import React from "react";

const ReasonsToJoin = () => {
  const reasons = [
    {
      title: "Enjoy on your TV",
      description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      icon: "📺",
    },
    {
      title: "Download your shows to watch offline",
      description: "Save your favorites easily and always have something to watch.",
      icon: "📥",
    },
    {
      title: "Watch everywhere",
      description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      icon: "📱",
    },
    {
      title: "Create profiles for kids",
      description: "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      icon: "👦",
    },
  ];

  return (
    <section className=" py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
          More Reasons to Join
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative min-h-[300px] p-6 rounded-2xl bg-gradient-to-br from-[#191638] to-[#0a0510] 
                         flex flex-col justify-between border border-gray-800/50 
                         transition-all duration-500 ease-out 
                         hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] 
                         hover:border-gray-600 cursor-pointer overflow-hidden"
            >
        
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div>
                <h3 className="text-white text-xl font-bold mb-4  transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {reason.description}
                </p>
              </div>

     
              <div className="flex justify-end mt-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2b1044] to-[#7c1d70] 
                                flex items-center justify-center text-3xl shadow-2xl 
                                transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                   <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                     {reason.icon}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsToJoin;