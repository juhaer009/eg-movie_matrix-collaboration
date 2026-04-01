"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KidsPage() {
  const [kidsMovies, setKidsMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const router = useRouter();

  const genres = ["All", "Animation", "Adventure", "Fantasy", "Comedy"];

  useEffect(() => {
  const fetchKidsMovies = async () => {
    try {
      const res = await fetch("https://movie-matrix-server-one.vercel.app/api/kids");
      const data = await res.json();
      console.log("Fetched kidsMovies:", data);
      setKidsMovies(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load kids movies");
    } finally {
      setLoading(false);
    }
  };

  fetchKidsMovies();
}, []);

  const filteredMovies =
    selectedGenre === "All"
      ? kidsMovies
      : kidsMovies.filter((movie) => movie.genre.includes(selectedGenre));

  if (loading)
    return <p className="text-center py-10 text-white">Loading kids movies...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="bg-black min-h-screen relative">
      {/* COVER IMAGE */}
      <div className="w-full h-72 md:h-[420px] relative overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/925721828/photo/child-is-playing-in-the-childrens-room-children-in-the-entertainment-center-fun-in-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=DsTX450BUvCXc4tSj6W5Eehvq8fO3owLMI7mOSK7Tz8="
          alt="Kids Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
          🎈 Kids Zone
        </h1>
      </div>

      {/* GENRE FILTER */}
      <div className="flex flex-wrap justify-center gap-3 my-6 px-4">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-2 rounded-full shadow font-semibold transition ${
              selectedGenre === g
                ? "bg-red-700 text-white"
                : "bg-red-500/80 text-white"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* MOVIES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="relative">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-40 object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition text-white text-2xl font-bold rounded-2xl">
                ▶
              </button>
            </div>

            <div className="p-3 text-center">
              <h3 className="font-bold text-sm text-white">{movie.title}</h3>
              <div className="flex justify-center gap-1 mt-2 flex-wrap">
                {movie.genre.map((g, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-red-500/70 text-white px-2 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
              {/* Play button */}
              <button
                onClick={() => router.push(`/kids/${movie._id}`)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded-full transition text-sm"
              >
                Play ▶
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center py-6 text-white text-sm">
        Made with ❤️ for Kids
      </div>
    </div>
  );
}