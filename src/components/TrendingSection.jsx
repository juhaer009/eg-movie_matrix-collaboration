"use client";


const movies = [
  {
    title: "The Dark Knight",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Inception",
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Interstellar",
    image:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Avengers",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Joker",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TrendingSection() {
  return (
    <section className=" py-16 px-6">
      <h2 className="text-4xl font-bold text-white mb-10 text-center">
        🔥 Trending Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              width={400}
              height={600}
              className="object-cover w-full h-[350px] group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
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
