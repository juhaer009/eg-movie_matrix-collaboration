"use client";

import { motion } from "framer-motion";
import { Film, Eye, Star, Edit3, Trash2, Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

const movies = [
  { id: 1, title: "Inception", year: 2010, rating: 8.8, views: "1.2M", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 2, title: "Interstellar", year: 2014, rating: 8.6, views: "2.5M", poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop" },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, views: "3.8M", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
  { id: 4, title: "Oppenheimer", year: 2023, rating: 8.5, views: "5.1M", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
  { id: 5, title: "The Last Dance", year: 2020, rating: 9.1, views: "850K", poster: "https://images.unsplash.com/photo-1542204172-3c1f1ec4bdec?w=400&h=600&fit=crop" },
  { id: 6, title: "Joker", year: 2019, rating: 8.4, views: "4.2M", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop" },
];

export default function MoviesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-400 to-zinc-800">
            Movie Library
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">Manage your cinematic collection and metadata.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-netflix-red transition-colors" />
            <input 
              type="text" 
              placeholder="Search library..."
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-netflix-red/50 w-full md:w-64 transition-all"
            />
          </div>
          <button className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl text-zinc-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <Link href="/admin/add-movie" className="bg-netflix-red hover:bg-netflix-red-hover text-white px-6 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-netflix-red/30">
            <Plus className="w-5 h-5" />
            ADD CONTENT
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies.map((movie, idx) => (
          <motion.div 
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -10 }}
            className="group relative h-[300px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl"
          >
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" 
            />
            
            {/* Overlay Info */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-zinc-500 text-[10px] font-black">{movie.year}</span>
                <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
                  <Star className="w-2.5 h-2.5 fill-amber-500" />
                  {movie.rating}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-netflix-red transition-all">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button className="p-2 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-rose-600 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* View Stats Badge */}
            <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 px-2 py-1 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="w-2.5 h-2.5 text-zinc-400" />
              <span className="text-[10px] font-bold text-zinc-300 tracking-tighter">{movie.views}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800 p-2 rounded-2xl">
          {[1, 2, 3, "...", 12].map((p, i) => (
            <button 
              key={i}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                p === 1 ? "bg-netflix-red text-white shadow-lg" : "text-zinc-500 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
