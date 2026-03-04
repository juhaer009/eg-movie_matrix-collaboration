"use client";

import Banner from "@/components/banner";
import MovieSlider from "@/components/MovieSlider";
import ReasonsToJoin from "@/components/ReasonsToJoin";
import ReviewSection from "@/components/RevewSection";
import TrendingSection from "@/components/TrendingSection";
import React from "react";

const page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-black text-white overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.15),_transparent_50%)] pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.12),_transparent_60%)] pointer-events-none animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.08),_transparent_70%)] pointer-events-none"></div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="relative z-10">
        <Banner />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 py-12">
            <TrendingSection />
            <MovieSlider />
            <ReasonsToJoin />
            <ReviewSection />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default page;
