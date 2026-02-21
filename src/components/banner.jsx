"use client";

import React from "react";
import Image from "next/image";
import banner from "../../public/banner.jpg";

const Banner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden bg-[#000]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={banner}
          alt="Movie Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-20 px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Unlimited movies, TV shows, and more
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Starts at USD 2.99. Cancel anytime.
        </p>

        <button className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 transition duration-300 text-white text-lg font-semibold rounded-lg shadow-lg">
          Get Started &rarr;
        </button>
      </div>

      <div className="absolute bottom-[-10px] left-0 w-full overflow-hidden leading-[0] z-30">
        <div className="relative w-[160%] left-[-30%] h-[120px]">
          <div className="absolute top-[48px] w-full h-full bg-[#000]"></div>

          <svg
            viewBox="0 0 500 60"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
          >
            <defs>
              <filter
                id="purple-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <linearGradient
                id="arc-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="#e50914" />
                <stop offset="50%" stopColor="#ff1f2d" />{" "}
                {/* Middle is brighter/bolder */}
                <stop offset="70%" stopColor="#e50914" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            <path
              d="M0,60 Q250,0 500,60"
              fill="none"
              stroke="#9333ea"
              strokeWidth="6"
              className="opacity-40 blur-md"
            />

            <path
              d="M0,60 Q250,10 500,60"
              fill="none"
              stroke="url(#arc-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#purple-glow)"
            />

            <path d="M0,60 Q250,10 500,60 L500,100 L0,100 Z" fill="#000" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Banner;
