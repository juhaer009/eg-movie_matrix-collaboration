'use client'
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Authcontex/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firbase';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [loding, setLoading] = useState(true)

const [user, setUser] = useState(null);
const [moviesWatched, setMoviesWatched] = useState(0);

    const GoogleSignIN = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    const GoogleSignOut = () => signOut(auth)

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

   

const Updateprofile = async (profile) => {
   if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, profile); 
   setUser({ ...auth.currentUser }); };

const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const incrementMoviesWatched = () => {
  setMoviesWatched((prev) => prev + 1);
};

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch additional user data (like role) from backend using the cookie
                try {
                    const res = await fetch("https://movie-matrix-server-one.vercel.app/api/users/profile", {
                        credentials: "include"
                    });
                    if (res.ok) {
                        const contentLength = res.headers.get('content-length');
                        if (contentLength && parseInt(contentLength) > 0) {
                            const backendData = await res.json();
                            setUser({ ...currentUser, ...backendData });
                        } else {
                            setUser(currentUser);
                        }
                    } else {
                        setUser(currentUser);
                    }
                } catch (err) {
                    console.error("Backend fetch error:", err);
                    setUser(currentUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => { unSubscribe(); };
    }, []);



    const authInfo = {
        user,
        GoogleSignIN,
        GoogleSignOut,
        loding,
        setLoading,
        registerUser,
        signInUser,
        Updateprofile,
        forgotPassword,
        incrementMoviesWatched,
        moviesWatched
    }
    return (
        <AuthContext.Provider value={authInfo}>
  {children}
</AuthContext.Provider>
    );
};

export default AuthProvider;