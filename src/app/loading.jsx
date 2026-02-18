"use client";

import { useEffect, useState } from "react";
import Logo from "@/Components/Layout/Logo";

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 20000); 

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white gap-6">

      <div className="animate-ping w-60 h-50">
        <Logo />
      </div>

      <h2 className="text-5xl font-semibold animate-pulse">
        Loading...
      </h2>

    </div>
  );
}
