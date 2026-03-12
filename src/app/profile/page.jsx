"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "../loading";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
        setName(data?.displayName || data?.name || "");
        setPhoto(data?.photoURL || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/users/update-profile",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName: name, photoURL: photo }),
        },
      );

      const data = await res.json();
      if (res.ok) setUser(data);

      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <Loading></Loading>;

  return (
    <div className="min-h-screen relative flex justify-center items-start pt-32 pb-20 px-4 overflow-hidden">
      {/* BLUR BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{
          backgroundImage:
            "url(https://png.pngtree.com/background/20250102/original/pngtree-dark-textured-background-in-stone-or-concrete-black-or-charcoal-gray-picture-image_15316932.jpg)",
        }}
      ></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-white relative">
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center text-center md:border-r border-white/20 md:pr-8">
              <div className="relative">
                <img
                  src={photo || "/avatar.png"}
                  className="w-36 h-36 rounded-full object-cover border-4 border-white/40 shadow-xl"
                />

                {user.premium && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                      ⭐ PREMIUM
                    </div>
                  </div>
                )}
              </div>

              {editing ? (
                <>
                  <Input
                    className="mt-4 text-black"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="Photo URL"
                  />

                  <Input
                    className="mt-2 text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Display Name"
                  />
                </>
              ) : (
                <h2 className="text-3xl font-bold mt-4">
                  {name || "Anonymous User"}
                </h2>
              )}

              <p className="opacity-80">{user.email}</p>

              <p className="text-sm opacity-70 mt-2">
                Joined:{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>

              <div className="mt-6 flex flex-col gap-4 w-full">
                {editing ? (
                  <Button
                    onClick={handleUpdate}
                    className="transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                  >
                    Save Profile
                  </Button>
                ) : (
                  <Button
                    onClick={() => setEditing(true)}
                    className="transition-all duration-300 cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                  >
                    Edit Profile
                  </Button>
                )}

                <Button
                  className={`font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,215,0,0.6)] ${
                    user.premium
                      ? "bg-gray-400 cursor-not-allowed text-black"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                  onClick={() =>
                    !user.premium && (window.location.href = "/payment")
                  }
                  disabled={user.premium}
                >
                  {user.premium
                    ? "⭐ Premium Active"
                    : "⭐ Get Premium (1000 Tk)"}
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col gap-10">
              {/* STATS */}
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition">
                  🎬 {user.stats?.watched || 0} Movies Watched
                </div>

                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition">
                  ⏱ {user.stats?.hours || 0} Hours Watched
                </div>

                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition">
                  🤖 {user.stats?.aiMatch || 0}% AI Match
                </div>
              </div>

              {/* RECENT MOVIES */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  🕒 Recently Watched
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {user.recentMovies?.length > 0 ? (
                    user.recentMovies.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition"
                      >
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-2 text-sm text-center">
                          {movie.title}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="opacity-60">No recent movies</p>
                  )}
                </div>
              </div>

              {/* GENRES */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  🎭 Favorite Genres
                </h2>

                <div className="flex flex-wrap gap-3">
                  {user.genres?.length > 0 ? (
                    user.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition"
                      >
                        {genre}
                      </span>
                    ))
                  ) : (
                    <p className="opacity-60">No genre selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
