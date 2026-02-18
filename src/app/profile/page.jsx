
"use client";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <div className="card bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl">

          <div className="card-body text-center">

            <div className="avatar mx-auto">
              <div className="w-24 rounded-full ring ring-white ring-offset-2">
                <img src="https://i.pravatar.cc/200" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-2">Rehena</h2>
            <p className="opacity-80">rehena@email.com</p>

            <div className="badge badge-outline mt-2 text-white">
              AI Taste: Cine Explorer
            </div>

            <div className="divider divider-neutral"></div>

            <button className="btn btn-outline text-white">Edit Profile</button>
            <button className="btn btn-error btn-outline mt-2">Logout</button>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <div className="grid grid-cols-3 gap-3 text-center">

              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xl font-bold">12</p>
                <span>Watchlist</span>
              </div>

              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xl font-bold">34</p>
                <span>Watched</span>
              </div>

              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xl font-bold text-success">92%</p>
                <span>AI Match</span>
              </div>

            </div>

            <div className="divider"></div>

            <h3 className="font-semibold">Favorite Genres</h3>

            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">Sci-Fi</span>
              <span className="badge badge-outline">Drama</span>
              <span className="badge badge-outline">Action</span>
              <span className="badge badge-outline">Thriller</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
