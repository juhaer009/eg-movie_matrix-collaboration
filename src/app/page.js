import Banner from "@/components/banner";
import MovieSlider from "@/components/MovieSlider";
import ReasonsToJoin from "@/components/ReasonsToJoin";
import ReviewSection from "@/components/RevewSection";
import TrendingSection from "@/components/TrendingSection";
import React from "react";

const page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#050505] to-[#0a0014] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.08),_transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.05),_transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Banner />

        <div className="mt-16 space-y-16">
          <TrendingSection />
          <MovieSlider />
          <ReasonsToJoin></ReasonsToJoin>
          <ReviewSection />
        </div>
      </div>
    </div>
  );
};

export default page;
