"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { TrendingUp, Users, Star, Tv, Clapperboard, Award } from "lucide-react";

const stats = [
  {
    title: "Global Viewers",
    value: "42.8M",
    desc: "Active streamers this month",
    icon: <Users className="text-blue-400" />,
    grid: "md:col-span-2 md:row-span-1",
    bg: "bg-blue-500/5",
  },
  {
    title: "Top Rated",
    value: "4.9",
    desc: "Average user rating",
    icon: <Star className="text-yellow-400" />,
    grid: "md:col-span-1 md:row-span-1",
    bg: "bg-yellow-500/5",
  },
  {
    title: "New Releases",
    value: "+124",
    desc: "Added this week",
    icon: <Clapperboard className="text-purple-400" />,
    grid: "md:col-span-1 md:row-span-2",
    bg: "bg-purple-500/5",
  },
  {
    title: "Award Winners",
    value: "12",
    desc: "Oscars this season",
    icon: <Award className="text-pink-400" />,
    grid: "md:col-span-1 md:row-span-1",
    bg: "bg-pink-500/5",
  },
  {
    title: "System Status",
    value: "99.9%",
    desc: "Streaming uptime",
    icon: <TrendingUp className="text-emerald-400" />,
    grid: "md:col-span-2 md:row-span-1",
    bg: "bg-emerald-500/5",
  },
];

export default function MovieStatsGrid() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      const shift = 15; // Max tilt angle

      const move = (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(card, {
          rotateY: x * shift,
          rotateX: -y * shift,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.5,
        });
      };

      const leave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      return () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  return (
    <section className="py-24 px-6 lg:px-20 bg-[#020617]">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-purple-500 font-mono text-sm tracking-[0.3em] uppercase">
              Platform Analytics
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              THE MATRIX <span className="text-slate-600">BY NUMBERS</span>
            </h3>
          </div>
          <p className="text-slate-400 max-w-xs text-sm leading-relaxed">
            Real-time data tracking across our global streaming infrastructure.
          </p>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-[2rem] border border-white/5 p-8 flex flex-col justify-between ${stat.grid} ${stat.bg} hover:border-white/10 transition-colors cursor-default`}
            >
              {/* Background Glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />

              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                  {stat.icon}
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  Active
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tighter">
                    {stat.value}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-slate-400 font-medium text-sm mt-1">
                  {stat.title}
                </p>
                <p className="text-slate-600 text-xs mt-1 italic uppercase tracking-tighter">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}