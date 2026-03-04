"use client";
import Link from "next/link";
import React, { useState } from "react";

const MovieCardBtn = ({ id, initialWatchlistStatus = false }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(initialWatchlistStatus);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWatchlist = async () => {
    // Optimistic update
    const previousState = isInWatchlist;
    setIsInWatchlist(!isInWatchlist);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}/watchlist`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          watchlistStatus: !previousState,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update watchlist");
      }

      // Success - state already updated optimistically
    } catch (error) {
      console.error("Error updating watchlist:", error);
      // Revert on error
      setIsInWatchlist(previousState);
      alert("Failed to update watchlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleWatchlist}
        disabled={isLoading}
        className={`p-2 rounded-xl transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
        aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isInWatchlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 hover:text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        )}
      </button>

      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
        <Link href={`/movies/${id}`}>Details</Link>
      </button>

      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
        Book Now
      </button>
    </div>
  );
};

export default MovieCardBtn;
