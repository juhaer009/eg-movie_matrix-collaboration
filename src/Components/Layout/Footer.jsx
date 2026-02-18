"use client";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        
        {/* Left: Logo & Description */}
        <div className="flex flex-col gap-2">
          <Logo  />
          <p className="text-sm md:text-base">
            Stream your favorite movies and shows anytime, anywhere. Stay updated with your watchlist and enjoy unlimited entertainment.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Explore</h4>
            <Link href="/" className="hover:text-yellow-300">Home</Link>
            <Link href="/movies" className="hover:text-yellow-300">Movies</Link>
            <Link href="/watchlist" className="hover:text-yellow-300">Watchlist</Link>
            <Link href="/genres/action" className="hover:text-yellow-300">Genres</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Account</h4>
            <Link href="/profile" className="hover:text-yellow-300">Profile</Link>
            <Link href="/subscription" className="hover:text-yellow-300">Subscription</Link>
            <Link href="/history" className="hover:text-yellow-300">History</Link>
          </div>
        </div>

        {/* Right: Social & Contact */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Contact Us</h4>
          <p className="text-sm md:text-base">support@example.com</p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-yellow-300">Facebook</a>
            <a href="#" className="hover:text-yellow-300">Twitter</a>
            <a href="#" className="hover:text-yellow-300">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-pink-700 pt-4 text-center text-sm md:text-base">
        &copy; {new Date().getFullYear()} Your Movie Streaming Platform. All rights reserved.
      </div>
    </footer>
  );
}
