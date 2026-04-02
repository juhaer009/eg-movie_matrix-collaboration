"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const upgradePremium = async () => {
      try {
        const res = await fetch(
          "https://movie-matrix-server-one.vercel.app/api/users/update-premium",
          {
            method: "POST",
            credentials: "include", // important for sending JWT cookie
          }
        );

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          router.push("/profile");
        } else {
          alert(data.message || "Failed to upgrade premium");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while upgrading premium");
      }
    };

    upgradePremium();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Processing payment...
    </div>
  );
}