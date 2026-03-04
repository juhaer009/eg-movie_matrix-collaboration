"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";

const movies = [
  {
    url: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    title: "Cinematic Excellence",
    subtitle: "Experience movies like never before"
  },
  {
    url: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
    title: "Award-Winning Collection",
    subtitle: "Stream the best of cinema"
  },
  {
    url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    title: "Blockbuster Hits",
    subtitle: "All your favorites in one place"
  },
  {
    url: "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
    title: "Exclusive Premieres",
    subtitle: "Watch new releases first"
  },
  {
    url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    title: "Timeless Classics",
    subtitle: "Rediscover legendary films"
  },
];

export default function MovieSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? movies.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === movies.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden rounded-[2.5rem] shadow-2xl">
      {/* Images */}
      {movies.map((movie, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={`${movie.url}?auto=format&fit=crop&w=1600&q=80`}
            alt="Movie Poster"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
        </div>
      ))}

      {/* Glassmorphic Content Card */}
      <div className="absolute inset-0 flex flex-col justify-end items-center pb-20 z-10">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-10 max-w-3xl mx-6 shadow-2xl transform transition-all duration-700">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/30 backdrop-blur-xl mb-4">
              <span className="text-xs font-bold text-purple-200 tracking-widest">FEATURED COLLECTION</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {movies[current].title}
            </h1>
            
            <p className="text-xl text-gray-200 font-light">
              {movies[current].subtitle}
            </p>

            <button className="group mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-10 h-2 bg-gradient-to-r from-purple-500 to-pink-500"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
