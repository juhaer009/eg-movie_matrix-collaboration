// app/error.js
"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 p-6">
      <AlertCircle className="h-24 w-24 text-red-600 mb-4" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-red-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>

      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="mb-6 text-center">
        Sorry, an unexpected error occurred. Try refreshing the page or go back home.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
        <Link href="/">
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}