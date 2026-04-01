"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
      <div className="min-h-screen bg-zinc-950 text-white selection:bg-netflix-red selection:text-white flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden transition-all duration-300 lg:pl-64">
        <AdminNavbar onMenuClick={toggleSidebar} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
