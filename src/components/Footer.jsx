"use client";

import Link from "next/link";
import Image from "next/image";
import logo from '../../public/logo.jpg'
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  // Don't show public footer on dashboard/admin pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b30f8301dead397608ecab0d1b62de1d08b6568
    <footer className="bg-gradient-to-br from-[#140f1f] via-[#1f1633] to-[#2a1f4a] text-gray-300 pt-12 pb-6 border-t border-purple-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={logo}
              width={50}
              height={50}
              alt="MovieMatrix Logo"
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold text-white tracking-wide">
              MovieMatrix
            </h2>
<<<<<<< HEAD
=======
    <footer className="relative backdrop-blur-xl bg-black/40 border-t border-white/10 text-gray-300 pt-16 pb-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Image
                  src={logo}
                  width={52}
                  height={52}
                  alt="MovieMatrix Logo"
                  className="rounded-xl ring-2 ring-purple-500/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20"></div>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Movie</span>
                <span className="text-white">Matrix</span>
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Discover, review and explore your favorite movies in one place. Stream unlimited entertainment.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <span className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors">
                    {social.charAt(0)}
                  </span>
                </Link>
              ))}
            </div>
>>>>>>> a67107fed105704c3c8638e705c9ff46f7059991
=======
>>>>>>> 6b30f8301dead397608ecab0d1b62de1d08b6568
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'Movies', href: '/movies' },
                { name: 'Reviews', href: '/reviews' },
                { name: 'Feedback', href: '/feedback' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms & Conditions', href: '#' },
                { name: 'Contact', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50 group-hover:bg-pink-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on new releases and exclusive content.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MovieMatrix. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
