"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import gsap from "gsap";

const MovieCard = ({ title, image }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.1,
      zIndex: 20,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      zIndex: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-none w-48 h-72 rounded-xl overflow-hidden cursor-pointer transition-shadow"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="192px"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center transition-opacity"
      >
        <div className="bg-red-600 rounded-full p-3 shadow-lg transform scale-90 hover:scale-100 transition-transform">
          <Play className="text-white fill-current" size={32} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-bold text-sm truncate">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
