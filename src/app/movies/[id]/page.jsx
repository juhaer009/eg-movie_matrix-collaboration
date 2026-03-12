"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MovieCardBtn from "../../../components/ui/MovieCardBtn";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`http://localhost:5000/movies/${id}`);
        if (!res.ok) throw new Error("Movie not found or server error");

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Movie not found or server error");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-white font-display">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-slate-400 mb-8">{error}</p>
          <Link
            href="/movies"
            className="gradient-primary px-6 py-3 rounded-lg text-white font-semibold"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  // Safely split genre if it's string
  const genreMain =
    typeof movie.genre === "string" ? movie.genre.split(" / ")[0] : "Unknown";

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-200 antialiased overflow-x-hidden min-h-screen">
      <main>
        {/* Movie Hero Section */}
        <section className="relative w-full h-[85vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.4) 40%, rgba(15, 23, 42, 0) 100%), url('${movie.image}')`,
            }}
          ></div>
          <div className="relative h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="gradient-primary px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                Trending #1
              </div>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-semibold uppercase">
                {genreMain}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-semibold uppercase">
                {movie.duration || "Unknown"}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-semibold">
                2024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter uppercase">
              {movie.title || "Untitled"}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
              {movie.description || "No description available."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="gradient-primary hover:opacity-90 transition-opacity flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined">play_arrow</span>
                Watch Now
              </button>
              <MovieCardBtn id={movie._id || movie.id} variant="large" />
            </div>
          </div>
        </section>

        {/* Storyline & Cast */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Storyline
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {movie.description || "No description available."}
                </p>
              </div>

              {/* Director & Cast */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Director & Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {Array.isArray(movie.cast)
                    ? movie.cast.map((cast, idx) => (
                        <div key={idx} className="text-center group">
                          <div
                            className="w-24 h-24 mx-auto rounded-full border-2 border-white/10 group-hover:border-primary transition-colors overflow-hidden mb-4 bg-cover bg-center"
                            style={{
                              backgroundImage: `url('${cast.img || ""}')`,
                            }}
                          ></div>
                          <h4 className="text-white font-semibold">
                            {cast.name || "Unknown"}
                          </h4>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">
                            {cast.role || ""}
                          </p>
                        </div>
                      ))
                    : "No cast info available."}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-card p-8 rounded-2xl border border-white/5 shadow-2xl sticky top-28">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                      Price
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {movie.price ? `$${movie.price}` : "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                      IMDb Rating
                    </p>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="material-symbols-outlined text-yellow-500 text-xl fill-1">
                        star
                      </span>
                      <span className="text-2xl font-bold text-white">
                        {movie.imdbRating || "N/A"}
                      </span>
                      <span className="text-slate-500 text-sm">/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}