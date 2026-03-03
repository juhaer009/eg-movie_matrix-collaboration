"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Bell, Monitor, Save, RotateCcw } from "lucide-react";

export default function SettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
          System Settings
        </h1>
        <p className="text-zinc-500 mt-1">Configure platform behavior, branding, and security.</p>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
          {/* Settings Nav */}
          <div className="md:col-span-1 border-r border-zinc-800 bg-zinc-950/30 p-4 space-y-2">
            {[
              { label: "General", icon: Monitor, active: true },
              { label: "Security", icon: Shield, active: false },
              { label: "Notifications", icon: Bell, active: false },
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  item.active ? "bg-netflix-red text-white shadow-lg shadow-netflix-red/20" : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 p-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Platform Name</label>
                <input 
                  type="text" 
                  defaultValue="MOVIE MATRIX"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 focus:outline-none focus:border-netflix-red transition-all font-bold text-white shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Admin Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@moviematrix.io"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3 px-4 focus:outline-none focus:border-netflix-red transition-all font-bold text-white shadow-inner"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-6">
                <div className="flex items-center justify-between group">
                  <div>
                    <h4 className="text-white font-bold">Public Registration</h4>
                    <p className="text-zinc-500 text-sm">Allow new users to create accounts.</p>
                  </div>
                  <div className="w-12 h-6 bg-netflix-red rounded-full relative cursor-pointer shadow-lg shadow-netflix-red/30">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold">Maintenance Mode</h4>
                    <p className="text-zinc-500 text-sm">Offline mode for site updates.</p>
                  </div>
                  <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-500 rounded-full transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <button className="flex-1 bg-netflix-red hover:bg-netflix-red-hover text-white py-4 rounded-[1.5rem] font-black text-sm tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-netflix-red/20">
                <Save className="w-4 h-4" />
                SAVE CHANGES
              </button>
              <button className="p-4 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white rounded-[1.5rem] transition-all hover:border-zinc-700">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
