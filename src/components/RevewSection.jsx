"use client";

import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star, Quote, CheckCircle2, MessageSquare } from "lucide-react";

const reviews = [
  {
    name: "John Doe",
    review: "The visual effects were top notch. MovieMatrix has the best 4K collection I've seen so far.",
    rating: 5,
    img: "https://i.pravatar.cc/150?u=john",
    tag: "Critic",
  },
  {
    name: "Jane Smith",
    review: "The user experience is just seamless. Finding my favorite classics took less than a second!",
    rating: 5,
    img: "https://i.pravatar.cc/150?u=jane",
    tag: "Director",
  },
  {
    name: "Alice Johnson",
    review: "A true masterpiece for the fans of cinema. The curated lists are surprisingly accurate.",
    rating: 4,
    img: "https://i.pravatar.cc/150?u=alice",
    tag: "Member",
  },
  {
    name: "Bob Martin",
    review: "Finally a platform that understands what movie lovers want. Offline downloads are a lifesaver.",
    rating: 5,
    img: "https://i.pravatar.cc/150?u=bob",
    tag: "Pro",
  },
];

function SpotlightCard({ rev, index }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col justify-between rounded-[2rem] border border-white/5 bg-zinc-900/40 backdrop-blur-3xl p-8 transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_50px_-12px_rgba(220,38,38,0.25)]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(229, 9, 20, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      <div className="absolute inset-[1px] rounded-[1.95rem] bg-[#0A0A0A]/90 z-0" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < rev.rating ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]" : "text-zinc-800"}
                />
              ))}
            </div>
            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
              <Quote size={16} className="text-primary animate-pulse" />
            </div>
          </div>

          <p className="text-zinc-200 text-lg leading-relaxed font-medium tracking-tight group-hover:text-white transition-colors">
            "{rev.review}"
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/5 pt-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-orange-500 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src={rev.img} alt="" className="relative h-12 w-12 rounded-full object-cover transition-all border-2 border-zinc-800" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white flex items-center gap-1.5 uppercase tracking-wide">
                {rev.name} <CheckCircle2 size={14} className="text-primary fill-primary/10" />
              </h4>
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black group-hover:text-primary transition-colors">
                {rev.tag} Account
              </span>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-zinc-800/50 flex items-center justify-center border border-white/5 group-hover:bg-primary/20 transition-colors">
            <Star size={12} className="text-zinc-500 group-hover:text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EnhancedReviewSection() {
  return (
    <section className="relative py-10 bg-black overflow-hidden select-none">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-900/10 blur-[180px] rounded-full animate-bounce pointer-events-none" style={{ animationDuration: '10s' }} />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <div className="w-full px-4 md:px-12 lg:px-20 relative z-10">
        {/* State-of-the-art Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '60px' }}
              className="h-1 bg-primary mb-6 hidden md:block"
            />
            <div className="flex items-center gap-3 text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4">
              <MessageSquare size={14} /> <span>Global Consensus</span>
            </div>
            <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] md:leading-[0.85]">
              CRITIC <br />
              <span className="text-transparent stroke-text bg-gradient-to-r from-primary via-white to-primary bg-clip-text animate-text-shimmer bg-[length:200%_auto]">
                REVIEWS
              </span>
            </h2>
          </div>
          
          <div className="max-w-[300px] lg:text-right">
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed uppercase font-bold tracking-tight mb-4">
              <span className="text-white">MovieMatrix</span> has been voted #1 for cinematic fidelity and user interface design in 2026.
            </p>
            <div className="flex lg:justify-end -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-black bg-zinc-800 overflow-hidden ring-1 ring-white/10">
                  <img src={`https://i.pravatar.cc/100?u=${i*10}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-black bg-primary flex items-center justify-center text-[10px] font-black text-white ring-1 ring-white/10">
                +12K
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reviews.map((rev, i) => (
            <SpotlightCard key={i} rev={rev} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-6"
        >
          <p className="text-zinc-500 font-black tracking-[0.3em] uppercase text-[10px]">Trusted by the industry elite</p>
          <div className="flex gap-12 opacity-20 filter grayscale contrast-125">
            <span className="text-2xl font-black italic tracking-tighter">IMDb</span>
            <span className="text-2xl font-black italic tracking-tighter">ROTTEN</span>
            <span className="text-2xl font-black italic tracking-tighter">METACRITIC</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.1);
        }
        
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        .animate-text-shimmer {
          animation: text-shimmer 4s linear infinite;
        }

        @media (min-width: 1024px) {
          .stroke-text:hover {
             -webkit-text-stroke: 1.5px #E50914;
             transition: all 0.5s ease;
          }
        }
      `}</style>
    </section>
  );
}
