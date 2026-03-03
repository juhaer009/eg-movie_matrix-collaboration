"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../public/logo.jpg";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Movies", path: "/movies" },
    { name: "Reviews", path: "/reviews" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            width={45}
            height={45}
            src={logo}
            alt="Logo"
            className="rounded-xl shadow-md group-hover:scale-110 transition duration-300"
          />
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            MovieMatrix
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isActive
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                  }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full -z-10 animate-pulse"></span>
                )}
                {link.name}
              </Link>
            );
          })}

          {/* Auth Buttons */}
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-purple-400 border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition duration-300"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition duration-300"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/10 px-6 py-4 space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="block text-gray-300 hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="block text-purple-400 hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block text-white bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-lg text-center"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;