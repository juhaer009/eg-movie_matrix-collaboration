

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Rating from "@/components/rating/rating";


export default function MovieDetailsPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFav, setIsFav] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`http://localhost:5000/movies/${id}`);

        if (!res.ok) throw new Error("Movie not found");

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError("Movie not found or server error");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchMovie();
  }, [id]);

  
const handleFavorite = async () => {
  if (!movie) return;

  const movieId = movie._id || movie.id;

  try {
    await fetch("http://localhost:5000/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ movieId }),
    });

    setIsFav((prev) => !prev);

  } catch (error) {
    console.error("Favourite error:", error);
  }
};
  //
  const handleWatch = () => {
    if (movie?.trailer) {
      window.open(movie.trailer, "_blank");
    } else {
      alert("No trailer available");
    }
  };

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }


  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-3">Movie Not Found</h1>
        <p className="text-slate-400 mb-6">{error}</p>

        <Link
          href="/movies"
          className="bg-purple-600 px-5 py-2 rounded-lg font-semibold"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, #000, transparent), url(${movie.image})`,
        }}
      >
        <div className="absolute bottom-0 p-10 max-w-3xl">

          <h1 className="text-5xl font-bold mb-4">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-6">
            {movie.description}
          </p>

          {/* ▶ WATCH */}
          <button
            onClick={handleWatch}
            className="bg-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-700 mb-6"
          >
            ▶ Watch Now
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 flex-wrap">

            {/* ❤️ FAVORITE */}
            <button
              onClick={handleFavorite}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isFav
                  ? "bg-green-600"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isFav ? "✔ Added to Favorite" : "❤️ Add to Favorite"}
            </button>

            {/* ⭐ RATING */}
            <div className="bg-gray-900 px-4 py-2 rounded-lg">
              <Rating movieId={movie._id || movie.id} />
            </div>

          </div>

        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          <div>
            <h2 className="text-2xl font-bold mb-2">Storyline</h2>
            <p className="text-gray-400">
              {movie.description}
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-gray-900 p-6 rounded-xl space-y-6">

          <div>
            <p className="text-gray-400 text-sm">Price</p>
            <h3 className="text-2xl font-bold">
              {movie.price ? `$${movie.price}` : "Free"}
            </h3>
          </div>

          <div>
            <p className="text-gray-400 text-sm">IMDb Rating</p>
            <h3 className="text-xl font-bold">
              ⭐ {movie.imdbRating || "N/A"} /10
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
}