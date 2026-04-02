// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { Search, Bell, Menu, X, Home, Film, Tv as TvIcon, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { useRouter, usePathname } from "next/navigation";
// import gsap from "gsap";
// import { motion, AnimatePresence } from "framer-motion";
// import { getRoleFromToken } from "@/lib/auth";
// import useAuth from "@/hook/useauth";
// import { cn } from "@/lib/utils";
// import Logo from "@/components/Logo";

// const Navbar = () => {
//   const navRef = useRef(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, GoogleSignOut ,loading} = useAuth();

//   const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

//   const [role, setRole] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [pathname]);

//   // Still need to detect role from the JWT token if present
//   useEffect(() => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
//     if (token) {
//       const userRole = getRoleFromToken(token);
//       setRole(userRole);
//     } else {
//       setRole(null);
//     }
//   }, [user, pathname]);

//   useEffect(() => {
//     gsap.fromTo(
//       navRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
//     );
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("auth_token");
//     GoogleSignOut();
//     router.push("/");
//   };

//   const getDashboardPath = () => {
//     return role === "admin" ? "/admin" : "/dashboard";
//   };

//   if (isDashboard) return null;
//   if (loading) {
//   return null; 
// }

//   return (
//     <nav
//       ref={navRef}
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 transition-all duration-500",
//         scrolled ? "bg-black/95 backdrop-blur-3xl border-white/10" : "bg-gradient-to-b from-black/80 to-transparent border-transparent"
//       )}
//     >
//       {/* Left Side */}
//       <div className="flex items-center gap-4 lg:gap-12">
//         <Link href="/" className="relative z-50">
//           <Logo iconSize={32} textSize="text-xl md:text-2xl" />
//         </Link>

//         <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-zinc-400">
//           {['Movies', 'Series', 'Kids'].map((item) => (
//             <li key={item} className="hover:text-white transition-colors">
//               <Link href={`/${item.toLowerCase()}`}>{item}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right Side */}
//       <div className="flex items-center gap-3 md:gap-6">
//         {/* Search - Hidden on very small screens, shown as icon */}
//         <button className="p-2 text-zinc-400 hover:text-white transition-colors">
//           <Search size={20} />
//         </button>

//         {/* Notification & Auth */}
//         <div className="flex items-center gap-3 md:gap-6">
//           {user && (
//             <button
//               onClick={() => router.push(getDashboardPath())}
//               className="text-zinc-400 hover:text-white transition-transform hover:scale-110 hidden sm:block"
//             >
//               <Bell size={20} />
//             </button>
//           )}

//           {!user ? (
//             <Link href="/login" className="hidden sm:block">
//               <button className="bg-primary px-5 py-1.5 rounded-lg text-white hover:bg-red-700 transition font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
//                 Login
//               </button>
//             </Link>
//           ) : (
//             <div
//               className="relative hidden sm:block"
//               onMouseEnter={() => setDropdownOpen(true)}
//               onMouseLeave={() => setDropdownOpen(false)}
//             >
//               <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-all cursor-pointer overflow-hidden ring-1 ring-white/10">
//                 <AvatarImage src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt={user?.displayName || "User"} />
//                 <AvatarFallback className="bg-primary text-white font-bold text-xs">
//                   {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
//                 </AvatarFallback>
//               </Avatar>

//               <AnimatePresence>
//                 {dropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                     className="absolute right-0 mt-0 pt-3 w-64 z-50"
//                   >
//                     <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-3xl overflow-hidden">
//                       <div className="px-4 py-3 border-b border-white/5 mb-2 bg-gradient-to-br from-white/5 to-transparent rounded-xl">
//                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Identity</p>
//                         <p className="text-sm font-bold text-white truncate">{user?.displayName || user?.email || "User"}</p>
//                         <p className="text-[10px] text-primary uppercase font-black tracking-widest mt-1 bg-primary/10 w-fit px-2 py-0.5 rounded-full">{role === 'admin' ? 'Super Admin' : 'Premium Member'}</p>
//                       </div>

//                       {[
//                         { label: 'My Profile', icon: UserIcon, path: '/profile' },
//                         { label: 'Dashboard', icon: LayoutDashboard, path: getDashboardPath() }
//                       ].map((item) => (
//                         <button
//                           key={item.label}
//                           onClick={() => router.push(item.path)}
//                           className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all mb-1 group"
//                         >
//                           <item.icon size={16} className="group-hover:text-primary transition-colors" />
//                           {item.label}
//                         </button>
//                       ))}

//                       <div className="my-1 border-t border-white/5"></div>

//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 rounded-xl transition-all group"
//                       >
//                         <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
//                         Sign Out
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}

//           {/* Mobile Toggle */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10 backdrop-blur-md active:scale-90 transition-all"
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Drawer */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: '100%' }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//             className="fixed inset-0 z-[49] bg-black/95 backdrop-blur-2xl flex flex-col p-8 pt-28 md:hidden"
//           >
//             {/* Background Glow */}
//             <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

