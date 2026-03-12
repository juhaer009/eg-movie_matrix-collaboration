"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Mail,
  Calendar,
  Star,
  PlayCircle,
  Clock,
  Cpu,
  Edit3,
  Save,
  X
} from "lucide-react";
import Loading from "../loading";
import useAuth from "@/hook/useauth";

export default function ProfilePage() {
  const { user: firebaseUser, Updateprofile } = useAuth();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        console.log("Logged-in Backend User Data:", data); // Debugging line
        setUser(data);

        // Use a more robust check for names and photos with Firebase Fallback
        const effectiveName = data?.name || data?.displayName || firebaseUser?.displayName || "";
        const effectivePhoto = data?.photoURL || data?.photo || firebaseUser?.photoURL || "";
        setName(effectiveName);
        setPhoto(effectivePhoto);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      }
    };
    fetchUser();
  }, []);

  // Fallback Sync: If Firebase data arrives later, update the fields if they are still empty
  useEffect(() => {
    if (firebaseUser) {
      if (!name) setName(firebaseUser.displayName || "");
      if (!photo) setPhoto(firebaseUser.photoURL || "");
    }
  }, [firebaseUser, name, photo]);

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, photoURL: photo }),
      });
      const data = await res.json();

      if (res.ok) {
        // Update the user state manually since backend returns a message
        setUser(prev => ({ ...prev, name, photoURL: photo }));

        // SYNC WITH FIREBASE (Updates Navbar instantly)
        if (Updateprofile) {
          try {
            await Updateprofile({ displayName: name, photoURL: photo });
          } catch (syncErr) {
            console.error("Firebase Sync Error:", syncErr);
          }
        }
      }
      setEditing(false);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* LEFT COLUMN: User Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
              <div className="flex flex-col items-center text-center">
                {/* Avatar Section */}
                <div className="relative mb-6">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <img
                      src={firebaseUser?.photoURL || photo}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover ring-4 ring-primary/30 shadow-2xl"
                    />
                    {user.premium && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg ring-4 ring-[#0f172a]">
                        <Star className="w-5 h-5 text-black fill-current" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Identity Info */}
                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full space-y-3 mb-4"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-primary text-left font-bold uppercase tracking-wider">Photo URL</label>
                        <Input
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-primary text-left font-bold uppercase tracking-wider">Display Name</label>
                        <Input
                          className="bg-white/5 border-white/10 text-white"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2 mb-6"
                    >
                      <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        {name || user?.name || user?.displayName || firebaseUser?.displayName || "Member"}
                      </h1>
                      <div className="flex flex-col gap-1 items-center opacity-70 text-sm">
                        <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user?.email || firebaseUser?.email}</span>
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="w-full flex flex-col gap-3">
                  <Button
                    onClick={editing ? handleUpdate : () => setEditing(true)}
                    className={`w-full h-12 rounded-xl font-bold transition-all ${editing
                      ? "bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30"
                      : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                  >
                    {editing ? <><Save className="w-4 h-4 mr-2" /> Save Changes</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</>}
                  </Button>

                  {editing && (
                    <Button variant="ghost" onClick={() => setEditing(false)} className="text-slate-400 hover:text-white">
                      Cancel
                    </Button>
                  )}

                  <Button
                    disabled={user.premium}
                    onClick={() => !user.premium && (window.location.href = "/payment")}
                    className={`w-full h-12 rounded-xl font-bold mt-2 shadow-lg transition-all ${user.premium
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:shadow-yellow-500/20 text-black"
                      }`}
                  >
                    {user.premium ? "Premium Member" : "Upgrade to Premium"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dashboard Stats & Movies */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Movies Watched", value: user.stats?.watched || 0, icon: PlayCircle, color: "text-blue-400" },
                { label: "Total Hours", value: user.stats?.hours || 0, icon: Clock, color: "text-emerald-400" },
                { label: "AI Compatibility", value: `${user.stats?.aiMatch || 0}%`, icon: Cpu, color: "text-purple-400" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4 group"
                >
                  <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recently Watched */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  Recently Watched
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {user.recentMovies?.length > 0 ? (
                  user.recentMovies.map((movie, idx) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative rounded-2xl overflow-hidden aspect-[2/3] border border-white/10"
                    >
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-bold truncate">{movie.title}</p>
                        <Button size="sm" className="mt-2 h-8 bg-white text-black hover:bg-primary hover:text-white transition-colors">Play</Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-slate-500">No watch history yet</p>
                  </div>
                )}
              </div>
            </section>

            {/* Favorite Genres */}
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <span className="w-8 h-1 bg-purple-500 rounded-full" />
                Favorite Genres
              </h2>
              <div className="flex flex-wrap gap-3">
                {user.genres?.length > 0 ? (
                  user.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No genres selected</p>
                )}
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}