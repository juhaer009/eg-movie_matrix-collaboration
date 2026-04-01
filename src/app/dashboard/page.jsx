"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
    Play,
    Clock,
    Heart,
    Star,
    TrendingUp,
    User,
    Flame,
    Gamepad2,
    Tv,
    Loader2
} from "lucide-react";
import Link from "next/link";
import useAuth from "../../hook/useauth";
import MovieCard from "../../components/ui/MovieCard";

const stats = [
    { label: "Points Earned", value: "840", icon: Star, color: "text-amber-500", shadow: "shadow-amber-500/20" },
    { label: "Movies Watched", value: "112", icon: Play, color: "text-netflix-red", shadow: "shadow-netflix-red/20" },
    { label: "Watchlist", value: "0", icon: Heart, color: "text-emerald-500", shadow: "shadow-emerald-500/20" },
];

const recommendationData = [
    { id: 1, title: "The Cosmic Voyager", genre: "Sci-Fi", rating: 4.8, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
    { id: 2, title: "Urban Legends", genre: "Mystery", rating: 4.5, poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop" },
    { id: 3, title: "After Midnight", genre: "Horror", rating: 4.2, poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
    { id: 4, title: "Neon Dreams", genre: "Cyberpunk", rating: 4.9, poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop" },
];

function TiltCard({ children, stat }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="group relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl"
        >
            {children}
            {/* Dynamic Glow */}
            <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${stat.shadow.replace('/20', '')}`}
                style={{
                    background: `radial-gradient(circle at center, currentColor, transparent 70%)`,
                }}
            />
            <div className={`absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 ${stat.shadow.replace('/20', '')}`} />
        </motion.div>
    );
}

export default function UserDashboard() {
    const { user, loding: authLoading } = useAuth();
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [isLoadingWatchlist, setIsLoadingWatchlist] = useState(true);
    const [watchlistCount, setWatchlistCount] = useState(0);

    // Fetch watchlist movies
    useEffect(() => {
        const fetchWatchlist = async () => {
            if (authLoading || !user?.uid) {
                setIsLoadingWatchlist(false);
                return;
            }

            setIsLoadingWatchlist(true);
            try {
                const response = await fetch(`https://movie-matrix-server-one.vercel.app/api/watchlist/${user.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Watchlist data:", data);
                    setWatchlistMovies(data.watchlist || []);
                    setWatchlistCount(data.count || 0);
                } else {
                    console.error("Failed to fetch watchlist:", response.status);
                }
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            } finally {
                setIsLoadingWatchlist(false);
            }
        };

        fetchWatchlist();
    }, [user?.uid, authLoading]);

    // Update stats with actual watchlist count
    const dynamicStats = [
        { label: "Points Earned", value: "840", icon: Star, color: "text-amber-500", shadow: "shadow-amber-500/20" },
        { label: "Movies Watched", value: "112", icon: Play, color: "text-netflix-red", shadow: "shadow-netflix-red/20" },
        { label: "Watchlist", value: watchlistCount.toString(), icon: Heart, color: "text-emerald-500", shadow: "shadow-emerald-500/20" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-netflix-red/30">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-6 pt-8 pb-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-12"
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 font-geist">
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <Flame className="w-4 h-4 text-netflix-red animate-pulse" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">7 Day Streak!</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                                EYE OF THE <span className="bg-clip-text text-transparent bg-gradient-to-r from-netflix-red to-orange-500">STORM</span>
                            </h1>
                            <p className="text-zinc-500 font-medium text-lg">Your cinematic journey continues. Ready for the next adventure?</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex gap-4">
                            <button className="bg-white text-black px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
                                <Play className="w-4 h-4 fill-black" />
                                CONTINUE WATCHING
                            </button>
                        </motion.div>
                    </div>

                    {/* 3D Stat Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {dynamicStats.map((stat, idx) => (
                            <motion.div key={idx} variants={itemVariants}>
                                <TiltCard stat={stat}>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className={`p-4 rounded-2xl bg-zinc-950 border border-zinc-800 ${stat.color} group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                                            <stat.icon className="w-8 h-8" />
                                        </div>
                                        <TrendingUp className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                    <div className="mt-8 relative z-10">
                                        <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
                                        <h3 className="text-5xl font-black mt-2 tracking-tighter group-hover:text-netflix-red transition-colors">{stat.value}</h3>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Watchlist Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <Heart className="w-6 h-6 text-netflix-red" />
                                MY WATCHLIST
                            </h2>
                            <Link href="/movies" className="text-zinc-500 hover:text-white text-sm font-bold flex items-center gap-1 transition-all">
                                BROWSE MOVIES
                            </Link>
                        </div>

                        {isLoadingWatchlist ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-netflix-red animate-spin" />
                            </div>
                        ) : watchlistMovies.length === 0 ? (
                            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-12 text-center">
                                <Heart className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-zinc-400 mb-2">Your watchlist is empty</h3>
                                <p className="text-zinc-600 mb-6">Start adding movies you want to watch!</p>
                                <Link href="/movies">
                                    <button className="bg-netflix-red text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all">
                                        EXPLORE MOVIES
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {watchlistMovies.map((item) => (
                                    <MovieCard key={item._id || item.movieId} movie={item.movie} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Side Activity Panel */}
                        <div className="lg:col-span-1 space-y-8">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <Clock className="w-6 h-6 text-netflix-red" />
                                ACTIVITY
                            </h2>
                            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-6 space-y-6">
                                {[
                                    { user: "Sarah", action: "shared Interstellar", time: "2h ago", icon: User },
                                    { user: "You", action: "finished Inception", time: "5h ago", icon: Play },
                                    { user: "Mike", action: "rated The Matrix 5★", time: "1d ago", icon: Star },
                                ].map((act, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-white/5 rounded-2xl transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-netflix-red shadow-inner">
                                            <act.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                                                <span className="text-netflix-red font-black">{act.user}</span> {act.action}
                                            </p>
                                            <p className="text-[10px] text-zinc-600 font-bold uppercase mt-0.5">{act.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-[10px] font-black tracking-widest text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
                                    VIEW FRIENDS HUB
                                </button>
                            </div>

                            {/* Promo Card */}
                            <div className="group relative bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:scale-105 transition-all duration-700 cursor-pointer shadow-2xl">
                                <div className="relative z-10 space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                                        <Gamepad2 className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-black">QUEST UNLOCKED</h3>
                                    <p className="text-zinc-400 text-sm font-medium">Watch 3 more Sci-Fi films this weekend to earn the 'Astronaut' badge.</p>
                                </div>
                                {/* Visual Flair */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
