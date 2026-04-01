"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import Logo from "@/components/Logo";
import { Facebook, Twitter, Instagram, Github, Send } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const footerRef = useRef(null);
  const socialRef = useRef([]);

  // GSAP: Magnetic effect for social icons
  useEffect(() => {
    socialRef.current.forEach((el) => {
      if (!el) return;
      const moveIcon = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
      };
      const resetIcon = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      el.addEventListener("mousemove", moveIcon);
      el.addEventListener("mouseleave", resetIcon);
      return () => {
        el.removeEventListener("mousemove", moveIcon);
        el.removeEventListener("mouseleave", resetIcon);
      };
    });
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-white/5 text-zinc-500 pt-20 pb-10 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="px-6 md:px-12 lg:px-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-center sm:text-left">

          <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center sm:items-start">
            <Logo iconSize={40} textSize="text-2xl" />
            <p className="text-sm leading-relaxed text-zinc-600 max-w-xs">
              The ultimate destination for cinephiles. Tracking the heartbeat of
              global cinema with precision and style.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={18} />, color: "hover:text-primary" },
                { icon: <Twitter size={18} />, color: "hover:text-primary" },
                { icon: <Instagram size={18} />, color: "hover:text-primary" },
                { icon: <Github size={18} />, color: "hover:text-white" },
              ].map((social, i) => (
                <div
                  key={i}
                  ref={(el) => (socialRef.current[i] = el)}
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer transition-colors ${social.color}`}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="hidden sm:block">
            <h3 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Navigation</h3>
            <ul className="space-y-5">
              {['Home', 'Movies', 'Reviews', 'Feedback'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-xs font-bold hover:text-primary transition-colors flex items-center group">
                    <span className="h-[1px] w-0 bg-primary mr-0 transition-all group-hover:w-4 group-hover:mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="hidden sm:block">
            <h3 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Legal</h3>
            <ul className="space-y-5">
              {['About Us', 'Privacy Policy', 'Terms', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs font-bold hover:text-primary transition-colors flex items-center group">
                    <span className="h-[1px] w-0 bg-primary mr-0 transition-all group-hover:w-4 group-hover:mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Matrix Newsletter</h3>
            <div className="relative group/input">
              <input
                type="email"
                placeholder="Secure email link"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700 italic"
              />
              <button className="absolute right-2 top-2 p-2.5 bg-primary rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-primary/20">
                <Send size={18} className="text-white" />
              </button>
            </div>
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest leading-relaxed">
              * Join the cinematic elite. By joining, you agree to receive digital marketing communications.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase font-black tracking-widest text-zinc-700">
            © {new Date().getFullYear()} MovieMatrix Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['Status', 'Sitemap', 'Cookie Preferences'].map((link) => (
              <Link key={link} href="#" className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-700 hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;