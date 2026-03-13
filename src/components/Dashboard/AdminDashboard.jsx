"use client"; 
import React, { useState } from "react";
import { 
  Film, 
  Users, 
  Bookmark, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  MoreVertical, 
  Play, 
  Edit2, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import { 
  LineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from "recharts";

// Mock Data
const stats = [
  { label: "Total Movies", value: "2,458", growth: "+12.5%", trendingUp: true, icon: Film, color: "text-blue-500", glow: "shadow-blue-500/20" },
  { label: "Total Users", value: "48.2k", growth: "+5.2%", trendingUp: true, icon: Users, color: "text-emerald-500", glow: "shadow-emerald-500/20" },
  { label: "Watchlist Saves", value: "89.3k", growth: "-2.1%", trendingUp: false, icon: Bookmark, color: "text-amber-500", glow: "shadow-amber-500/20" },
  { label: "Avg. Rating", value: "4.8", growth: "+0.3%", trendingUp: true, icon: Star, color: "text-netflix-red", glow: "shadow-netflix-red/20" },
];

const chartData = [
  { name: "Jan", views: 4000, uploads: 240 },
  { name: "Feb", views: 3000, uploads: 139 },
  { name: "Mar", views: 2000, uploads: 980 },
  { name: "Apr", views: 2780, uploads: 390 },
  { name: "May", views: 1890, uploads: 480 },
  { name: "Jun", views: 2390, uploads: 380 },
  { name: "Jul", views: 3490, uploads: 430 },
];

const recentMovies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, rating: 8.8, views: "1.2M", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 2, title: "Interstellar", genre: "Sci-Fi", year: 2014, rating: 8.6, views: "2.5M", poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop" },
  { id: 3, title: "The Dark Knight", genre: "Action", year: 2008, rating: 9.0, views: "3.8M", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
];

const watchlistAnalytics = [
  { title: "Dune: Part Two", saves: 85, color: "bg-netflix-red" },
  { title: "Oppenheimer", saves: 72, color: "bg-blue-500" },
  { title: "The Batman", saves: 65, color: "bg-amber-500" },
  { title: "Spider-Man", saves: 58, color: "bg-emerald-500" },
  { title: "Inception", saves: 45, color: "bg-purple-500" },
];

const ratingDistribution = [
  { name: "5 Star", value: 45, color: "#E50914" },
  { name: "4 Star", value: 30, color: "#ef4444" },
  { name: "3 Star", value: 15, color: "#f87171" },
  { name: "2 Star", value: 7, color: "#fca5a5" },
  { name: "1 Star", value: 3, color: "#fee2e2" },
];

import { motion, AnimatePresence } from "framer-motion";

// ... (rest of imports and mock data)

export default function AdminDashboard() {
  const [trailerModal, setTrailerModal] = useState({ isOpen: false, videoId: "" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Dashboard Overview
          </h1>
          <p className="text-zinc-500 mt-1">Monitor your movie streaming platform performance in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-800 transition-all hover:border-zinc-700 flex items-center gap-2 active:scale-95">
            Download Report
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="bg-netflix-red hover:bg-netflix-red-hover text-white px-4 py-2 rounded-lg transition-all font-medium shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-netflix-red/40 active:scale-95">
            + New Content
          </button>
        </div>
      </motion.div>

      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className={`bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group hover:border-netflix-red/30 transition-all hover:shadow-2xl`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trendingUp ? "text-emerald-500" : "text-rose-500"}`}>
                {stat.growth}
                {stat.trendingUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              </div>
            </div>
            <div className="mt-4 relative z-10">
              <p className="text-zinc-500 text-sm font-medium tracking-wide">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 tracking-tight">{stat.value}</h3>
            </div>
            {/* Soft Glow Background */}
            <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity ${stat.color.replace('text', 'bg')}`} />
          </motion.div>
        ))}
      </div>

      {/* 2 & 3. Charts Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Analytics Chart */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Movie Analytics</h2>
            <select className="bg-zinc-950 border border-zinc-800 text-sm rounded-lg px-3 py-1 text-zinc-400 focus:outline-none focus:border-netflix-red">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis 
                  dataKey="name" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)" }}
                  itemStyle={{ color: "#E50914" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#E50914" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ratings Overview Pie Chart */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
          <h2 className="text-lg font-semibold mb-8">Ratings Overview</h2>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {ratingDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-400">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Recent Movies Table */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/20">
            <h2 className="text-lg font-semibold">Recent Movies</h2>
            <button className="text-netflix-red hover:text-red-400 text-sm font-bold transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-800">
                  <th className="px-6 py-4 font-bold">Movie</th>
                  <th className="px-6 py-4 font-bold">Genre</th>
                  <th className="px-6 py-4 font-bold">Rating</th>
                  <th className="px-6 py-4 font-bold">Views</th>
                  <th className="px-6 py-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {recentMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-zinc-800/40 transition-colors group cursor-default">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-14 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-netflix-red/50 transition-colors shadow-lg">
                          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-netflix-red transition-colors">{movie.title}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">{movie.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800 font-bold uppercase tracking-wider">
                        {movie.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        {movie.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400 font-medium">{movie.views}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-netflix-red/20 rounded-xl text-zinc-400 hover:text-netflix-red transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Watchlist Analytics */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
          <h2 className="text-lg font-semibold mb-6">Most Saved Movies</h2>
          <div className="space-y-6">
            {watchlistAnalytics.map((item, idx) => (
              <div key={idx} className="space-y-2 group">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-bold group-hover:text-white transition-colors">{item.title}</span>
                  <span className="text-zinc-500 text-xs font-medium">{item.saves}k saves</span>
                </div>
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden p-[1px] border border-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.saves}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className={`h-full rounded-full ${item.color} shadow-[0_0_10px_rgba(229,9,20,0.3)]`} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-sm font-bold transition-all border border-zinc-800 hover:border-zinc-700 active:scale-95 shadow-xl">
            View Full Report
          </button>
        </div>
      </motion.div>

      {/* 6. Trailer Management Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden group shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 space-y-4 md:space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-netflix-red/10 border border-netflix-red/30 text-netflix-red text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-netflix-red/5">
              Featured Trailer
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white">
              Dynamic Trailer <span className="text-zinc-600">Preview</span>
            </h2>
            <p className="text-zinc-400 max-w-lg leading-relaxed text-base md:text-lg font-medium">
              Seamlessly manage and preview your high-quality movie trailers. Instant playback, precise control, and premium aesthetics.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-5 pt-2 md:pt-4">
              <button 
                onClick={() => setTrailerModal({ isOpen: true, videoId: "dQw4w9WgXcQ" })}
                className="flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black transition-all active:scale-95 shadow-lg"
              >
                <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
                Live Preview
              </button>
              <button className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white hover:bg-zinc-800 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black transition-all active:scale-95">
                Update Video
              </button>
            </div>
          </div>
          <div 
            onClick={() => setTrailerModal({ isOpen: true, videoId: "dQw4w9WgXcQ" })}
            className="w-full lg:w-[450px] aspect-video rounded-2xl md:rounded-3xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center relative overflow-hidden cursor-pointer group/vid shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop" 
              alt="Trailer Backdrop" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover/vid:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
            <div className="p-4 md:p-5 rounded-full bg-netflix-red text-white relative z-10 group-hover/vid:scale-110 transition-transform duration-500 shadow-[0_0_50px_rgba(229,9,20,0.6)] animate-pulse">
              <Play className="w-8 h-8 md:w-10 md:h-10 fill-white ml-1" />
            </div>
          </div>
        </div>
        
        {/* Background glow effects - Hidden on tiny screens for performance */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-netflix-red/5 blur-[120px] -mr-64 -mt-64 group-hover:bg-netflix-red/10 transition-colors duration-1000 hidden md:block" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -ml-64 -mb-64 group-hover:bg-blue-500/10 transition-colors duration-1000 hidden md:block" />
      </motion.div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {trailerModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-10 bg-black/95 backdrop-blur-xl"
            onClick={() => setTrailerModal({ isOpen: false, videoId: "" })}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl md:rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerModal.videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <button 
                className="absolute top-3 right-3 md:top-6 md:right-6 bg-white/10 hover:bg-netflix-red text-white p-2 md:p-3 rounded-xl md:rounded-2xl transition-all backdrop-blur-md active:scale-95 group"
                onClick={() => setTrailerModal({ isOpen: false, videoId: "" })}
              >
                <MoreVertical className="w-5 h-5 md:w-6 md:h-6 rotate-45 group-hover:rotate-0 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
