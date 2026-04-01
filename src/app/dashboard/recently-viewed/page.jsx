"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecentlyViewedPage() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recently-viewed", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch recently viewed");
        const data = await res.json();
        setRecentlyViewed(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load recently viewed items");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentlyViewed();
  }, []);

  if (loading)
    return <p className="text-white text-center py-10">Loading...</p>;

  if (error)
    return <p className="text-red-500 text-center py-10">{error}</p>;

  if (recentlyViewed.length === 0)
    return (
      <p className="text-white text-center py-10">
        You haven't watched any movies yet.
      </p>
    );

  return (
    <div className="min-h-screen bg-black pt-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
        🎬 Recently Watched
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {recentlyViewed.map((item) => (
          <div
            key={item.itemId}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={() => router.push(`/${item.type}/${item.itemId}`)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}