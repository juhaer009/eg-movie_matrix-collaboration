import React from "react";

const MovieCardBtn = () => {
  return (
    <div>
      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 mr-1">
        Details
      </button>

      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
        Book Now
      </button>
    </div>
  );
};

export default MovieCardBtn;
