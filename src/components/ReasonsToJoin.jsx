"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Tv, Download, Smartphone, Baby, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    title: "Enjoy on your TV",
    description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, and more.",
    icon: <Tv size={32} />,
    color: "from-red-600 to-red-400",
  },
  {
    title: "Watch Offline",
    description: "Save your favorites easily and always have something to watch on the go.",
    icon: <Download size={32} />,
    color: "from-red-700 to-red-500",
  },
  {
    title: "Watch Everywhere",
    description: "Stream unlimited movies on your phone, tablet, laptop, and TV.",
    icon: <Smartphone size={32} />,
    color: "from-red-800 to-red-600",
  },
  {
    title: "For the Kids",
    description: "Free profiles for kids with their favorite characters in a safe space.",
    icon: <Baby size={32} />,
    color: "from-red-900 to-red-700",
  },
];

const ReasonsToJoin = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // GSAP to update custom properties for the spotlight effect
        gsap.to(card, {
          "--mouse-x": `${x}px`,
          "--mouse-y": `${y}px`,
          duration: 0.3,
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      return () => card.removeEventListener("mousemove", handleMouseMove);
    });
  }, []);

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 py-32 bg-black overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className=" relative z-10 px-4 sm:px-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8 text-left md:text-left">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-mono text-[10px] sm:text-sm tracking-[0.4em] uppercase mb-4 block"
            >
              Master Feature Set
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] md:leading-[0.9]"
            >
              UNLIMITED <span className="text-zinc-600">POSSIBILITIES.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-400 text-base md:text-lg max-w-sm border-l border-white/10 pl-6 leading-relaxed"
          >
            We've redefined streaming to be faster, sharper, and available wherever you are.
          </motion.p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-[1.5px] rounded-[2.5rem] overflow-hidden bg-white/5 transition-all duration-500 h-full"
            >
              {/* Card Content */}
              <div className="relative z-10 bg-zinc-950/90 backdrop-blur-3xl rounded-[2.45rem] p-6 lg:p-8 h-full flex flex-col justify-between border border-white/5">
                <div>
                  {/* Icon Box */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/20 p-[1px] mb-8 group-hover:rotate-6 transition-transform duration-500`}>
                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center text-primary">
                      {reason.icon}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
                    {reason.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-primary transition-colors">
                    Explore Feature
                  </span>
                  <div className="p-2 rounded-full bg-white/5 text-zinc-500 group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-primary/0 group-hover:shadow-primary/20">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 md:mt-24 flex flex-col items-center text-center p-8 md:p-16 lg:p-20 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 relative overflow-hidden group/cta"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="relative z-10 max-w-2xl px-2">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
              Ready to <span className="text-primary italic">Upgrade?</span>
            </h3>
            <p className="text-zinc-400 text-base md:text-lg mb-10 leading-relaxed font-medium">
              Join millions of users and get access to exclusive content,
              4K streaming, and multi-device support today.
            </p>

            <Link href="/payments" className="w-full sm:w-auto">
              <Button className="h-14 md:h-16 w-full sm:w-auto px-10 md:px-12 bg-primary text-white hover:bg-red-700 transition-all duration-500 rounded-2xl text-lg font-black group shadow-2xl shadow-primary/20">
                <Sparkles className="mr-3 group-hover:scale-125 transition-transform" />
                SUBSCRIBE NOW
              </Button>
            </Link>

            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mt-10 font-black">
              Cancel anytime • 30-day money back guarantee
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        section {
          --mouse-x: 0px;
          --mouse-y: 0px;
        }
      `}</style>
    </section>
  );
};

export default ReasonsToJoin;