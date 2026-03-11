"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import useAuth from "../../hook/useauth";

const MovieCardBtn = ({ id, initialWatchlistStatus = false, variant = "card", showDetails = true, showBookNow = true }) => {
  const { user, loding: authLoading } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(initialWatchlistStatus);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Fetch watchlist status when component mounts or user changes
  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      // Wait for auth to load
      if (authLoading) {
        return;
      }

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
          
          // Cache in localStorage
          localStorage.setItem(`watchlist_${user.uid}_${id}`, isMovieInWatchlist.toString());
        }
      } catch (error) {
        console.error("Error fetching watchlist status:", error);
        // Fallback to localStorage if API fails
        const cached = localStorage.getItem(`watchlist_${user.uid}_${id}`);
        if (cached !== null) {
          setIsInWatchlist(cached === 'true');
        }
      } finally {
        setIsCheckingStatus(false);
      }
    };

    fetchWatchlistStatus();
  }, [user?.uid, id, authLoading]);

  const toggleWatchlist = async () => {
    // Check if user is logged in
    if (!user) {
      alert("Please login to add movies to your watchlist");
      return;
    }

    // Validate required data
    if (!user.uid || !id) {
      console.error("Missing required data:", { userId: user.uid, movieId: id });
      alert("Missing user or movie information");
      return;
    }

    // Optimistic update
    const previousState = isInWatchlist;
    setIsInWatchlist(!isInWatchlist);
    setIsLoading(true);

    const requestData = {
      userId: user.uid,
      movieId: id,
    };

    // Use POST for adding, DELETE for removing
    const method = previousState ? "DELETE" : "POST";

    try {
      const response = await fetch(`http://localhost:5000/api/watchlist`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server error response:", errorData);
        throw new Error(`Server error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      console.log("Watchlist updated successfully:", data);
      
      // Update localStorage
      localStorage.setItem(`watchlist_${user.uid}_${id}`, (!previousState).toString());
      
    } catch (error) {
      console.error("Error updating watchlist:", error);
    
      setIsInWatchlist(previousState);
      
      // More specific error messages
      if (error.message.includes("Failed to fetch")) {
        alert("Cannot connect to server. Please check your internet connection.");
      } else if (error.message.includes("400")) {
        alert("Bad request. Please check the console for details.");
      } else if (error.message.includes("404")) {
        alert("Movie not found in watchlist.");
      } else if (error.message.includes("409")) {
        alert("Movie already in watchlist.");
      } else {
        alert("Failed to update watchlist. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Large button variant for movie details page
  if (variant === "large") {
    return (
      <button
        onClick={toggleWatchlist}
        disabled={isLoading || isCheckingStatus}
        className={`bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg ${
          isLoading || isCheckingStatus ? "opacity-50 cursor-not-allowed" : ""
        } ${isInWatchlist ? "bg-red-500/20 border-red-500/50" : ""}`}
      >
        <span className="material-symbols-outlined">
          {isCheckingStatus ? "sync" : isInWatchlist ? "check" : "add"}
        </span>
        {isCheckingStatus ? "Loading..." : isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </button>
    );
  }

  // Default card variant
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleWatchlist}
        disabled={isLoading || isCheckingStatus}
        className={`p-2 rounded-xl transition-all duration-300 ${
          isLoading || isCheckingStatus ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
        aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isCheckingStatus ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ) : isInWatchlist ? (
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


      {showDetails && (
        <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
          <Link href={`/movies/${id}`}>Details</Link>
        </button>
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