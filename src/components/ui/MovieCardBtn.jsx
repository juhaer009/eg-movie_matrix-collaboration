"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import useAuth from "../../hook/useauth";

const MovieCardBtn = ({
  id,
  initialWatchlistStatus = false,
  variant = "card",
  showDetails = true,
  showBookNow = true,
}) => {
  const { user, loading: authLoading } = useAuth(); // fixed typo
  const [isInWatchlist, setIsInWatchlist] = useState(initialWatchlistStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      if (authLoading) return;

      if (!user?.uid) {
        setIsInWatchlist(false);
        setIsCheckingStatus(false);
        return;
      }

      setIsCheckingStatus(true);
      try {
        const response = await fetch(`http://localhost:5000/api/watchlist/${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          const isMovieInWatchlist = data.watchlist.some(item => item.movieId === id);
          setIsInWatchlist(isMovieInWatchlist);
          localStorage.setItem(`watchlist_${user.uid}_${id}`, isMovieInWatchlist.toString());
        }
      } catch (error) {
        console.error("Error fetching watchlist status:", error);
        const cached = localStorage.getItem(`watchlist_${user.uid}_${id}`);
        if (cached !== null) setIsInWatchlist(cached === "true");
      } finally {
        setIsCheckingStatus(false);
      }
    };

    fetchWatchlistStatus();
  }, [user?.uid, id, authLoading]);

  const toggleWatchlist = async () => {
    if (!user) return alert("Please login to add movies to your watchlist");

    const previousState = isInWatchlist;
    setIsInWatchlist(!isInWatchlist);
    setIsLoading(true);

    const method = previousState ? "DELETE" : "POST";

    try {
      const response = await fetch(`http://localhost:5000/api/watchlist`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, movieId: id }),
      });

      if (!response.ok) throw new Error(await response.text());

      localStorage.setItem(`watchlist_${user.uid}_${id}`, (!previousState).toString());
    } catch (error) {
      console.error(error);
      setIsInWatchlist(previousState);
      alert("Failed to update watchlist. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "large") {
    return (
      <button
        onClick={toggleWatchlist}
        disabled={isLoading || isCheckingStatus}
        className={`bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg ${
          (isLoading || isCheckingStatus) && "opacity-50 cursor-not-allowed"
        } ${isInWatchlist ? "bg-red-500/20 border-red-500/50" : ""}`}
      >
        <span className="material-symbols-outlined">
          {isCheckingStatus ? "sync" : isInWatchlist ? "check" : "add"}
        </span>
        {isCheckingStatus
          ? "Loading..."
          : isInWatchlist
          ? "In Watchlist"
          : "Add to Watchlist"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleWatchlist}
        disabled={isLoading || isCheckingStatus}
        className={`p-2 rounded-xl transition-all duration-300 ${
          isLoading || isCheckingStatus ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        {isCheckingStatus ? (
          <span className="material-symbols-outlined animate-spin">sync</span>
        ) : isInWatchlist ? (
          <span className="material-symbols-outlined text-red-500">check</span>
        ) : (
          <span className="material-symbols-outlined text-gray-400 hover:text-red-500">
            add
          </span>
        )}
      </button>

      {showDetails && (
        <Link
          href={`/movies/${id}`}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        >
          Details
        </Link>
      )}
      {showBookNow && (
        <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
          Book Now
        </button>
      )}
    </div>
  );
};

export default MovieCardBtn;