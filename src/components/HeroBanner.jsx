"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import TrendingMovies from "./TrendingMovies";

const HeroBanner = () => {
  const mainRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set(mainRef.current, { visibility: "visible" });

    tl.fromTo(
      [titleRef.current, descRef.current, btnsRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, delay: 0.3 }
    );

    const ctx = gsap.context(() => {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30; // More room for parallax
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(bgRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={mainRef}
      className="relative w-full px-6 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 z-0">
        <Image
          ref={bgRef}
          className="absolute inset-[-5%] object-cover"
          src="https://image.tmdb.org/t/p/original/j0MuLOCf7q5o62xGVhN80K36xYS.jpg"
          alt="Hero Movie Backdrop"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col justify-center min-h-screen pt-32 pb-20 md:pt-40">
        <div className="space-y-6 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter drop-shadow-[0_4px_30px_rgba(0,0,0,1)]"
            >
              MONSTERS, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-400 to-primary animate-text-shimmer bg-[length:200%_auto]">
                INC.
              </span>
            </h1>
            <p
              ref={descRef}
              className="text-base md:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed drop-shadow-lg"
            >
              Inside the scare factory, the power comes from children's screams.
              But when a tiny human wanders into their world, Sulley and Mike discover
              the true power of laughter.
            </p>
          </div>

          <div ref={btnsRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-5 pt-3">
            <Button className="h-14 md:h-16 px-8 md:px-10 bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-xl md:rounded-2xl text-base md:text-lg font-black group shadow-xl">
              <Play className="mr-2 fill-current group-hover:scale-110 transition-transform" size={20} />
              Watch Now
            </Button>

            <Button variant="outline" className="h-14 md:h-16 px-8 md:px-10 bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl text-base md:text-lg font-black group">
              <Info className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
              View Details
            </Button>
          </div>
        </div>

        {/* 3. Trending Section inside the flow */}
        <div className="mt-20">
          <TrendingMovies />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;