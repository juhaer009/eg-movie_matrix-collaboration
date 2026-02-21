"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from '../../public/logo.jpg'

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Movies", path: "/movies" },
    { name: "Reviews", path: "/reviews" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            width={45}
            height={45}
            src={logo}
            alt="Logo"
            className="rounded-lg"
          />
          <h2 className="text-xl font-bold text-white tracking-wide">
            <span className="text-purple-500">Movie</span>Matrix
          </h2>
        </Link>

        {/* Nav Right Side */}
        <div className="flex items-center gap-8">

          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative pb-1 transition duration-300 
                ${
                  isActive
                    ? "text-purple-500"
                    : "text-gray-300 hover:text-purple-400"
                }`}
              >
                {link.name}

                {/* Underline Effect */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 
                  ${
                    isActive
                      ? "bg-purple-500"
                      : "bg-transparent group-hover:bg-purple-400"
                  }`}
                ></span>
              </Link>
            );
          })}

        </div>
      </div>
    </header>
  );
};

export default Navbar;