"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SeriesDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [series, setSeries] = useState(null);

  useEffect(() => {
    fetch(`https://movie-matrix-server-one.vercel.app/api/series/${id}`)
      .then((res) => res.json())
      .then((data) => setSeries(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!series) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* 🎬 Banner */}
      <div className="relative">
        <img
          src={series.image}
          className="w-full h-[400px] object-cover opacity-70"
        />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-4xl font-bold">{series.title}</h1>
          <p className="text-gray-300 max-w-xl mt-2">
            {series.description}
          </p>
        </div>
      </div>

      {/* 🎥 Episodes */}
      <div className="p-6">
        {series.seasons?.map((season, sIndex) => (
          <div key={sIndex} className="mb-10">

            <h2 className="text-2xl font-semibold mb-4">
              Season {season.season}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {season.episodes?.map((ep, i) => (
                <div
                  key={`${sIndex}-${i}`}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl hover:scale-105 transition"
                >

                  <img
                    src={ep.image}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <h3 className="mt-3 font-semibold">
                    {ep.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {ep.description}
                  </p>

                  <div className="text-xs text-gray-500 mt-2">
                    ⏱ {ep.time || "N/A"} | ⭐ {ep.rating || "0"}
                  </div>

<button
  onClick={() => router.push(`/episode/${ep._id}`)}
  className="mt-3 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm"
>
  ▶ Play Episode
</button>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

