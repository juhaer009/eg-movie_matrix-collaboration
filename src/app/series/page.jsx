
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const SeriesPage = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("All");
  const [openSeries, setOpenSeries] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/series");
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

  const genres = ["All", ...new Set(seriesData.flatMap((series) => series.genre || []))];
  const moods = ["All", ...new Set(seriesData.flatMap((series) => series.mood || []))];

  const filteredSeries = seriesData.filter((series) => {
    const genreMatch = selectedGenre === "All" || series.genre.includes(selectedGenre);
    const moodMatch = selectedMood === "All" || series.mood?.includes(selectedMood);
    const searchMatch = series.title.toLowerCase().includes(searchQuery.toLowerCase());
    return genreMatch && moodMatch && searchMatch;
  });

  const toggleSeries = (id) => setOpenSeries(openSeries === id ? null : id);

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
            Explore your favorite series
          </p>
        </div>

        {/* SEARCH + MOOD DROPDOWN */}
        <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-full max-w-md focus:outline-none"
          />

          {/* Mood Dropdown */}
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          >
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* GENRE FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedGenre === genre
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              }`}
              onClick={() => setSelectedGenre(genre)}
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
        ) : filteredSeries.length === 0 ? (
          <p className="text-white text-center mt-10">No series found.</p>
        ) : (
          <div className="grid grid-cols-1 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSeries.map((series) => (
              <div
                key={series._id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  src={series.image}
                  alt={series.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold text-white">{series.title}</h2>
                  <p className="text-gray-400 text-sm">{series.description}</p>

                  <button
                    onClick={() => toggleSeries(series._id)}
                    className="w-full bg-red-600 hover:bg-red-700 py-1.5 rounded-xl text-sm"
                  >
                    {openSeries === series._id ? "Hide Episodes" : "Show Episodes"}
                  </button>

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