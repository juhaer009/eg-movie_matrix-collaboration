
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { useRouter } from "next/navigation";
import { auth } from "@/Firebase/Firebase.init";
// import { auth } from "@/firbase";

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleFollow = () => setIsFollowing(!isFollowing);

  const buttonGradient =
    "linear-gradient(90deg, var(--chart-5), var(--chart-4))";

  // 🔐 Protect Route + Get User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex justify-center items-center text-white bg-background">
      <div className="max-w-4xl w-full">

        <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500 to-pink-700 border border-white/20 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02]">

          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.6)]">
              <img
                src={user.photoURL || "https://i.pravatar.cc/200"}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
          </div>

          {/* Dynamic Name & Email */}
          <h1 className="text-3xl font-bold mt-5 tracking-wide">
            {user.displayName || "User"}
          </h1>
          <p className="opacity-80 mt-1">{user.email}</p>

          {/* AI Badge */}
          <div className="mt-3 px-4 py-1 rounded-full bg-[linear-gradient(90deg, var(--chart-5), var(--chart-4))] text-sm font-medium shadow-md">
            🤖 AI Taste: Cine Explorer
          </div>

          {/* Top Buttons */}
          <div className="flex gap-6 mt-6 flex-wrap justify-center">

            {/* Follow Button */}
            <button
              onClick={handleFollow}
              className="relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-500 group text-white shadow-lg hover:scale-105"
              style={{ background: buttonGradient }}
            >
              <span className="relative z-10">
                {isFollowing ? "✓ Following" : "✨ Follow"}
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500"></span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-500 group text-white shadow-lg hover:scale-105"
              style={{ background: buttonGradient }}
            >
              <span className="relative z-10">⏻ Logout</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500"></span>
            </button>

          </div>

          {/* Stats Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">

            <button
              className="relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-500 group text-white shadow-lg hover:scale-105"
              style={{ background: buttonGradient }}
            >
              <span className="relative z-10">🎬 12 Watchlist</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500"></span>
            </button>

            <button
              className="relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-500 group text-white shadow-lg hover:scale-105"
              style={{ background: buttonGradient }}
            >
              <span className="relative z-10">👀 34 Watched</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500"></span>
            </button>

            <button
              className="relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-500 group text-white shadow-lg hover:scale-105"
              style={{ background: buttonGradient }}
            >
              <span className="relative z-10">🤖 92% AI Match</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500"></span>
            </button>

          </div>

          {/* Favorite Genres */}
          <h3 className="mt-8 font-semibold text-lg">Favorite Genres</h3>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {["Sci-Fi", "Drama", "Action", "Thriller"].map((genre) => (
              <span
                key={genre}
                className="px-4 py-1 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition cursor-pointer"
              >
                {genre}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}