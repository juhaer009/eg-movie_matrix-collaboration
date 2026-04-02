"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function KidsPage() {
  const [kidsMovies, setKidsMovies] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const genres = ["All", "Animation", "Adventure", "Fantasy", "Comedy", "Action", "Family", "Animal", "Education", "Sci-Fi"];
  const moods = ["All", "Happy", "Funny", "Exciting", "Cute", "Magical", "Heroic", "Relaxing", "Educational", "Adventure"];

  // Fetch Kids movies
  useEffect(() => {
    const fetchKidsMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/kids");
        if (!res.ok) throw new Error("Failed to fetch kids movies");
        const data = await res.json();
        setKidsMovies(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load kids movies");
      } finally {
        setLoading(false);
      }
    };
    fetchKidsMovies();
  }, []);


  // Filter movies by genre, mood, and search
  const filteredMovies = kidsMovies.filter((movie) => {
    const genreMatch = selectedGenre === "All" || movie.genre.includes(selectedGenre);
    const moodMatch = selectedMood === "All" || movie.mood?.includes(selectedMood);
    const searchMatch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return genreMatch && moodMatch && searchMatch;
  });

  if (loading) return <Loading/>;

  if (error)
    return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center pt-20 px-4">

      {/* COVER IMAGE */}
      <div className="w-full h-72 md:h-[420px] relative overflow-hidden rounded-2xl shadow-lg">
        <img
          src="https://media.istockphoto.com/id/925721828/photo/child-is-playing-in-the-childrens-room-children-in-the-entertainment-center-fun-in-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=DsTX450BUvCXc4tSj6W5Eehvq8fO3owLMI7mOSK7Tz8="
          alt="Kids Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
          🎈 Kids Zone
        </h1>
      </div>

<div className="flex flex-wrap justify-center items-center gap-4 my-6 w-full px-2">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search movies..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="px-4 py-2 rounded-lg w-full sm:w-auto max-w-md focus:outline-none text-white"
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
      <div className="flex flex-wrap justify-center gap-3 my-4 px-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedGenre === g
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
  {filteredMovies.length > 0 ? (
    filteredMovies.map((movie) => (
      <div
        key={movie._id}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform"
      >
        {/* Movie Image */}
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-48 object-cover"
        />

        {/* Movie Info */}
        <div className="p-4 text-center space-y-2">
          <h3 className="font-bold text-lg text-white">{movie.title}</h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {movie.genre.map((g, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-blue-600/70 text-white px-2 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Play button always visible */}
          <button
            onClick={async () => {
              try {
                await fetch(`http://localhost:5000/api/view/kids/${movie._id}`, { method: "POST" });
                await fetch("http://localhost:5000/api/recently-viewed", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({
                    itemId: movie._id,
                    type: "kids",
                    title: movie.title,
                    image: movie.image,
                  }),
                });
                setRecentlyViewed((prev) => [
                  { itemId: movie._id, type: "kids", title: movie.title, image: movie.image },
                  ...prev.filter((i) => i.itemId !== movie._id),
                ].slice(0, 20));
              } catch (err) {
                console.error(err);
              }
              router.push(`/kids/${movie._id}`);
            }}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition text-sm font-semibold"
          >
            ▶ Play
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-white col-span-full text-center py-10">No movies found.</p>
  )}
</div>
      {/* RECENTLY VIEWED */}
      <div className="mt-10 w-full max-w-7xl">
        <h2 className="text-white text-2xl font-bold mb-4">🎬 Recently Watched</h2>
        {recentlyViewed.length > 0 ? (
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
        ) : (
          <p className="text-white text-center py-4">You haven't watched any movies yet.</p>
        )}
      </div>

    </div>
  );
}