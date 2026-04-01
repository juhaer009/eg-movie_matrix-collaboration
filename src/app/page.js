"use client";

import React from "react";
import HeroBanner from "@/components/HeroBanner";
import ReviewSection from "@/components/RevewSection";
import MovieSlider from "@/components/MovieSlider";
import SupremeHero from "@/components/Movieshow";
import ReasonsToJoin from "@/components/ReasonsToJoin";


const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <MovieSlider></MovieSlider>
      <SupremeHero></SupremeHero>
      <ReasonsToJoin></ReasonsToJoin>
      <ReviewSection></ReviewSection>
    </>  );
};

export default HomePage;
