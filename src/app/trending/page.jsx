"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaFire } from "react-icons/fa";
import Loading from "../loading";

const TrendingPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/trending");
        if (!res.ok) throw new Error("Failed to fetch trending content");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching trending:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handlePlay = (item, type) => {
    if (type === "movie") {
      router.push(`/movies/${item._id}`);
    } else if (type === "series") {
      router.push(`/series/${item._id}`);
    } else if (type === "kids") {
      router.push(`/kids`);
    }
  };

  const Card = ({ item, type }) => (
    <div className="relative min-w-[200px] h-[300px] rounded-xl overflow-hidden group cursor-pointer bg-gray-800">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span className="text-yellow-400">⭐ {item.rating || "N/A"}</span>
          <span>|</span>
          <span>{item.genre?.[0] || "N/A"}</span>
        </div>
      </div>

      {/* Play Button on Hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <button
          onClick={() => handlePlay(item, type)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300"
        >
          <FaPlay className="text-2xl ml-1" />
        </button>
      </div>

      {/* Trending Badge */}
      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
        <FaFire /> TRENDING
      </div>
    </div>
  );

  const Section = ({ title, items, type }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FaFire className="text-red-500" /> {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {items.map((item) => (
            <Card key={item._id} item={item} type={type} />
          ))}
        </div>
      </div>
    );
  };

  const getAllTrending = () => {
    if (!data) return [];
    const all = [
      ...(data.movieTrending || []).map((item) => ({ ...item, type: "movie" })),
      ...(data.seriesTrending || []).map((item) => ({ ...item, type: "series" })),
      ...(data.kidsTrending || []).map((item) => ({ ...item, type: "kids" })),
    ];
    return all.slice(0, 12);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            <span className="text-red-500">Trending</span> Now
          </h1>
          <p className="text-gray-400 text-lg">
            Discover what everyone is watching right now
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { id: "all", label: "All Trending" },
            { id: "movies", label: "Movies" },
            { id: "series", label: "Series" },
            { id: "kids", label: "Kids" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "all" && (
          <>
            <Section title="Trending Movies" items={data?.movieTrending} type="movie" />
            <Section title="Trending Series" items={data?.seriesTrending} type="series" />
            <Section title="Trending for Kids" items={data?.kidsTrending} type="kids" />
          </>
        )}
        {activeTab === "movies" && (
          <Section title="Trending Movies" items={data?.movieTrending} type="movie" />
        )}
        {activeTab === "series" && (
          <Section title="Trending Series" items={data?.seriesTrending} type="series" />
        )}
        {activeTab === "kids" && (
          <Section title="Trending for Kids" items={data?.kidsTrending} type="kids" />
        )}
      </div>
    </div>
  );
};

export default TrendingPage;
