"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Film,
    PlusCircle,
    Users,
    Bookmark,
    Star,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Film, label: "Movies", href: "/admin/movies" },
    { icon: PlusCircle, label: "Add Movie", href: "/admin/add-movie" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Bookmark, label: "Watchlist", href: "/admin/watchlist" },
    { icon: Star, label: "Ratings", href: "/admin/ratings" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={onClose}
                />
            )}

            <div className={cn(
                "flex bg-zinc-950 text-zinc-400 w-64 min-h-screen border-r border-zinc-800 flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2" onClick={onClose}>
                        <div className="bg-netflix-red p-1.5 rounded-md">
                            <Film className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">
                            MOVIE<span className="text-netflix-red">MATRIX</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-6 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium",
                                    isActive
                                        ? "bg-netflix-red/10 text-netflix-red border border-red-500/20 shadow-[0_4px_12px_rgba(229,9,20,0.1)]"
                                        : "hover:bg-zinc-900 hover:text-white"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110",
                                    isActive ? "text-netflix-red" : "text-zinc-500 group-hover:text-white"
                                )} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-900 hover:text-white transition-all duration-200 text-zinc-400 text-sm font-medium">
                        <LogOut className="w-4.5 h-4.5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}
