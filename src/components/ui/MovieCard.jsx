
// "use client";
// import Image from "next/image";
// import { Play } from "lucide-react";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hook/useauth";
// import MovieCardBtn from "./MovieCardBtn";

// // ✅ parseDuration function central
// export function parseDuration(durationStr) {
//   if (!durationStr) return 0;

//   const hoursMatch = durationStr.match(/(\d+)\s*h/);
//   const minutesMatch = durationStr.match(/(\d+)\s*m/);

//   const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
//   const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

//   if (!hoursMatch && !minutesMatch && durationStr.includes(":")) {
//     const [h, m] = durationStr.split(":").map(Number);
//     return (h || 0) + ((m || 0) / 60);
//   }

//   if (!hoursMatch && !minutesMatch) return Number(durationStr) || 0;

//   return hours + minutes / 60;
// }

// export default function MovieCard({ movie, onWatch }) {
//   const router = useRouter();
//   const { user } = useAuth();

//   const handlePlay = async () => {
//     if (!user || !movie) {
//       alert(" Movie data missing!");
//       return;
//     }

//     const durationWatched = parseDuration(movie.duration);
//     const title = movie.title || "Unknown Title";

//     try {
//       const res = await fetch("https://movie-matrix-server-one.vercel.app/watch-movie", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user._id,
//           movieId: movie._id,
//           title,
//           poster: movie.image || "",
//           durationWatched
//         }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (res.ok) {
//         if (onWatch) onWatch(data);
//         router.push(`/movies/${movie._id}`);
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (err) {
//       console.error("Watch-movie error:", err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="group relative w-80 rounded-2xl overflow-hidden bg-zinc-900 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
//       <div className="relative h-56 w-full overflow-hidden">
//         <Image
//           src={movie.image}
//           alt={movie.title}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div
//             onClick={handlePlay}
//             className="bg-red-600 rounded-full p-3 shadow-lg cursor-pointer transform scale-90 hover:scale-100 transition-transform"
//           >
//             <Play className="text-white fill-current" size={32} />
//           </div>
//         </div>
//       </div>

//       <div className="p-5 space-y-3">
//         <div className="flex justify-between items-start">
//           <h2 className="text-xl font-bold">{movie.title}</h2>
//           <span className="bg-yellow-500 text-black text-sm px-2 py-1 rounded-lg font-semibold">
//             ⭐ {movie.imdbRating}
//           </span>
//         </div>

//         <p className="text-sm text-gray-400">
//           {Array.isArray(movie.genre) ? movie.genre.join(" / ") : movie.genre} • {movie.duration}
//         </p>

//         <p className="text-sm text-gray-300 line-clamp-3">{movie.description}</p>

//         <div className="flex justify-between items-center pt-2">
//           <span className="text-lg font-semibold text-green-400">
//             ${typeof movie.price === "number" ? movie.price.toFixed(2) : movie.price}
//           </span>

//           <MovieCardBtn id={movie._id} initialWatchlistStatus={movie.watchlistStatus} />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hook/useauth";
import MovieCardBtn from "./MovieCardBtn";

// ✅ parseDuration function central
export function parseDuration(durationStr) {
  if (!durationStr) return 0;

  const hoursMatch = durationStr.match(/(\d+)\s*h/);
  const minutesMatch = durationStr.match(/(\d+)\s*m/);

  const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

  if (!hoursMatch && !minutesMatch && durationStr.includes(":")) {
    const [h, m] = durationStr.split(":").map(Number);
    return (h || 0) + ((m || 0) / 60);
  }

  if (!hoursMatch && !minutesMatch) return Number(durationStr) || 0;

  return hours + minutes / 60;
}

export default function MovieCard({ movie, onWatch }) {
  const router = useRouter();
  const { user } = useAuth();

  const handlePlay = async () => {
    if (!user || !movie) {
      alert("Movie data missing!");
      return;
    }

    const durationWatched = parseDuration(movie.duration);
    const title = movie.title || "Unknown Title";

    try {
      const res = await fetch("https://movie-matrix-server-one.vercel.app/watch-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          movieId: movie._id,
          title,
          poster: movie.image || "",
          durationWatched
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        if (onWatch) onWatch(data);
        router.push(`/movies/${movie._id}`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Watch-movie error:", err);
      alert("Something went wrong!");
    }
  };

  if (!movie) {
    // Safety fallback for null movie
    return (
      <div className="w-80 h-80 flex items-center justify-center bg-zinc-900 text-gray-400 rounded-2xl">
        Movie data not available
      </div>
    );
  }

  return (
    <div className="group relative w-80 rounded-2xl overflow-hidden bg-zinc-900 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={movie.image || "/placeholder.png"}
          alt={movie.title || "Movie"}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            onClick={handlePlay}
            className="bg-red-600 rounded-full p-3 shadow-lg cursor-pointer transform scale-90 hover:scale-100 transition-transform"
          >
            <Play className="text-white fill-current" size={32} />
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{movie.title || "Unknown Title"}</h2>
          {movie.imdbRating && (
            <span className="bg-yellow-500 text-black text-sm px-2 py-1 rounded-lg font-semibold">
              ⭐ {movie.imdbRating}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400">
          {Array.isArray(movie.genre) ? movie.genre.join(" / ") : movie.genre || "Unknown Genre"} • {movie.duration || "N/A"}
        </p>

        <p className="text-sm text-gray-300 line-clamp-3">{movie.description || "No description available."}</p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-green-400">
            ${typeof movie.price === "number" ? movie.price.toFixed(2) : movie.price || "N/A"}
          </span>

          <MovieCardBtn id={movie._id} initialWatchlistStatus={movie.watchlistStatus} />
        </div>
      </div>
    </div>
  );
}