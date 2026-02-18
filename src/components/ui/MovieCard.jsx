import MovieCardBtn from "./MovieCardBtn";

export default function MovieCard({ movie }) {
  return (
    <div className="group relative w-80 rounded-2xl overflow-hidden bg-zinc-900 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <span className="bg-yellow-500 text-black text-sm px-2 py-1 rounded-lg font-semibold">
            ⭐ {movie.imdbRating}
          </span>
        </div>

        <p className="text-sm text-gray-400">
          {movie.genre} • {movie.duration}
        </p>

        <p className="text-sm text-gray-300 line-clamp-3">
          {movie.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-green-400">
            {movie.price}
          </span>

          <MovieCardBtn />
        </div>
      </div>
    </div>
  );
}
