
"use client"

import { useEffect, useState } from "react";
import useAuth from "./useauth";
const useRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchUserRole = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/${user.email}`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        setUserRole(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email]);

  const role = userRole?.role || null;
  const photoUrl = userRole?.photoURL || null;
  return { role, photoUrl , loading};
};
export default useRole;
