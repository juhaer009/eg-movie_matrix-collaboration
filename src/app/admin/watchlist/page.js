"use client";

import { motion } from "framer-motion";
import { Bookmark, Film, User, Clock, Search, MoreHorizontal } from "lucide-react";

const watchlistData = [
  { id: 1, user: "Alex Rivers", movie: "Inception", date: "2 mins ago", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 2, user: "Sarah Kona", movie: "Interstellar", date: "1 hour ago", thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop" },
  { id: 3, user: "John Doe", movie: "The Batman", date: "3 hours ago", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
  { id: 4, user: "Emma Wilson", movie: "Oppenheimer", date: "5 hours ago", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
];

export default function WatchlistPage() {
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

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Watchlist Activity
          </h1>
          <p className="text-zinc-500 mt-1">Real-time monitoring of user saved content.</p>
        </div>
        <div className="relative group w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-netflix-red transition-colors" />
          <input 
            type="text" 
            placeholder="Search activity..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-netflix-red/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {watchlistData.map((data) => (
          <motion.div 
            key={data.id}
            variants={item}
            whileHover={{ scale: 1.01 }}
            className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 hover:border-netflix-red/30 transition-all shadow-lg"
          >
            <div className="w-12 h-16 rounded-lg overflow-hidden border border-zinc-700 group-hover:border-netflix-red/50 transition-colors shadow-2xl flex-shrink-0">
              <img src={data.thumbnail} alt={data.movie} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-sm font-medium">User:</span>
                <span className="text-white text-sm font-bold truncate">{data.user}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Bookmark className="w-3.5 h-3.5 text-netflix-red fill-netflix-red" />
                <span className="text-white font-medium text-base truncate">Added "{data.movie}"</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-2 pr-2 border-r border-zinc-800 mr-2">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                <Clock className="w-3 h-3" />
                {data.date}
              </div>
              <span className="px-2 py-0.5 rounded-full bg-netflix-red/10 border border-netflix-red/20 text-netflix-red text-[10px] font-black uppercase tracking-tighter">
                Live
              </span>
            </div>

            <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
