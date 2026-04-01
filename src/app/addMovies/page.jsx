"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    email: "",
    duration: "",
    price: "",
    genre: "",
    imdbRating: "",
  });

  const [loading, setLoading] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Thriller",
    "Romance",
    "Fantasy",
    "Animation",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Confirm Submission",
      text: "Add this movie to the database?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#1e293b",
      confirmButtonText: "Yes, Add Movie",
      background: "#0f172a",
      color: "#e2e8f0",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetch("https://movie-matrix-server-one.vercel.app/app/addMovies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          imdbRating: Number(formData.imdbRating),
        }),
      });

      if (res.ok) {
        await Swal.fire({
          title: "Success!",
          text: "Movie added successfully",
          icon: "success",
          confirmButtonColor: "#0ea5e9",
          background: "#0f172a",
          color: "#e2e8f0",
        });

        setFormData({
          title: "",
          description: "",
          image: "",
          email: "",
          duration: "",
          price: "",
          genre: "",
          imdbRating: "",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Could not add movie",
          icon: "error",
          background: "#0f172a",
          color: "#e2e8f0",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Server connection failed",
        icon: "error",
        background: "#0f172a",
        color: "#e2e8f0",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#0a0f1e] to-[#000814] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Large Blue Glow Ring Behind Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>
      
      {/* Secondary Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px]"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-2xl">
        <div className="backdrop-blur-xl bg-slate-900/40 border border-cyan-500/20 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.15)] p-10 md:p-14 transition-all duration-500 hover:shadow-[0_0_80px_rgba(6,182,212,0.25)] hover:border-cyan-400/30">
          
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
              Add New Movie
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Movie Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Movie Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600"
                placeholder="Enter movie title"
              />
            </div>

            {/* Poster URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Poster URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600"
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600 cursor-pointer"
              >
                <option value="" className="bg-slate-900">Select genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-slate-900">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration & Price */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600"
                  placeholder="2h 15m"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* IMDB Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                IMDB Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="imdbRating"
                value={formData.imdbRating}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600"
                placeholder="7.5"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600"
                placeholder="admin@example.com"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-slate-600 resize-none"
                placeholder="Enter movie description..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Add Movie"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AddMovie;
