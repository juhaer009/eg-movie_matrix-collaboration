"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function KidsDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/kids/${id}`);
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-white text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="bg-black min-h-screen p-4">
      <h1 className="text-white text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-white mb-6">{movie.description}</p>

      {movie.video ? (
        <video
          controls
          className="w-full max-w-4xl mx-auto rounded-lg"
          src={`http://localhost:5000${movie.video}`} 
        />
      ) : (
        <p className="text-white">No video available</p>
      )}

      <button
        onClick={() => router.back()}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        Back
      </button>
    </div>
  );
}