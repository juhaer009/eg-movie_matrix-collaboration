"use client";
import useAuth from "@/hook/useauth";
import React, { useState, useEffect } from "react";

const EpisodeWatchlistBtn = ({ seriesId, seasonNumber, episodeId }) => {
  const { user, loading: authLoading } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
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
        const response = await fetch(`http://localhost:5000/api/series-watchlist/${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          const isEpisodeInWatchlist = data.watchlist.some(item =>
            item.seriesId === seriesId && item.episodeId === episodeId
          );
          setIsInWatchlist(isEpisodeInWatchlist);
          localStorage.setItem(`watchlist_${user.uid}_${seriesId}_${episodeId}`, isEpisodeInWatchlist.toString());
        }
      } catch (error) {
        console.error("Error fetching watchlist status:", error);
        const cached = localStorage.getItem(`watchlist_${user.uid}_${seriesId}_${episodeId}`);
        if (cached !== null) setIsInWatchlist(cached === "true");
      } finally {
        setIsCheckingStatus(false);
      }
    };

    fetchWatchlistStatus();
  }, [user?.uid, seriesId, episodeId, authLoading]);

  const toggleWatchlist = async () => {
    if (!user) return alert("Please login to add episodes to your watchlist");

    const previousState = isInWatchlist;
    setIsInWatchlist(!isInWatchlist);
    setIsLoading(true);

    const method = previousState ? "DELETE" : "POST";

    try {
      const response = await fetch(`http://localhost:5000/api/series-watchlist`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          seriesId,
          seasonNumber,
          episodeId
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      localStorage.setItem(`watchlist_${user.uid}_${seriesId}_${episodeId}`, (!previousState).toString());
    } catch (error) {
      console.error(error);
      setIsInWatchlist(previousState);
      alert("Failed to update watchlist. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      disabled={isLoading || isCheckingStatus}
      className={`px-6 py-3 rounded-xl font-bold text-white transition-all ${
        isCheckingStatus || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500/20"
      } ${isInWatchlist ? "bg-red-500/20 border border-red-500" : "bg-white/10 border border-white/20"}`}
    >
      {isCheckingStatus
        ? "Loading..."
        : isInWatchlist
        ? "In Watchlist"
        : "Add to Watchlist"}
    </button>
  );
};

export default EpisodeWatchlistBtn;