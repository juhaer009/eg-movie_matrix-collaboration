
"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import EpisodeWatchlistBtn from "@/components/ui/EpisodewatchListBtn/episodewatchlistbtn";


export default function EpisodePage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchEpisode = async () => {
      try {
        setLoading(true);

        
        const res = await fetch(`http://localhost:5000/api/episode/${id}`);
        if (!res.ok) throw new Error("Failed to fetch episode");
        const data = await res.json();
        setEpisode(data);

        
        const favRes = await fetch("http://localhost:5000/api/favourites", { credentials: "include" });
        const favData = await favRes.json();
        setIsFavourite(favData?.some(f => f.movieId === data?.seriesId));

        
        const ratingRes = await fetch("http://localhost:5000/api/ratings", { credentials: "include" });
        const ratingData = await ratingRes.json();
        const userRating = ratingData?.find(r => r.movieId === data?._id);
        setRating(userRating?.rating || 0);

      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

  
    fetchEpisode();
  }, [id]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!episode) return <div className="text-white p-6">Episode not found</div>;

  // Toggle favourite
  const toggleFavourite = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movieId: episode.seriesId }),
      });
      const data = await res.json();
      setIsFavourite(prev => !prev);
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favourite");
    }
  };

  const handleRating = async (newRating) => {
    try {
      const res = await fetch("http://localhost:5000/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movieId: episode._id, rating: newRating }),
      });
      const data = await res.json();
      setRating(newRating);
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update rating");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{episode.title}</h1>
      <p className="text-gray-300 mb-6">{episode.description}</p>

      <video
        src={`http://localhost:5000${episode.video}`}
        controls
        poster={episode.image ? `http://localhost:5000/${episode.image}` : "/placeholder.png"}
        className="w-full max-h-[500px] md:max-h-[600px] rounded-lg mb-4"
      />

      <div className="mt-4 text-gray-400 flex flex-wrap gap-4 items-center">
        <span>⏱ {episode.time || "N/A"}</span>
        <span>⭐ {episode.rating || "0"}</span>
        <span>Season {episode.seasonNumber || "1"}</span>

        {/* Favourite */}
        <button
          onClick={toggleFavourite}
          className={`px-3 py-1 rounded hover:scale-105 transition-transform ${isFavourite ? "bg-red-600" : "bg-gray-700"}`}
        >
          {isFavourite ? "♥ Favourite" : "♡ Add to Favourite"}
        </button>

        {/* Watchlist */}
        {episode._id && episode.seriesId && (
          <EpisodeWatchlistBtn seriesId={episode.seriesId} episodeId={episode._id} />
        )}

        {/* Rating */}
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map(s => (
            <span
              key={s}
              className={`cursor-pointer text-xl ${s <= rating ? "text-yellow-400" : "text-gray-500"}`}
              onClick={() => handleRating(s)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

