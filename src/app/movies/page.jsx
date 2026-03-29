"use client";

import MovieCard from "@/components/ui/MovieCard";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-20 px-4">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn9r6250JD1IB0UzzFKSv3-kf0iNrM5Ga6Sw&s)",
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-4">

        {/* HEADING */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] tracking-tight mb-2">
            All <span className="text-blue-400">Movies</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 opacity-80">
            Discover your next cinematic adventure 🎬
          </p>
        </div>

        {/* MOVIES GRID OR LOADING */}
        {loading ? (
          <div className="my-10 w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={movie._id || index} id={movie._id} movie={movie}   ></MovieCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;