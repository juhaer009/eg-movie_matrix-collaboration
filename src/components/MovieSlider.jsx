"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const movies = [
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
  "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
];

export default function MovieSlider() {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? movies.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === movies.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-3xl">
      {/* Images */}
      {movies.map((img, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={`${img}?auto=format&fit=crop&w=1600&q=80`}
            alt="Movie Poster"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold">
          Latest Blockbuster Movies 🎬
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Discover the most updated and trending movies now
        </p>
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full backdrop-blur-md"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full backdrop-blur-md"
      >
        ❯
      </button>
    </div>
  );
}
