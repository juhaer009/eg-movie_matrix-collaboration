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
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this movie?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Add Movie",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/app/addMovies", {
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

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          title: "Success!",
          text: "🎬 Movie Added Successfully!",
          icon: "success",
          confirmButtonColor: "#9333ea",
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
          title: "Failed!",
          text: "❌ Failed to add movie",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error!",
        text: "⚠ Something went wrong",
        icon: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-purple-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-purple-800/40 rounded-3xl shadow-2xl shadow-purple-900/30 p-10 transition-all duration-500 hover:shadow-purple-700/40">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-10 tracking-wide">
          🎬 Add New Movie
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Movie Title"
            required
            className="input-style"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows="4"
            className="input-style resize-none"
          />

          {/* Image */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="input-style"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Admin Email"
            required
            className="input-style"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (e.g. 2h 15m)"
              required
              className="input-style"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="input-style"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              required
              className="input-style"
            />

            <input
              type="number"
              step="0.1"
              name="imdbRating"
              value={formData.imdbRating}
              onChange={handleChange}
              placeholder="IMDB Rating (0-10)"
              required
              className="input-style"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-700 to-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/40"
          >
            {loading ? "Adding..." : "🚀 Add Movie"}
          </button>

          {message && (
            <p className="text-center text-sm text-purple-300 mt-4 animate-pulse">
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Reusable Input Style */}
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 14px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.4);
          border-radius: 14px;
          color: white;
          outline: none;
          transition: all 0.3s ease;
        }
        .input-style:focus {
          border-color: #a855f7;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
};

export default AddMovie;
