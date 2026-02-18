import Image from "next/image";

// make page async for loading support
export default async function AboutPage() {

  // 🔹 Optional: simulate async loading (for testing loading.jsx)
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary">About CineMind AI</h1>

          <p className="text-base-content">
            CineMind AI is an intelligent movie streaming platform that understands
            your taste and delivers personalized recommendations.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow">
              <div className="card-body p-4">
                <h3 className="font-semibold">Smart AI</h3>
                <p className="text-sm opacity-80">Learns your watching behavior.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body p-4">
                <h3 className="font-semibold">Watch History</h3>
                <p className="text-sm opacity-80">Track recently watched movies.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body p-4">
                <h3 className="font-semibold">Personal Watchlist</h3>
                <p className="text-sm opacity-80">Save movies for later.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body p-4">
                <h3 className="font-semibold">Genre Filter</h3>
                <p className="text-sm opacity-80">Browse by categories.</p>
              </div>
            </div>
          </div>

          <p className="text-xs opacity-70">
            Inspired by <a href="https://www.netflix.com" target="_blank" className="underline text-blue-500">Netflix</a> and <a href="https://www.imdb.com" target="_blank" className="underline text-blue-500">IMDb</a>
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="card bg-base-100 shadow-xl">
          <figure className="p-6">
            <Image
              src="/download.png"
              alt="AI Movie"
              width={500}
              height={400}
              className="rounded-xl"
            />
          </figure>

          <div className="card-body text-center">
            <h2 className="card-title justify-center">AI Powered Streaming</h2>
            <p className="text-sm opacity-80">
              Discover movies instantly with intelligent recommendations.
            </p>

            <div className="flex justify-center gap-2 mt-3">
              <span className="badge badge-primary">AI</span>
              <span className="badge badge-secondary">Media</span>
              <span className="badge badge-accent">Next.js</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
