

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [items, setItems] = useState([]); // movies + series

  useEffect(() => {
    async function fetchFavorites() {
      try {
        // 1️⃣ get all favourites
        const favRes = await fetch("http://localhost:5000/api/favourites", {
          credentials: "include",
        });
        const favs = await favRes.json();
        if (!favs.length) return setItems([]);

        // 2️⃣ get all movies
        const movieRes = await fetch("http://localhost:5000/movies");
        const allMovies = await movieRes.json();

        // 3️⃣ get all series
        const seriesRes = await fetch("http://localhost:5000/api/series");
        const allSeries = await seriesRes.json();

        // 4️⃣ match favourites
        const favMovies = allMovies.filter((m) =>
          favs.find((f) => f.movieId === (m._id || m.id))
        );

        const favSeries = allSeries.filter((s) =>
          favs.find((f) => f.movieId === (s._id || s.id))
        );

        setItems([...favMovies, ...favSeries]);

      } catch (error) {
        console.error(error);
      }
    }

    fetchFavorites();
  }, []);

  // Remove favourite
  const removeFavorite = async (item) => {
    const body = { movieId: item._id }; // movieId handles both movie and series
    await fetch("http://localhost:5000/api/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    setItems(prev => prev.filter(i => (i._id || i.id) !== (item._id || item.id)));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">❤️ My Favorites</h1>

      {items.length === 0 ? (
        <p className="text-gray-400">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-gray-900 p-4 rounded-lg hover:scale-105 transition"
            >
              <Link
                href={item.seasons ? `/series/${item._id || item.id}` : `/movies/${item._id || item.id}`}
              >
                <img
                  src={item.image}
                  className="w-full h-48 object-cover rounded"
                  alt={item.title}
                />
                <h2 className="mt-3 font-semibold">{item.title}</h2>
                {item.seasons && (
                  <p className="text-gray-400 text-sm">Series | {item.seasons.length} Seasons</p>
                )}
              </Link>

              <button
                onClick={() => removeFavorite(item)}
                className="mt-3 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}