//             {/* Links */}
//             <div className="space-y-6 relative z-10">
//               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4">Master Navigation</p>
//               {[
//                 { label: 'Home', icon: Home, path: '/' },
//                 { label: 'Movies', icon: Film, path: '/movies' },
//                 { label: 'Series', icon: TvIcon, path: '/series' },
//                 { label: 'Kids', icon: Baby, path: '/kids' },
//               ].map((item) => (
//                 <Link
//                   key={item.label}
//                   href={item.path}
//                   className="flex items-center gap-4 text-2xl font-black text-white hover:text-primary transition-colors py-2"
//                 >
//                   <item.icon size={28} className="text-primary" />
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
//               {user ? (
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 mb-6">
//                     <Avatar className="h-14 w-14 ring-2 ring-primary">
//                       <AvatarImage src={user?.photoURL} />
//                       <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-black text-white">{user?.displayName || "Member"}</p>
//                       <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight">{role === 'admin' ? 'Administrator' : 'Premium Member'}</p>
//                     </div>
//                   </div>
//                   <Link href="/profile" className="flex items-center gap-3 w-full py-4 text-lg font-bold text-white bg-white/5 rounded-2xl justify-center border border-white/10">
//                     <UserIcon size={20} /> My Account
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 w-full py-4 text-lg font-black text-primary bg-primary/10 rounded-2xl justify-center border border-primary/20"
//                   >
//                     <LogOut size={20} /> Logout
//                   </button>
//                 </div>
//               ) : (
//                 <Link href="/login" className="flex items-center gap-3 w-full py-5 text-xl font-black text-white bg-primary rounded-3xl justify-center shadow-xl shadow-primary/20 active:scale-95 transition-all">
//                   Get Started <ArrowRight size={24} />
//                 </Link>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;



"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Bell, Menu, X, Home, Film, Tv as TvIcon, User as UserIcon, LogOut, LayoutDashboard, Baby, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { getRoleFromToken } from "@/lib/auth";
import useAuth from "@/hook/useauth";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const Navbar = () => {
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, GoogleSignOut, loading } = useAuth(); // ✅ loading add

  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");
  const [role, setRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Detect role from JWT token
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      const userRole = getRoleFromToken(token);
      setRole(userRole);
    } else {
      setRole(null);
    }
  }, [user, pathname]);

  // GSAP animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    );
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    GoogleSignOut();
    router.push("/");
  };

  const getDashboardPath = () => (role === "admin" ? "/admin" : "/dashboard");

  if (isDashboard) return null;

  // ✅ handle loading state
  if (loading) return null;

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 transition-all duration-500",
        scrolled
          ? "bg-black/95 backdrop-blur-3xl border-white/10"
          : "bg-gradient-to-b from-black/80 to-transparent border-transparent"
      )}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4 lg:gap-12">
        <Link href="/" className="relative z-50">
          <Logo iconSize={32} textSize="text-xl md:text-2xl" />
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-zinc-400">
          {["Movies", "Series", "Kids"].map((item) => (
            <li key={item} className="hover:text-white transition-colors">
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-6">
        <button className="p-2 text-zinc-400 hover:text-white transition-colors">
          <Search size={20} />
        </button>

        <div className="flex items-center gap-3 md:gap-6">
          {user && (
            <button
              onClick={() => router.push(getDashboardPath())}
              className="text-zinc-400 hover:text-white transition-transform hover:scale-110 hidden sm:block"
            >
              <Bell size={20} />
            </button>
          )}

          {!user ? (
            <Link href="/login" className="hidden sm:block">
              <button className="bg-primary px-5 py-1.5 rounded-lg text-white hover:bg-red-700 transition font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                Login
              </button>
            </Link>
          ) : (
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-all cursor-pointer overflow-hidden ring-1 ring-white/10">
                <AvatarImage
                  src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                  alt={user?.displayName || "User"}
                />
                <AvatarFallback className="bg-primary text-white font-bold text-xs">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-0 pt-3 w-64 z-50"
                  >
                    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-3xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/5 mb-2 bg-gradient-to-br from-white/5 to-transparent rounded-xl">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">
                          Identity
                        </p>
                        <p className="text-sm font-bold text-white truncate">
                          {user?.displayName || user?.email || "User"}
                        </p>
                        <p className="text-[10px] text-primary uppercase font-black tracking-widest mt-1 bg-primary/10 w-fit px-2 py-0.5 rounded-full">
                          {role === "admin" ? "Super Admin" : "Premium Member"}
                        </p>
                      </div>

                      {[{ label: "My Profile", icon: UserIcon, path: "/profile" }, { label: "Dashboard", icon: LayoutDashboard, path: getDashboardPath() }].map(
                        (item) => (
                          <button
                            key={item.label}
                            onClick={() => router.push(item.path)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all mb-1 group"
                          >
                            <item.icon size={16} className="group-hover:text-primary transition-colors" />
                            {item.label}
                          </button>
                        )
                      )}

                      <div className="my-1 border-t border-white/5"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 rounded-xl transition-all group"
                      >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10 backdrop-blur-md active:scale-90 transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[49] bg-black/95 backdrop-blur-2xl flex flex-col p-8 pt-28 md:hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Links */}
            <div className="space-y-6 relative z-10">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4">
                Master Navigation
              </p>
              {[
                { label: "Home", icon: Home, path: "/" },
                { label: "Movies", icon: Film, path: "/movies" },
                { label: "Series", icon: TvIcon, path: "/series" },
                { label: "Kids", icon: Baby, path: "/kids" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className="flex items-center gap-4 text-2xl font-black text-white hover:text-primary transition-colors py-2"
                >
                  <item.icon size={28} className="text-primary" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 mb-6">
                    <Avatar className="h-14 w-14 ring-2 ring-primary">
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-black text-white">{user?.displayName || "Member"}</p>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight">
                        {role === "admin" ? "Administrator" : "Premium Member"}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 w-full py-4 text-lg font-bold text-white bg-white/5 rounded-2xl justify-center border border-white/10"
                  >
                    <UserIcon size={20} /> My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full py-4 text-lg font-black text-primary bg-primary/10 rounded-2xl justify-center border border-primary/20"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 w-full py-5 text-xl font-black text-white bg-primary rounded-3xl justify-center shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                  Get Started <ArrowRight size={24} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;