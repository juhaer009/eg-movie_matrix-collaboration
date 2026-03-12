"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const upgradePremium = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/users/update-premium",
          {
            method: "POST",
            credentials: "include", // important for JWT cookie
          }
        );

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          router.push("/profile"); // Go to profile to see premium badge
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

  return <div className="min-h-screen flex items-center justify-center text-white">Processing payment...</div>;
}