"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Play, Info, Star, ChevronRight, ChevronLeft } from "lucide-react";

const movies = [
  {
    id: 1,
    title: "MONSTERS",
    accent: "INC.",
    subtitle: "Disney • Pixar Presents",
    description: "Step into the factory where screams are processed. A world-class adventure that redefined animation history.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000",
    rating: "8.1",
    year: "2001",
    duration: "1h 32m"
  },
  {
    id: 2,
    title: "INTER",
    accent: "STELLAR",
    subtitle: "Christopher Nolan Masterpiece",
    description: "When Mankind is facing extinction, a group of astronauts travels through a wormhole in search of a new home.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000",
    rating: "8.7",
    year: "2014",
    duration: "2h 49m"
  },
  {
    id: 3,
    title: "BLADE",
    accent: "RUNNER",
    subtitle: "Cyberpunk Classic",
    description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000",
    rating: "8.0",
    year: "2017",
    duration: "2h 44m"
  },
  {
    id: 4,
    title: "AVATAR",
    accent: "WAY OF WATER",
    subtitle: "James Cameron Vision",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. He must work with the army to protect their home.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000",
    rating: "7.6",
    year: "2022",
    duration: "3h 12m"
  },
  {
    id: 5,
    title: "DUNE",
    accent: "PART TWO",
    subtitle: "Denis Villeneuve Epic",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=2000",
    rating: "8.9",
    year: "2024",
    duration: "2h 46m"
  }
];

const SupremeHeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + movies.length) % movies.length);
  };

  return (
    <div className="w-full px-6 md:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-end mt-20 mb-10 gap-6">
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            FEATURED <span className="text-slate-600"> MOVIES</span>
          </h3>
        </div>
      </div>
      <section className="relative h-[60vh] md:h-[60vh] lg:h-[70vh] xl:h-[70vh] w-full  bg-[#050505] overflow-hidden flex items-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-110 group-hover:scale-100"
              style={{ backgroundImage: `url(${movies[index].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 ml-12 lg:ml-20 hidden xl:flex flex-col gap-8 border-l border-white/10 pl-8">
          <StatItem label="Rating" value={`${movies[index].rating} / 10`} isStar />
          <StatItem label="Release" value={movies[index].year} />
          <StatItem label="Duration" value={movies[index].duration} />
        </div>

        {/* 3. Main Content Area */}
        <div className="relative z-10 px-8 lg:px-20 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
              <h2 className="text-red-600 font-mono text-sm tracking-[0.5em] mb-4 uppercase">
                {movies[index].subtitle}
              </h2>

              <h1 className="text-[6vw] font-[1000] leading-[0.85] tracking-tighter text-white uppercase italic">
                {movies[index].title} <br />
                <span className="text-transparent stroke-text">{movies[index].accent}</span>
              </h1>

              <p className="mt-8 text-lg text-gray-400 max-w-xl leading-relaxed">
                {movies[index].description}
              </p>

              <div className="mt-10 flex items-center gap-6">
                <button className="relative group overflow-hidden px-10 py-5 bg-white rounded-full transition-all active:scale-95">
                  <div className="absolute inset-0 bg-red-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative flex items-center gap-3 text-black font-black group-hover:text-white transition-colors">
                    <Play size={20} fill="currentColor" /> WATCH NOW
                  </span>
                </button>

                <button className="p-5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">
                  <Info size={24} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Interactive Slide Navigation */}
        <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end gap-6">
          <div className="flex gap-3">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={`h-1 transition-all duration-500 rounded-full ${i === index ? "w-12 bg-red-600" : "w-4 bg-white/20"}`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <NavButton icon={<ChevronLeft />} onClick={() => paginate(-1)} />
            <NavButton icon={<ChevronRight />} onClick={() => paginate(1)} />
          </div>
        </div>

        <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          opacity: 0.6;
          }
          `}</style>
      </section>
    </div>
  );
};

const StatItem = ({ label, value, isStar }) => (
  <div className="space-y-1">
    <p className="text-[10px] text-red-600 font-black uppercase tracking-[0.3em]">{label}</p>
    <div className="flex items-center gap-2 text-white font-bold">
      {isStar && <Star size={14} className="fill-red-600 text-red-600" />} {value}
    </div>
  </div>
);

const NavButton = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
  >
    {icon}
  </button>
);

export default SupremeHeroSlider;