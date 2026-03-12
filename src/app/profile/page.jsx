"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  // Fetch full user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include", // sends cookie with JWT
        });
        const data = await res.json();
        setUser(data);
        setName(data?.displayName || data?.name || "");
        setPhoto(data?.photoURL || "");
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name, photoURL: photo }),
      });
      const data = await res.json();
      if (res.ok) setUser(data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="bg-gray-500 shadow-xl text-black rounded-2xl w-full max-w-5xl p-8 grid md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center text-center border-r pr-6 relative">
          <div className="relative">
            <img
              src={photo || "/avatar.png"}
              className="w-32 h-32 rounded-full object-cover border"
            />
            {user.premium && (
              <span className="absolute top-0 right-0 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                ⭐ Premium
              </span>
            )}
          </div>

          {editing ? (
            <>
              <Input
                className="mt-4"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Photo URL"
              />
              <Input
                className="mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display Name"
              />
            </>
          ) : (
            <h2 className="text-2xl font-bold mt-4 flex items-center gap-2">
              {name || "Anonymous User"}
              {user.premium && <span className="text-yellow-400">⭐</span>}
            </h2>
          )}

          <p>{user.email}</p>

          <p className="text-sm mt-2">
            Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
          </p>

          <div className="mt-4 flex flex-col gap-3 w-full">
            {editing ? (
              <Button onClick={handleUpdate}>Save Profile</Button>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}

            {/* PREMIUM BUTTON */}
            <Button
              className={`font-semibold ${
                user.premium
                  ? "bg-gray-400 cursor-not-allowed text-black"
                  : "bg-yellow-500 hover:bg-yellow-600 text-black"
              }`}
              onClick={() => !user.premium && (window.location.href = "/payment")}
              disabled={user.premium}
            >
              {user.premium ? "⭐ Premium Active" : "⭐ Get Premium (1000 Tk)"}
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 p-8 flex flex-col gap-10">
          {/* STATS */}
          <div className="flex flex-row flex-wrap gap-4">
            <div className="px-6 py-3 rounded-full shadow-xl bg-cyan-500 hover:scale-105 transition text-white">
              🎬 {user.stats?.watched || 0} Movies Watched
            </div>

            <div className="px-6 py-3 rounded-full shadow-xl bg-purple-500 hover:scale-105 transition text-white">
              ⏱ {user.stats?.hours || 0} Hours Watched
            </div>

            <div className="px-6 py-3 rounded-full shadow-xl bg-pink-500 hover:scale-105 transition text-white">
              🤖 {user.stats?.aiMatch || 0}% AI Match
            </div>
          </div>

          {/* RECENTLY WATCHED */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">🕒 Recently Watched</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.recentMovies?.length > 0 ? (
                user.recentMovies.map((movie) => (
                  <div key={movie.id} className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
                    <img src={movie.poster} alt={movie.title} className="w-full h-40 object-cover" />
                    <div className="p-2 text-sm text-center">{movie.title}</div>
                  </div>
                ))
              ) : (
                <p className="opacity-60">No recent movies</p>
              )}
            </div>
          </div>

          {/* FAVORITE GENRES */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">🎭 Favorite Genres</h2>
            <div className="flex flex-wrap gap-3">
              {user.genres?.length > 0 ? (
                user.genres.map((genre) => (
                  <span key={genre} className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                    {genre}
                  </span>
                ))
              ) : (
                <p className="opacity-60">No genre selected</p>
              )}
            </div>
          </div>

          {/* AI RECOMMENDATIONS */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">🤖 AI Recommended Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.aiRecommendations?.length > 0 ? (
                user.aiRecommendations.map((movie) => (
                  <div key={movie.id} className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
                    <img src={movie.poster} alt={movie.title} className="w-full h-40 object-cover" />
                    <div className="p-2 text-sm text-center">{movie.title}</div>
                  </div>
                ))
              ) : (
                <p className="opacity-60">No recommendations yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}