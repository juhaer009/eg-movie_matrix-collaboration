"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hook/useauth";

export default function DashboardSeriesWatchlist() {
  const { user, loading } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/series-watchlist/${user.uid}`);
        const result = await res.json();
        setData(result.watchlist || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.uid]);

  if (loading || isLoading) {
    return (
      <div className="text-white text-center mt-10">Loading...</div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        No series in watchlist
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">My Series Watchlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.seriesId}
            className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-bold mb-2">{item.title}</h2>

            <p className="text-sm text-gray-300 mb-3">
              Episodes saved: {item.totalEpisodes}
            </p>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {item.episodes?.map((ep, index) => (
                <div
                  key={index}
                  className="text-sm bg-white/10 p-2 rounded-lg"
                >
                  Season {ep.seasonNumber} - Episode {ep.episodeId}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
