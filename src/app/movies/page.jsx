
"use client";

import MovieCard from "@/components/ui/MovieCard";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("All");

  // Fetch all movies
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

  // Get all unique genres
  const genres = ["All", ...new Set(movies.flatMap((movie) => movie.genre || []))];

  // Get all unique moods from movies
  const moods = ["All", ...new Set(movies.flatMap((movie) => movie.mood || []))];

  // Filter movies by genre, mood, and search query
  const filteredMovies = movies.filter((movie) => {
    const genreMatch =
      selectedGenre === "All" || movie.genre.includes(selectedGenre);
    const moodMatch =
      selectedMood === "All" || movie.mood?.includes(selectedMood);
    const searchMatch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return genreMatch && moodMatch && searchMatch;
  });

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
      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-6">

        {/* HEADING */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] tracking-tight mb-2">
            All <span className="text-blue-400">Movies</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 opacity-80">
            Discover your next cinematic adventure 🎬
          </p>
        </div>

        {/* SEARCH + MOOD DROPDOWN */}
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-full max-w-md focus:outline-none"
          />

          {/* Mood Dropdown */}
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          >
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* GENRE FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedGenre === genre
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* MOVIES GRID OR LOADING */}
        {loading ? (
          <div className="my-10 w-full flex justify-center">
            <Loading />
          </div>
        ) : filteredMovies.length === 0 ? (
          <p className="text-white text-center mt-10">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;