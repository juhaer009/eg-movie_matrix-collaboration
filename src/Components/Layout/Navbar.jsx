"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Navlink from "./Navlink";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); 
  const nav =<>
    
        <Navlink href="/">Home</Navlink>
  <Navlink href="/about">About</Navlink>
     <Navlink href="/movies">Movies</Navlink>
   <Navlink href="/watchlist">Watchlist</Navlink>
   <Navlink href="/trending">Trending</Navlink>
 <Navlink href="/history">History</Navlink>
 
 <Navlink href="/profile">Profile</Navlink>
    
    </>

  return (
    <nav className="bg-white text-black px-4 py-4 flex items-center justify-between relative sticky top-0 z-50 shadow-md">
    
      <div className="flex items-center gap-2">
      
        <div className="md:hidden relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-2xl focus:outline-none"
          >
            {dropdownOpen ? "✕" : "☰"}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md flex flex-col z-50 border border-gray-200">
              {nav}
            </div>
          )}
        </div>
<Link href="/" className="flex items-center gap-2">
<Logo width={60} height={40}/>
  <span className="text-3xl font-bold text-black">Movie Matrix</span>
</Link>
      </div>

      {/* Center: Desktop Links */}
      <div className="hidden md:flex flex-1 justify-center space-x-6">
        {nav}
      </div>

      {/* Right: Login */}
      <div className="flex items-center gap-2">
        <Link href="/login">
          <button className="btn btn-primary px-4 py-2 rounded  text-white">
            Login
          </button>
        </Link>
         <Link href="/register">
          <button className="btn btn-primary px-4 py-2 rounded text-white">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}
