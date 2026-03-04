"use client";

const movies = [
  {
    title: "The Dark Knight",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    rating: "9.0",
  },
  {
    title: "Inception",
    image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=80",
    rating: "8.8",
  },
  {
    title: "Interstellar",
    image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
    rating: "8.7",
  },
  {
    title: "Avengers",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    rating: "8.4",
  },
  {
    title: "Joker",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
    rating: "8.5",
  },
];

export default function TrendingSection() {
  return (
    <section className="py-20 px-6">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 className="text-5xl font-black text-white">
            Trending Now
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        <p className="text-gray-400 text-lg ml-8">Discover what everyone's watching</p>
      </div>

      {/* Movie Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="group relative rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500"
          >
            {/* Glassmorphic Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full rounded-3xl bg-black"></div>
            </div>

            {/* Movie Image */}
            <div className="relative h-[420px] overflow-hidden rounded-3xl">
              <img
                src={movie.image}
                alt={movie.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 backdrop-blur-xl bg-black/40 border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-bold text-sm">{movie.rating}</span>
              </div>

              {/* Play Button - Shows on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>

              {/* Movie Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-bold mb-2 drop-shadow-lg">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="px-3 py-1 rounded-full bg-purple-500/30 backdrop-blur-xl border border-purple-400/30 text-xs text-purple-200 font-semibold">
                    HD
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/30 backdrop-blur-xl border border-pink-400/30 text-xs text-pink-200 font-semibold">
                    2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
