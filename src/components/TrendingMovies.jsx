"use client";

import React from "react";
import MovieCard from "./MovieCard";

const trendingData = [
  {
    title: "The Good Dinosaur",
    image: "https://i.ibb.co.com/7VcP5Jk/images-1-1.jpg",
  },
  {
    title: "Aladdin",
    image: "https://i.ibb.co.com/Wpx2yJ81/aladinmovie.jpg"
  },
  {
    title: "Raya and the Last Dragon",
    image: "https://i.ibb.co.com/LXcfN8D7/images.jpg",
  },
  {
    title: "Luca",
    image: "https://i.ibb.co.com/LhHYn1d7/MV5-BMWMy-NGNl-ZTkt-ODVk-NS00-Zm-My-LTk0-Nm-Ut-NWVj-OWU1-MWMz-ZGMz-Xk-Ey-Xk-Fqc-Gc-V1.jpg",
  },
  {
    title: "Tangled",
    image: "https://i.ibb.co.com/DDbJsKc5/images-1.jpg",
  },
  {
    title: "Coco",
    image: "https://i.ibb.co.com/d0wssKZd/MV5-BMDIy-M2-E2-NTAt-Mzlh-Ny00-ZGUx-LWI1-Njgt-ZDY5-Mzhi-MDc5-NGU3-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
  },
];

const TrendingMovies = () => {
  return (
    <section className="py-10 h- full">
      <h2 className="text-3xl font-bold text-white mb-8">Trending Movies</h2>

      <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {trendingData.map((movie, index) => (
          <MovieCard key={index} title={movie.title} image={movie.image} />
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
