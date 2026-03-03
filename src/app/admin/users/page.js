"use client";

import { motion } from "framer-motion";
import { Users, Mail, Shield, MoreVertical, Search, UserPlus, Filter, Trash2, Edit2 } from "lucide-react";

const users = [
  { id: 1, name: "Alex Rivers", email: "alex@example.com", role: "User", joined: "Oct 12, 2024", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sarah Kona", email: "sarah@example.com", role: "Moderator", joined: "Nov 05, 2024", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "John Doe", email: "john@example.com", role: "Admin", joined: "Jan 20, 2024", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "User", joined: "Feb 14, 2025", avatar: "https://i.pravatar.cc/150?u=4" },
];

export default function UsersPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-600">
            User Directory
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">Manage permissions and monitor user growth.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-netflix-red transition-colors" />
            <input 
              type="text" 
              placeholder="Search users..."
              className="bg-zinc-900 border border-zinc-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-netflix-red/50 w-full md:w-64 transition-all"
            />
          </div>
          <button className="bg-netflix-red hover:bg-netflix-red-hover text-white px-6 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-netflix-red/30">
            <UserPlus className="w-5 h-5" />
            INVITE USER
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] bg-zinc-950/50">
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Joined</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {users.map((user, idx) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-zinc-800/20 transition-colors group cursor-default"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl overflow-hidden border border-zinc-800 group-hover:border-netflix-red/50 transition-all">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm group-hover:text-netflix-red transition-colors">{user.name}</p>
                        <p className="text-zinc-500 text-xs flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      user.role === 'Admin' ? 'bg-netflix-red/10 border-netflix-red/30 text-netflix-red' : 
                      user.role === 'Moderator' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 
                      'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-zinc-400 text-sm font-medium">{user.joined}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-netflix-red transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
