"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Github } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from '@/hook/useauth';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { GoogleSignIN, registerUser, Updateprofile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const uploadToImageBB = async (imageFile) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMAGEBB_API_KEY";

    if (!apiKey || apiKey === "YOUR_IMAGEBB_API_KEY") {
      throw new Error("ImageBB API Key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.");
    }

    const body = new FormData();
    body.append("image", imageFile);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: body,
      });

      const data = await response.json();

      if (data.success && data.data && data.data.display_url) {
        return data.data.display_url;
      } else {
        console.error("ImageBB Error:", data);
        throw new Error(data.error?.message || "Failed to upload image to ImageBB");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let photoURL = "";
      if (formData.image) {
        photoURL = await uploadToImageBB(formData.image);
      }

      // 1. Create User in Firebase
      await registerUser(formData.email, formData.password);
      
      // 2. Update Firebase Profile with Name and Photo
      await Updateprofile({
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: photoURL
      });

      // 3. Save to Backend Database
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required to receive and send cookies (auth_token)
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          photoURL: photoURL,
          role: "user",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registered successfully:", result);
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const RegWithGoogle = async () => {
    try {
      const result = await GoogleSignIN();
      const user = result.user;

      const response = await fetch("http://localhost:5000/api/users/social-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sync social login");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.error("Google Register Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        window.location.reload();
      } else {
        setError("Social login failed.");
      }
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
                Join 50,000+ developers building the next generation of web applications with our intuitive engine.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
              <div className="flex flex-col gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                  ))}
                </div>
                <p className="text-sm text-slate-400"><span className="text-white font-bold">4.9/5</span> from users</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
            <p className="mt-2 text-sm text-slate-500">
              Start your 14-day free trial today. No credit card required.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className='text-slate-500' htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Jane" onChange={handleChange} value={formData.firstName} className="text-slate-500 focus-visible:ring-indigo-500" required />
                  </div>
                  <div className="space-y-2">
                    <Label className='text-slate-500' htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" onChange={handleChange} value={formData.lastName} className="text-slate-500 focus-visible:ring-indigo-500" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className='text-slate-500' htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" placeholder="jane@company.com" onChange={handleChange} value={formData.email} className="text-slate-500 focus-visible:ring-indigo-500" required />
                </div>

                <div className="space-y-2">
                  <Label className='text-slate-500' htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" onChange={handleChange} value={formData.password} className="text-slate-500 focus-visible:ring-indigo-500" required />
                  <p className="text-[10px] text-slate-400 italic">Must be at least 8 characters.</p>
                </div>

                <div className="space-y-2">
                  <Label className='text-slate-500' htmlFor="profileImage">Profile Image</Label>
                  <Input id="profileImage" type="file" onChange={handleImageChange} className="text-slate-500 focus-visible:ring-indigo-500" accept="image/*" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" className="border-slate-300 data-[state=checked]:bg-indigo-600" />
                  <Label htmlFor="marketing" className="text-xs font-normal text-slate-500 cursor-pointer">
                    I want to receive product updates and news.
                  </Label>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <Button type="submit" disabled={loading} className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  {loading ? "Creating Account..." : "Get Started Free"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={RegWithGoogle} variant="outline" className="h-12 border-slate-200 hover:bg-slate-200">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-200">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">
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
