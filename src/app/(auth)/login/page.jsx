// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { KeyRound, Mail, Github, Fingerprint, Lock, ShieldCheck, Loader2 } from 'lucide-react';

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import useAuth from '@/hook/useauth';
// import { useRouter } from 'next/navigation';
// import { getRoleFromToken } from '@/lib/auth';

// const LoginPage = () => {
//   const router = useRouter();
//   const { GoogleSignIN } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       if (!response.ok) {
//         const result = await response.json().catch(() => ({}));
//         throw new Error(result.message || "Invalid email or password");
//       }

//       const result = await response.json();
//       if (result.token) {
//         localStorage.setItem("auth_token", result.token);

//         const role = getRoleFromToken(result.token);
//         if (role === 'admin') {
//           router.push("/admin");
//         } else {
//           router.push("/dashboard");
//         }
//       } else {
//         router.push("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const RegWithGoogle = () => {
//     GoogleSignIN()
//       .then((result) => {
//         router.push('/');
//       })
//       .catch((error) => {
//         if (error.code === 'auth/popup-closed-by-user') {
//           window.location.reload();
//         }
//       });
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//       <div className="relative hidden w-0 flex-1 lg:block bg-indigo-950">
//         <div className="absolute inset-0 h-full w-full">
//           <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[20px_20px] mask-[ellipse_50%_50%_at_50%_50%]" />
//         </div>

//         <div className="relative z-10 flex h-full flex-col p-12 text-white">
//           <div className="mt-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="flex items-center gap-2 mb-4 text-indigo-300">
//                 <Lock className="h-4 w-4" />
//                 <span className="text-sm font-medium uppercase tracking-widest">Secure Access</span>
//               </div>
//               <h1 className="text-5xl font-bold leading-tight">
//                 Welcome back to <br />
//                 <span className="text-indigo-400">Your Entertainment World.</span>
//               </h1>
//               <p className="mt-6 text-lg text-slate-300 max-w-md">
//                 Enter your credentials to access your dashboard, projects, and team settings.
//               </p>
//             </motion.div>

//             <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-8">
//               <div className="flex items-center gap-2">
//                 <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
//                   <Fingerprint className="h-5 w-5 text-indigo-400" />
//                 </div>
//                 <p className="text-xs text-slate-400 uppercase tracking-tight font-semibold">MFA Enabled</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
//                   <ShieldCheck className="h-5 w-5 text-indigo-400" />
//                 </div>
//                 <p className="text-xs text-slate-400 uppercase tracking-tight font-semibold">AES-256 Encrypted</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32">
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mx-auto w-full max-w-sm lg:w-96"
//         >
//           <div className="mb-10">
//             <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign In</h2>
//             <p className="mt-2 text-sm text-slate-500">
//               Please enter your details to continue.
//             </p>
//           </div>

//           <div className="space-y-6">
//             <form onSubmit={handleLogin} className="space-y-5">
//               <div className="space-y-2">
//                 <Label className='text-slate-900' htmlFor="email">Email address</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-900" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="name@company.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="pl-10 h-11 text-slate-900 focus-visible:ring-indigo-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label className='text-slate-900' htmlFor="password">Password</Label>
//                   <Link href="/forgot-password" size="sm" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <div className="relative">
//                   <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-900" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-10 h-11 text-slate-900 focus-visible:ring-indigo-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-indigo-600" />
//                 <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer">
//                   Remember me for 30 days
//                 </Label>
//               </div>

//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//               <Button type="submit" disabled={loading} className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing In...
//                   </>
//                 ) : "Sign In"}
//               </Button>
//             </form>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white px-2 text-slate-400">Secure Social Login</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <Button onClick={RegWithGoogle} variant="outline" className="h-11 border-slate-200 hover:bg-slate-200 transition-colors">
//                 <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
//                 Google
//               </Button>
//               <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-200 transition-colors">
//                 <Github className="mr-2 h-4 w-4" />
//                 GitHub
//               </Button>
//             </div>
//           </div>

//           <p className="mt-10 text-center text-sm text-slate-500">
//             Don&apos;t have an account?{' '}
//             <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">
//               Create an account
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { KeyRound, Mail, Github, Fingerprint, Lock, ShieldCheck, Loader2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from '@/hook/useauth';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const { user, signInUser, GoogleSignIN } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await signInUser(
      formData.email,
      formData.password
    );

    const idToken = await result.user.getIdToken(true);

    const response = await fetch(
      `http://localhost:5000/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
          body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (data.token) {
      localStorage.setItem("auth_token", data.token);
    }

    
    if (data.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }

  } catch (err) {
    console.error("Login Error:", err);
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}; 
const RegWithGoogle = () => {
    GoogleSignIN()
      .then((result) => {
        router.push('/');
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          window.location.reload();
        }
      });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden w-0 flex-1 lg:block bg-indigo-950">
        <div className="absolute inset-0 h-full w-full">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[20px_20px] mask-[ellipse_50%_50%_at_50%_50%]" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-12 text-white">
          <div className="mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4 text-indigo-300">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium uppercase tracking-widest">Secure Access</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Welcome back to <br />
                <span className="text-indigo-400">Your Entertainment World.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-md">
                Enter your credentials to access your dashboard, projects, and team settings.
              </p>
            </motion.div>

            <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-8">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Fingerprint className="h-5 w-5 text-indigo-400" />
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-tight font-semibold">MFA Enabled</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-tight font-semibold">AES-256 Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign In</h2>
            <p className="mt-2 text-sm text-slate-500">
              Please enter your details to continue.
            </p>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label className='text-slate-900' htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-900" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-11 text-slate-900 focus-visible:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className='text-slate-900' htmlFor="password">Password</Label>
                  <Link href="/forgot-password" size="sm" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-900" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-11 text-slate-900 focus-visible:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-indigo-600" />
                <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">Secure Social Login</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={RegWithGoogle} variant="outline" className="h-11 border-slate-200 hover:bg-slate-200 transition-colors">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-200 transition-colors">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

