

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SeriesDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [series, setSeries] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch series details
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/series/${id}`);
        if (!res.ok) throw new Error("Failed to fetch series");
        const data = await res.json();
        setSeries(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load series");
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, [id]);

  // Fetch recently viewed
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
      }
    };
    fetchRecentlyViewed();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!series) return null;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Banner */}
      <div className="relative">
        <img
          src={series.image}
          className="w-full h-[400px] object-cover opacity-70"
        />
        <div className="absolute bottom-10 left-10 max-w-xl">
          <h1 className="text-4xl font-bold">{series.title}</h1>
          <p className="text-gray-300 mt-2">{series.description}</p>
        </div>
      </div>

      {/* Episodes */}
      <div className="p-6">
        {series.seasons?.map((season, sIndex) => (
          <div key={sIndex} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Season {season.season}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {season.episodes?.map((ep, i) => (
                <div
                  key={`${sIndex}-${i}`}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl hover:scale-105 transition"
                >
                  <img
                    src={ep.image}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <h3 className="mt-3 font-semibold">{ep.title}</h3>
                  <p className="text-sm text-gray-400">{ep.description}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    ⏱ {ep.time || "N/A"} | ⭐ {ep.rating || "0"}
                  </div>

                  {/* Play button */}
                  <button
                    onClick={async () => {
                      try {
                        // Post to recently viewed
                        await fetch("http://localhost:5000/api/recently-viewed", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({
                            itemId: ep._id,
                            type: "series",
                            title: ep.title,
                            image: ep.image,
                            seriesId: series._id,
                          }),
                        });

                        // Update local recently viewed
                        setRecentlyViewed((prev) => [
                          {
                            itemId: ep._id,
                            type: "series",
                            title: ep.title,
                            image: ep.image,
                            seriesId: series._id,
                          },
                          ...prev.filter((i) => i.itemId !== ep._id),
                        ].slice(0, 20));
                      } catch (err) {
                        console.error(err);
                      }

                      router.push(`/episode/${ep._id}`);
                    }}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm transition"
                  >
                    ▶ Play Episode
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="mt-10 w-full max-w-7xl px-6">
          <h2 className="text-white text-2xl font-bold mb-4">🎬 Recently Watched</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentlyViewed.map((item) => (
              <div key={item.itemId} className="min-w-[150px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="text-white text-sm mt-1 text-center">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}