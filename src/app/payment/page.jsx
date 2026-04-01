"use client";

import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: "MovieMatrix Premium",
          price: 1000,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment request failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-10 rounded-xl text-white text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">⭐ MovieMatrix Premium</h1>
        <p className="mb-6 opacity-80">
          Unlock premium features and enjoy unlimited movie recommendations.
        </p>
        <div className="text-4xl font-bold mb-6">1000 Tk</div>
        <Button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={handlePayment} // ✅ Only in Client Component
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;