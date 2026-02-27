"use client";
import Navbar from "@/components/Navbar";
// import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // dark mode default

  return (
    
    // Apply dark/light mode classes dynamically
    <div className={`${isDarkMode ? "dark" : "light"} flex min-h-screen`}>
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Pass toggleSidebar to Navbar */}
        {/* <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
        

        {/* Main content area */}
        <main
          className={`p-6 min-h-screen transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900 text-gray-200" // dark mode
              : "bg-gray-50 text-gray-900" // light mode
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
