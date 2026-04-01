"use client";

import { useEffect, useState } from "react";

export default function Rating({ movieId }) {
  const [rating, setRating] = useState(0);

  // get user previous rating
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ratings", {
          credentials: "include",
        });

        const data = await res.json();

        const myRating = data.find((r) => r.movieId === movieId);

        if (myRating) {
          setRating(myRating.rating);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRating();
  }, [movieId]);

  // ⭐ handle rating click
  const handleRating = async (value) => {
    setRating(value);

    try {
      await fetch("http://localhost:5000/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          movieId,
          rating: value,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className="cursor-pointer hover:scale-125 transition"
            style={{
              color: star <= rating ? "gold" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-400">
        Your Rating: {rating ? `${rating}/5` : "Not rated yet"}
      </p>
    </div>
  );
}