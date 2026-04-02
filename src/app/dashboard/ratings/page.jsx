"use client";

import { useEffect, useState } from "react";

export default function RatingsPage() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch("https://movie-matrix-server-one.vercel.app/api/ratings", {
          credentials: "include",
        });

        const data = await res.json();
        setRatings(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">⭐ My Ratings</h1>

      {ratings.length === 0 ? (
        <p className="text-gray-400">No ratings yet</p>
      ) : (
        <div className="grid gap-4">
          {ratings.map((r) => (
            <div
              key={r._id}
              className="bg-gray-900 p-4 rounded"
            >
              <p>🎬 Movie ID: {r.movieId}</p>
              <p>⭐ Rating: {r.rating}/5</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}