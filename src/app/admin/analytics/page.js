"use client";

import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { TrendingUp, Users, Eye, Play, Calendar } from "lucide-react";

const data = [
  { name: "Mon", users: 400, sessions: 2400 },
  { name: "Tue", users: 300, sessions: 1398 },
  { name: "Wed", users: 200, sessions: 9800 },
  { name: "Thu", users: 278, sessions: 3908 },
  { name: "Fri", users: 189, sessions: 4800 },
  { name: "Sat", users: 239, sessions: 3800 },
  { name: "Sun", users: 349, sessions: 4300 },
];

const COLORS = ["#E50914", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

export default function AnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Advanced Analytics
          </h1>
          <p className="text-zinc-500 mt-1">Glean insights from your platform's usage patterns.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all">
            <Calendar className="w-4 h-4 text-netflix-red" />
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Sessions", value: "12,402", icon: Play, color: "text-red-500" },
          { label: "New Registrations", value: "854", icon: Users, color: "text-blue-500" },
          { label: "Avg. Watch Time", value: "45m", icon: Eye, color: "text-emerald-500" },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-zinc-950 border border-zinc-800 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-tight">{item.label}</p>
                <h3 className="text-2xl font-black text-white">{item.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-[2.5rem]">
          <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-netflix-red" />
            User Engagement Trends
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: "rgba(229, 9, 20, 0.05)" }}
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "12px" }}
                />
                <Bar dataKey="users" fill="#E50914" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-[2.5rem]">
          <h2 className="text-lg font-bold mb-8">Device Distribution</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Mobile", value: 45 },
                    { name: "Desktop", value: 30 },
                    { name: "Tablet", value: 15 },
                    { name: "Smart TV", value: 10 },
                  ]}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0,1,2,3].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
