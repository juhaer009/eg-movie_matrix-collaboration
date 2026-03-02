// app/not-found.js
import Link from "next/link";
import { Film, Home } from "lucide-react";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white text-center px-6">
      
      {/* Icon */}
      <Film className="w-24 h-24 text-red-500 mb-6" />

      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      
      <p className="text-gray-400 mb-8 max-w-md">
        Sorry, the page you are looking for does not exist or has been removed.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        <Home size={18} />
        Go Back Home
      </Link>
    </div>
  );
}