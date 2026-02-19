<<<<<<< HEAD
import Navbar from "@/Components/Layout/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      
    </div>
  );
}
=======
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
>>>>>>> 178d26141ed293347afff494238f1661194b99a1
