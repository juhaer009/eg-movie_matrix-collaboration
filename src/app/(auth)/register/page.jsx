"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  ShieldCheck,
  Zap,
  Github,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setCheckd } from "@/redux/feature/checkboxSlice";
import {
  clearError,
  googleLogin,
  registerUser,
} from "@/redux/feature/authSlice";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash, } from "react-icons/fa";
// import { useRouter } from "next/router";
// import { setScale } from "recharts/types/state/layoutSlice";

const RegisterPage = () => {
  const isChecked = useSelector((state) => state.checked.ischecked);
  const { user } = useSelector((state) => state.auth);
  const { error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [passworderror, setPassworderror] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const router = useRouter();
  const [showPassword , setShowPassword]=useState(false)
  

  // const handleGoogleLogin = async () => {
  //   const result = await dispatch(googleLogin());
  //   console.log(result);

  //   if (googleLogin.fulfilled.match(result)) {
  //     const displayName = result.payload.displayName;
  //     const email = result.payload.email;
  //     setName(displayName);
  //     setEmail(email);
  //   }
  //   if (googleLogin.rejected.match(result)) {
  //     console.log(result.payload);
  //     alert(result.payload);
  //   }

  //   // now you need to push user info form here .

  // };

  const handleGoogleLogin = async () => {
    if (loading) return; // prevent multiple clicks

    const result = await dispatch(googleLogin());

    if (googleLogin.fulfilled.match(result)) {
      router.push("/dashboard");
    }

    if (googleLogin.rejected.match(result)) {
      if (result.payload !== "auth/cancelled-popup-request") {
        alert(result.payload);
      }
    }
  };

  // console.log(name);
  // console.log(email);

  // const handleRegisterForm = async (e) => {
  //   e.preventDefault();
  //   const first_name = e.target.first_name.value;
  //   const last_name = e.target.last_name.value;
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   const ischecked = isChecked;

  //   const passwordRegex = /^.{6,}$/;
  //   const regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

  //   let hasError = false;

  //   // Validate first name
  //   if (!first_name) {
  //     setFirstNameError("First name is required");
  //     hasError = true;
  //   } else {
  //     setFirstNameError("");
  //   }

  //   // Validate last name
  //   if (!last_name) {
  //     setLastNameError("Last name is required");
  //     hasError = true;
  //   } else {
  //     setLastNameError("");
  //   }

  //   // Validate email
  //   if (!email) {
  //     setEmailError("Email is required");
  //     hasError = true;
  //   } else if (!/^\S+@\S+\.\S+$/.test(email)) {
  //     setEmailError("Email is not valid");
  //     hasError = true;
  //   } else {
  //     setEmailError("");
  //   }

  //   if (!passwordRegex.test(password)) {
  //     setPassworderror("password must be 6 character long");
  //     return;
  //   }

  //   if (!regex.test(password)) {
  //     setPassworderror("password must be one upercase and one lowercase");
  //     return;
  //   }
  //   setPassworderror("");

  //   if (!isChecked) {
  //     setCheckboxError("You must agree to receive updates");
  //     hasError = true;
  //   } else {
  //     setCheckboxError("");
  //   }

  //   const result = await dispatch(registerUser({ email, password }));
  //   // console.log(result);

  //   if (registerUser.rejected.match(result)) {
  //     return;
  //   }
  //   if (registerUser.fulfilled.match(result)) {
  //     router.push("/dashboard");
  //   }

  //   // now you need to post user info in the database
  // };

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    const first_name = e.target.first_name.value.trim();
    const last_name = e.target.last_name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const ischecked = isChecked;

    const passwordRegex = /^.{6,}$/;
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

    let hasError = false;

    // First Name Validation
    if (!first_name) {
      setFirstNameError("First name is required");
      hasError = true;
    } else {
      setFirstNameError("");
    }

    // Last Name Validation
    if (!last_name) {
      setLastNameError("Last name is required");
      hasError = true;
    } else {
      setLastNameError("");
    }

    // Email Validation
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Email is not valid");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Password Validation
    if (!password) {
      setPassworderror("Password is required");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPassworderror("Password must be at least 6 characters long");
      hasError = true;
    } else if (!regex.test(password)) {
      setPassworderror(
        "Password must contain one uppercase and one lowercase letter",
      );
      hasError = true;
    } else {
      setPassworderror("");
    }

    // Checkbox Validation
    if (!ischecked) {
      setCheckboxError("You must agree to receive updates");
      hasError = true;
    } else {
      setCheckboxError("");
    }

    // 🚨 IMPORTANT PART
    if (hasError) {
      return; // STOP form submission if any error exists
    }

    // If no error, then register
    const result = await dispatch(registerUser({ email, password }));

    if (registerUser.rejected.match(result)) {
      return;
    }

    if (registerUser.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/admin-restricted-operation":
        return "This operation is not allowed.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden w-0 flex-1 lg:block bg-slate-900">
        <div className="absolute inset-0 h-full w-full object-cover">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-12 text-white">
          <div className="mt-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
                New: Version 4.0 is live
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Design your future <br />
                <span className="text-indigo-400">one pixel at a time.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 max-w-md">
                Join 50,000+ developers building the next generation of web
                applications with our intuitive engine.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
              <div className="flex flex-col gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="text-white font-bold">4.9/5</span> from users
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-sm text-slate-400">Enterprise Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start your 14-day free trial today. No credit card required.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-6">
              <form onSubmit={handleRegisterForm} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-500" htmlFor="first-name">
                      First name
                    </Label>
                    <Input
                      id="first-name"
                      name="first_name"
                      placeholder="Jane"
                      className="text-slate-500 focus-visible:ring-indigo-500"
                    />
                    {firstNameError && (
                      <p className="text-red-500 text-xs mt-1">
                        {firstNameError}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-500" htmlFor="last-name">
                      Last name
                    </Label>
                    <Input
                      id="last-name"
                      name="last_name"
                      placeholder="Doe"
                      className="text-slate-500 focus-visible:ring-indigo-500"
                    />
                    {lastNameError && (
                      <p className="text-red-500 text-xs mt-1">
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-500" htmlFor="email">
                    Work Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    className="text-slate-500 focus-visible:ring-indigo-500"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                <div className="space-y-2 relative">
                  <Label className="text-slate-500" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    name="password"
                    type={`${showPassword?"text":"password"}`}
                    placeholder="Enter password"
                    className="text-slate-500 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                  />
                  <div 
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute top-9 right-10">
                   {showPassword?  <FaRegEyeSlash />:<FaRegEye />}
                  </div>
                </div>
                {passworderror && (
                  <p className="text-red-500 text-xs mt-1">{passworderror}</p>
                )}

                <div className="flex items-center space-x-2">
                  {/* <Checkbox
                    id="marketing"
                    className="border-slate-300 data-[state=checked]:bg-indigo-600"
                  /> */}
                  <input
                    type="checkbox"
                    onChange={() => dispatch(setCheckd(!isChecked))}
                    className="checkbox checkbox-sm"
                  />
                  <Label
                    htmlFor="marketing"
                    className="text-xs font-normal text-slate-500 cursor-pointer"
                  >
                    I want to receive product updates and news.
                  </Label>
                </div>
                {checkboxError && (
                  <p className="text-red-500 text-xs mt-1">{checkboxError}</p>
                )}

                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M6.938 4h10.124c1.54 0 2.502 1.667 1.732 3L13.732 18c-.77 1.333-2.694 1.333-3.464 0L5.206 7c-.77-1.333.192-3 1.732-3z"
                      />
                    </svg>

                    <div>
                      <p className="font-medium">Registration Failed</p>
                      <p className="text-red-600">
                        {getFirebaseErrorMessage(error)}
                      </p>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Get Started Free
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="w-full">
                <Button
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleLogin}
                  className="group relative h-12 w-full overflow-hidden rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-50 via-blue-50 to-yellow-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="relative flex items-center justify-center gap-3 font-medium">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
        1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
        3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 
        1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
        20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
        8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 
        2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 
        2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>

                    {loading ? "Signing in..." : "Continue with Google"}
                  </span>
                </Button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
