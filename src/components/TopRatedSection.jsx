"use client";
import Image from "next/image";

const movies = [
  {
    title: "Inception",
    rating: "8.8",
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Interstellar",
    rating: "8.6",
    image:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "The Batman",
    rating: "8.2",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Avengers",
    rating: "8.4",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Joker",
    rating: "8.5",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TopRatedSection() {
  return (
    <section className="bg-[#0f0f0f] py-16 px-6">
      <h2 className="text-4xl font-bold text-white mb-8">
        ⭐ Top Rated Movies
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative min-w-[220px] group rounded-2xl overflow-hidden cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              width={300}
              height={400}
              className="object-cover w-full h-[320px] group-hover:scale-110 transition-transform duration-500"
            />

            {/* Rating Badge */}
            <div className="absolute top-3 left-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
              ⭐ {movie.rating}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold text-center px-4">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
