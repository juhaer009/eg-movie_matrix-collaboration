import Banner from "@/components/banner";
import MovieSlider from "@/components/MovieSlider";
import ReviewSection from "@/components/RevewSection";
import TopRatedSection from "@/components/TopRatedSection";

import TrendingSection from "@/components/TrendingSection";

import React from "react";

const page = () => {
  return (
    <div className="bg-black">
      <Banner></Banner>
      <TrendingSection></TrendingSection>
      <MovieSlider></MovieSlider>
      <TopRatedSection></TopRatedSection>
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default page;
