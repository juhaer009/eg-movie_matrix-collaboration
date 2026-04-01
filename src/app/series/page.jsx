
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const SeriesPage = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSeries, setOpenSeries] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All"); 
  const router = useRouter();

  const genres = ["All", "Fantasy", "Sci-Fi", "Comedy", "Horror", "Romance", "Action", "Thriller"]; 

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("https://movie-matrix-server-one.vercel.app/api/series");
        if (!res.ok) throw new Error("Failed to fetch series");
        const data = await res.json();
        setSeriesData(data);
      } catch (err) {
        console.error("Error fetching series:", err);
        setSeriesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const toggleSeries = (id) => {
    setOpenSeries(openSeries === id ? null : id);
  };

  const filteredSeries =
    selectedGenre === "All"
      ? seriesData
      : seriesData.filter((series) => series.genre?.includes(selectedGenre)); // ✅ Filtered series

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-20 px-4">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517430816045-df4b7de1d1e9?w=1200)",
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-6">

        {/* HEADING */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight mb-2">
            🎬 Drama <span className="text-blue-400">Series</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 opacity-80">
            Explore the latest series and episodes
          </p>
        </div>

        {/* GENRE FILTER */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                selectedGenre === genre
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* SERIES GRID OR LOADING */}
        {loading ? (
          <div className="my-10 w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSeries.map((series) => ( // ✅ Use filteredSeries
              <div
                key={series._id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform"
              >
                {/* SERIES IMAGE */}
                <img
                  src={series.image}
                  alt={series.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-3">
                  {/* TITLE */}
                  <h2 className="text-lg font-semibold text-white">{series.title}</h2>

                  {/* DESCRIPTION */}
                  <p className="text-gray-400 text-sm">{series.description}</p>

                  {/* TOGGLE BUTTON */}
                  <button
                    onClick={() => toggleSeries(series._id)}
                    className="w-full bg-red-600 hover:bg-red-700 py-1.5 rounded-xl text-sm"
                  >
                    {openSeries === series._id ? "Hide Episodes" : "Show Episodes"}
                  </button>

                  {/* EPISODES */}
                  {openSeries === series._id && (
                    <div className="space-y-2 mt-3 max-h-60 overflow-y-auto">
                      {series.seasons?.map((season) =>
                        season.episodes?.map((ep) => (
                          <div
                            key={ep._id}
                            className="flex items-center gap-2 bg-black/40 p-2 rounded-xl hover:bg-black/60 transition"
                          >
                            <img
                              src={ep.image}
                              alt={ep.title}
                              className="w-16 h-12 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-white">{ep.title}</h3>
                              <div className="text-xs text-gray-400">
                                ⏱ {ep.time || "N/A"} | ⭐ {ep.rating || "0"}
                              </div>
                            </div>

                            <button
                              onClick={() => router.push(`/series/${series._id}`)}
                              className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded-lg text-xs font-semibold"
                            >
                              ▶ Play
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesPage;