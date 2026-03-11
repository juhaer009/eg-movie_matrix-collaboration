
"use client";

import useAuth from "@/hook/useauth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, Updateprofile } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);

  const handleUpdate = async () => {
    await Updateprofile({
      displayName: name,
      photoURL: photo,
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
  <div className="bg-gray-500 shadow-xl text-black rounded-2xl w-full max-w-5xl p-8 grid md:grid-cols-3 gap-8">
    
    {/* LEFT SIDE */}
    <div className="flex flex-col items-center   text-center border-r pr-6">
      <img
        src={user?.photoURL || "/avatar.png"}
        className="w-32 h-32 rounded-full object-cover border"
      />

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
          />
        </>
      ) : (
        <h2 className="text-2xl font-bold mt-4">
          {user?.displayName || "Anonymous User"}
        </h2>
      )}

      <p >{user?.email}</p>
      <p className="text-sm  mt-2">
        Joined:{" "}
        {user?.metadata?.creationTime
          ? new Date(user.metadata.creationTime).toLocaleDateString()
          : "Unknown"}
      </p>

      <div className="mt-4">
        {editing ? (
          <Button onClick={handleUpdate}>Save Profile</Button>
        ) : (
          <Button onClick={() => setEditing(true)}>Edit Profile</Button>
        )}
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="md:col-span-2 p-8 flex flex-col gap-10">

      {/* STATS */}
      <div className="flex flex-row flex-wrap gap-4">
        <div className="px-6 py-3 rounded-full shadow-xl bg-cyan-500 hover:scale-105 transition text-white">
          🎬 {user?.stats?.watched || 0} Movies Watched
        </div>
        <div className="px-6 py-3 rounded-full shadow-xl bg-purple-500 hover:scale-105 transition text-white">
          ⏱ {user?.stats?.hours || 0} Hours Watched
        </div>
        <div className="px-6 py-3 rounded-full shadow-xl bg-pink-500 hover:scale-105 transition text-white">
          🤖 {user?.stats?.aiMatch || 0}% AI Match
        </div>
      </div>

      {/* RECENTLY WATCHED */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🕒 Recently Watched</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user?.recentMovies?.length > 0 ? (
            user.recentMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                />
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
          {user?.genres?.length > 0 ? (
            user.genres.map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
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
          {user?.aiRecommendations?.length > 0 ? (
            user.aiRecommendations.map((movie) => (
              <div
                key={movie.id}
                className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                />
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
