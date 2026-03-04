

"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


import useAuth from "@/hook/useauth";
import { auth ,db} from "@/firbase";

export default function ProfilePage() {

  const router = useRouter();
  const { user } = useAuth();


  const [currentUser, setCurrentUser] = useState(null);

  const [stats, setStats] = useState({
    watchlist: 0,
    watched: 0,
    aiMatch: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const buttonGradient =
    "linear-gradient(90deg, var(--chart-5), var(--chart-4))";

  // ✅ Fix: Proper useEffect
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {

      if (authUser) {

        setCurrentUser(authUser); 

        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStats(docSnap.data());
        }

      } else {
        router.push("/login");
      }

    });

    return () => unsubscribe();

  }, [router]);

  // ✏ Update Profile
  const handleUpdateProfile = async () => {

    if (!currentUser || !newName) return;

    try {

      await updateProfile(currentUser, { displayName: newName });

      setCurrentUser({
        ...currentUser,
        displayName: newName,
      });

      setIsEditing(false);
      setNewName("");

    } catch (error) {
      console.error(error);
    }

  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!currentUser) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 flex justify-center items-center text-white bg-background">

      <div className="max-w-4xl w-full">

        <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500 to-pink-700 border border-white/20 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02]">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-cyan-400 shadow-lg">
            <img
              src={currentUser.photoURL || "https://i.pravatar.cc/200"}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {isEditing ? (

            <div className="mt-5 flex flex-col items-center gap-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                className="px-4 py-2 rounded-lg text-black"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleUpdateProfile}
                  className="px-4 py-2 bg-green-500 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>

          ) : (

            <>
              <h1 className="text-3xl font-bold mt-5">
                {currentUser.displayName || "User"}
              </h1>

              <p className="opacity-80">{currentUser.email}</p>

              <p className="opacity-60 text-sm mt-2">
                Joined:{" "}
                {new Date(
                  currentUser.metadata.creationTime
                ).toLocaleDateString()}
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-3 px-4 py-1 bg-blue-500 rounded-lg"
              >
                Edit Profile
              </button>
            </>
          )}

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">

            <div className="px-6 py-3 rounded-full shadow-lg"
              style={{ background: buttonGradient }}>
              🎬 {stats.watchlist} Watchlist
            </div>

            <div className="px-6 py-3 rounded-full shadow-lg"
              style={{ background: buttonGradient }}>
              👀 {stats.watched} Watched
            </div>

            <div className="px-6 py-3 rounded-full shadow-lg"
              style={{ background: buttonGradient }}>
              🤖 {stats.aiMatch}% AI Match
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 px-6 py-3 rounded-full shadow-lg"
            style={{ background: buttonGradient }}
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}