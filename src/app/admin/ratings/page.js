"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, User, Film, MoreHorizontal } from "lucide-react";

const reviews = [
  { id: 1, user: "Dwayne Johnson", movie: "Black Adam", rating: 4, comment: "Loved the action, specifically the visual effects.", date: "Just now", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, user: "Cillian Murphy", movie: "Oppenheimer", rating: 5, comment: "A masterpiece of modern cinema.", date: "10m ago", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, user: "Margot Robbie", movie: "Barbie", rating: 4, comment: "Colorful, fun, and surprisingly deep.", date: "2h ago", avatar: "https://i.pravatar.cc/150?u=3" },
];

export default function RatingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Ratings & Reviews
          </h1>
          <p className="text-zinc-500 mt-1">Manage user feedback and score distributions.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          <button className="px-4 py-1.5 rounded-lg bg-netflix-red text-white text-sm font-bold shadow-lg">Recent</button>
          <button className="px-4 py-1.5 rounded-lg text-zinc-500 hover:text-white text-sm font-medium transition-colors">Top Rated</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((rev, idx) => (
          <motion.div 
            key={rev.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-[2rem] space-y-4 hover:border-netflix-red/30 transition-all shadow-xl group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-zinc-700 overflow-hidden bg-zinc-800">
                  <img src={rev.avatar} alt={rev.user} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">{rev.user}</h3>
                  <p className="text-zinc-500 text-xs">{rev.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < rev.rating ? "text-amber-500 fill-amber-500" : "text-zinc-700"}`} 
                  />
                ))}
              </div>
            </div>

            <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-3.5 h-3.5 text-netflix-red" />
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{rev.movie}</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed italic italic-style font-medium">"{rev.comment}"</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-emerald-500 transition-colors text-xs font-bold">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Approve
                </button>
                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-netflix-red transition-colors text-xs font-bold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Reply
                </button>
              </div>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
