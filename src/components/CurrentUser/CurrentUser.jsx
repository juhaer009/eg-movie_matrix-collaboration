// "use client"

// import { auth } from "@/Firebase/Firebase.init";
// import { setAuthuser } from "@/redux/feature/authSlice";
// import { onAuthStateChanged } from "firebase/auth";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const CurrentUser = ({ children }) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
//       dispatch(setAuthuser(CurrentUser));
//     });
//     return () => unsubscribe();
//   }, [dispatch]);
//   return children;
// };

// export default CurrentUser;

"use client"
import { auth } from "@/Firebase/Firebase.init";
import { setAuthuser } from "@/redux/feature/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const CurrentUser = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      dispatch(setAuthuser(CurrentUser));
    });
    return () => unsubscribe();
  }, [dispatch]);
  return children;
};
export default CurrentUser;
