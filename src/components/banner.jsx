"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* Background Glow Effect */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30 top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px]"></div>

      {/* Content */}
      <div className="z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text"
        >
          Welcome to MovieMatrix 🎬
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Discover trending movies, explore ratings, and dive into cinematic
          experiences like never before.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-6"
        >
          <Link
            href="/movies"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition transform duration-300 shadow-lg"
          >
            Explore Movies
          </Link>

          <Link
            href="/trending"
            className="px-8 py-3 rounded-full border border-gray-400 hover:bg-white hover:text-black transition duration-300"
          >
            Trending Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
