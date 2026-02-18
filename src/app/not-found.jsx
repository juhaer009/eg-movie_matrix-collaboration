"use client";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
    

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center bg-gray-50 px-4">
        <h1 className="text-6xl font-bold text-pink-800 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
          Page Not Found
        </h2>
        <p className="text-center text-gray-500 mb-6 max-w-md">
          Sorry, the page you are looking for does not exist. It might have been removed, renamed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <button className="bg-pink-800 text-white px-6 py-2 rounded hover:bg-pink-700">
            Go Back Home
          </button>
        </Link>
      </main>

    </div>
  );
}
