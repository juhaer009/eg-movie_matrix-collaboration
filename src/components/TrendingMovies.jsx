



"use client";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";


const TrendingMovies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/trending")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>loading...</p>;

  const Card = ({ item }) => (
    <div className="relative min-w-[180px] h-[260px] rounded-xl overflow-hidden group cursor-pointer">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
        <FaPlay className="text-red-600 text-3xl" />
      </div>
    </div>
  );

  const Section = ({ title, items }) => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {items?.slice(0, 5).map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-10">
         Trending & Popular
      </h1>

      <Section title=" Trending Movies" items={data?.movieTrending} />
      <Section title=" Popular Movies" items={data?.moviePopular} />

      <Section title=" Trending Series" items={data?.seriesTrending} />
      <Section title=" Popular Series" items={data?.seriesPopular} />

      <Section title=" Kids Trending" items={data?.kidsTrending} />
      <Section title=" Kids Popular" items={data?.kidsPopular} />
    </div>
  );
};

export default TrendingMovies;