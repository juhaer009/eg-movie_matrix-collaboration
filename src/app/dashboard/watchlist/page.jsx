"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, Search, Loader2, Trash2, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import useAuth from "../../../hook/useauth";

export default function DashboardWatchlistPage() {
  const { user, loding: authLoading } = useAuth();
  const [watchlistData, setWatchlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch watchlist data for the logged-in user
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (authLoading) {
        return;
      }

      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/watchlist/${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Dashboard watchlist data:", data);
          setWatchlistData(data.watchlist || []);
        } else {
          console.error("Failed to fetch watchlist:", response.status);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [user?.uid, authLoading]);

  // Filter watchlist based on search query
  const filteredWatchlist = watchlistData.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const genres = Array.isArray(item.movie?.genre) ? item.movie.genre.join(' ') : item.movie?.genre || '';
    return (
      item.movie?.title?.toLowerCase().includes(searchLower) ||
      genres.toLowerCase().includes(searchLower)
    );
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-8 min-h-screen"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            My Watchlist
          </h1>
          <p className="text-zinc-500 mt-1">
            {authLoading ? "Loading..." : user ? `Your saved movies. Total: ${watchlistData.length} items` : "Please login to view your watchlist"}
          </p>
        </div>
        <div className="relative group w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-netflix-red transition-colors" />
          <input 
            type="text" 
            placeholder="Search by movie or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-netflix-red/50 transition-all"
          />
        </div>
      </div>

      {authLoading || isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-netflix-red animate-spin" />
        </div>
      ) : filteredWatchlist.length === 0 ? (
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-12 text-center">
          <Heart className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-400 mb-2">
            {!user ? "Please login" : searchQuery ? "No results found" : "Your watchlist is empty"}
          </h3>
          <p className="text-zinc-600">
            {!user ? "Login to view your watchlist" : searchQuery ? "Try a different search term" : "Start adding movies to your watchlist"}
          </p>
          {user && !searchQuery && (
            <Link href="/movies">
              <button className="mt-6 bg-netflix-red text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all">
                BROWSE MOVIES
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredWatchlist.map((data) => (
            <motion.div 
              key={data._id || `${data.userId}_${data.movieId}`}
              variants={item}
              whileHover={{ scale: 1.01 }}
              className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 hover:border-netflix-red/30 transition-all shadow-lg"
            >
              {data.movie?.image ? (
                <Link href={`/movies/${data.movieId}`}>
                  <div className="w-12 h-16 rounded-lg overflow-hidden border border-zinc-700 group-hover:border-netflix-red/50 transition-colors shadow-2xl flex-shrink-0 cursor-pointer">
                    <img 
                      src={data.movie.image} 
                      alt={data.movie.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                      }}
                    />
                  </div>
                </Link>
              ) : (
                <div className="w-12 h-16 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <Bookmark className="w-6 h-6 text-zinc-600" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mt-1">
                  <Bookmark className="w-3.5 h-3.5 text-netflix-red fill-netflix-red" />
                  <Link href={`/movies/${data.movieId}`}>
                    <span className="text-white font-medium text-lg truncate hover:text-netflix-red transition-colors cursor-pointer">
                      {data.movie?.title || data.movieId}
                    </span>
                  </Link>
                </div>
                {data.movie && (
                  <div className="text-xs text-zinc-500 mt-2 flex items-center gap-2">
                    <span>
                      {Array.isArray(data.movie.genre) 
                        ? data.movie.genre.join(' • ') 
                        : data.movie.genre}
                    </span>
                    {data.movie.duration && (
                      <>
                        <span>•</span>
                        <span>{data.movie.duration}</span>
                      </>
                    )}
                    {data.movie.price && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-500 font-semibold">
                          ${typeof data.movie.price === 'number' ? data.movie.price.toFixed(2) : data.movie.price}
                        </span>
                      </>
                    )}
                    {data.movie.imdbRating && (
                      <>
                        <span>•</span>
                        <span className="text-amber-500 font-semibold">⭐ {data.movie.imdbRating}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex flex-col items-end gap-2 pr-2 border-r border-zinc-800 mr-2">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                  <Clock className="w-3 h-3" />
                  {formatDate(data.createdAt)}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-tighter">
                  Saved
                </span>
              </div>

              <button 
                className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500 transition-all"
                title="Remove from watchlist"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
