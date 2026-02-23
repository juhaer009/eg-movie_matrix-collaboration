"use client"
import Link from "next/link";
import React from "react";

const MovieCardBtn = ({id}) => {
  return (
    <div>
      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 mr-1">
        <Link href={`/movies/${id}`}>Details</Link>
      </button>

      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
        Book Now
      </button>
    </div>
  );
};

export default MovieCardBtn;
