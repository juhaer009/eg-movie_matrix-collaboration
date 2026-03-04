"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleReset}
        className="p-6 shadow-lg rounded-xl w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Reset Password
        </button>

        {message && <p className="text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}