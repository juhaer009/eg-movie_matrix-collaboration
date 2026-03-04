'use client'
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Authcontex/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firbase';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [loding, setLoading] = useState(true)
    const [user, setUser] = useState(true)

    // google login
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

    const Updateprofile = (Profile) => {
        return updateProfile(auth.currentUser, Profile)
    };
          const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        user,
        GoogleSignIN,
        GoogleSignOut,
        loding,
        setLoading,
        registerUser,
        signInUser,
        Updateprofile,
        forgotPassword

    }
    return (
        <AuthContext value={authInfo}>
            {
                children
            }
        </AuthContext>
    );
};

export default AuthProvider;