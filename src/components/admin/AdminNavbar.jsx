"use client";

import { Bell, Search, User, ChevronDown, Menu } from "lucide-react";

export default function AdminNavbar({ onMenuClick }) {
    return (
        <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-4 md:px-8 flex items-center justify-between fixed top-0 right-0 left-0 lg:left-64 z-40">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-zinc-400 hover:text-white lg:hidden transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="flex-1 max-w-xl group relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-netflix-red transition-colors" />
                    <input
                        type="text"
                        placeholder="Search movies, users, analytics..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-netflix-red/50 focus:ring-1 focus:ring-netflix-red/30 transition-all placeholder:text-zinc-600"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-netflix-red rounded-full border-2 border-zinc-950 flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-netflix-red opacity-75"></span>
                    </span>
                </button>

                <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-zinc-800 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white group-hover:text-netflix-red transition-colors whitespace-nowrap">Admin User</p>
                        <p className="text-xs text-zinc-500">Super Admin</p>
                    </div>
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden group-hover:border-netflix-red/50 transition-all">
                        <User className="w-5 h-5 text-zinc-500" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors hidden sm:block" />
                </div>
            </div>
        </header>
    );
}
