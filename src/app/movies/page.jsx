import MovieCard from "@/components/ui/MovieCard";
import React from "react";

async function fetchMovies() {
  try {
    const res = await fetch("http://localhost:5000/movies")

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

const Movies = async () => {
  const movies = await fetchMovies();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">All Movies</h1>
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {movies.map((movie, index) => (
            <MovieCard key={movie._id || index} movie={movie}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
