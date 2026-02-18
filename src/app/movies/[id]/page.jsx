"use client";

import React from "react";
import { useParams } from "next/navigation";
import { movies } from "@/data/movies";
import Link from "next/link";
import Image from "next/image";

export default function MovieDetailsPage() {
    const params = useParams();
    const movie = movies.find((m) => m.id === params.id);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-200 antialiased overflow-x-hidden min-h-screen">
            <main>
               
                <section className="relative w-full h-[85vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                        style={{
                            backgroundImage: `linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.4) 40%, rgba(15, 23, 42, 0) 100%), url('${movie.image}')`,
                        }}
                    ></div>
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="gradient-primary px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                                <span className="material-symbols-outlined text-sm">
                                    trending_up
                                </span>
                                Trending #1
                            </div>
                            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-semibold uppercase">
                                {movie.genre.split(" / ")[0]}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-semibold uppercase">
                                {movie.duration}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-semibold">
                                2024
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter uppercase">
                            {movie.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
                            {movie.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="gradient-primary hover:opacity-90 transition-opacity flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-primary/20">
                                <span className="material-symbols-outlined">play_arrow</span>
                                Watch Now
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg">
                                <span className="material-symbols-outlined">add</span>
                                Add to Watchlist
                            </button>
                        </div>
                    </div>
                </section>

              
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                    Storyline
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    {movie.description}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                    Director & Cast
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                    {[
                                        { name: "David Nolan", role: "Director", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaUhVapkfr4QnyOsDcEviZd7DkI5mjA2pxvfeP-6i07TorGEU0bUOX9WqmfRIBJ8Pq0HPKyNddbrLmqPfHWsMzrDeovCiPT_PHmMNw2YnxztK1_ZsFtorli-boRctlkyb-Nacti_vQI71W5xsf7voW27odKEOysucUzsGCoCBx2YD5prn7bPgOmKEyUY9-OT0_fNqv6VVWWBCP6FAOZm-oFg6PZ3phK0vSd-jTlG28vu2xXqvHncIUjJgqtPgwBU1lXAhjG8sQukb6" },
                                        { name: "Elena Vance", role: "Commander", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLN8nwmNIflPprE8llz4nfTFGOmIw621Yg2lQtDfN7wfvLsVYDo8LGkwZi80etzXMZOz08Tharo-NX0cd_7VGNs1_5LBwpzpFn60mDrS8WNu3RrveAsKbjPt55mF4Rc4FWdoNYAsljYihQp9LzV2tOl2ci7ui-L8TC8cvyJt3LrrBBy2AfRag8RNDZftQ4r9IQf0KK0edDU_h98tsHuNXJOsDgiRG7oTHAjvz39Iqn-T3bdrbW3FOyrGLZR2OAQ3bxQFh-oxTynHQU" },
                                        { name: "Marcus Thorne", role: "Chief Engineer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiCQAeC7hx0RU8pWJAZRAtwxAKt6rhgyj0ZKaJctN7T_tSz35MbO8-T1LT6_KTGF4tMESXHZB-3K5Wnto98GF9Yww1Nay0kcE0E3TQ9mEltNsfyC0aw_HUSPj-vVaZfZ2GAS3VNCSvsdCIttUtktwGLrFqvUhCq6aDSNNQFHaxqE4qL0XywC067QjHeelB08h_kgmS-rb16GAQZFiluzbU1CtlLBL6zyZvC87u-6FGtSIC6F-fn5jWP1P3wcO6_0VTyi8cynwo0DUF" },
                                        { name: "Dr. Sarah Low", role: "Astrophysicist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiQB_sjaI_iC4FABnYmRiGU7P_Yg29uzk8J3DB3UFOu08NruYIs-ilBhFYfZmOSjqG6NhO-bGH4VDtQhrAL7zby_OEMovEQ8DJc6K-1i3MdLPoa-qI17sL7YwftXbTP8CI_C84V_PFx3oX2TKVgL90rJUMN9xfqVow2FO828K5B-ZbMAItZXm6GP4t9zUYiq3t6Kf6wIEBaqHz1vBBMIACg_mkHFjlqSdD9wNd_So8HfIVFD14kyGayFggVEf0ejOVx2ZvWBEdRw0K" },
                                    ].map((cast, idx) => (
                                        <div key={idx} className="text-center group">
                                            <div
                                                className="w-24 h-24 mx-auto rounded-full border-2 border-white/10 group-hover:border-primary transition-colors overflow-hidden mb-4 bg-cover bg-center"
                                                style={{ backgroundImage: `url('${cast.img}')` }}
                                            ></div>
                                            <h4 className="text-white font-semibold">{cast.name}</h4>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">
                                                {cast.role}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar: Stats Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-card p-8 rounded-2xl border border-white/5 shadow-2xl sticky top-28">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                                            Price
                                        </p>
                                        <p className="text-3xl font-bold text-white">{movie.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                                            IMDb Rating
                                        </p>
                                        <div className="flex items-center gap-1.5 justify-end">
                                            <span className="material-symbols-outlined text-yellow-500 text-xl fill-1">
                                                star
                                            </span>
                                            <span className="text-2xl font-bold text-white">
                                                {movie.imdbRating}
                                            </span>
                                            <span className="text-slate-500 text-sm">/10</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                                        <span className="text-slate-400">Resolution</span>
                                        <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded text-xs uppercase">
                                            4K Ultra HD
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                                        <span className="text-slate-400">HDR Format</span>
                                        <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded text-xs uppercase">
                                            Dolby Vision
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                                        <span className="text-slate-400">Audio</span>
                                        <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded text-xs uppercase">
                                            Atmos 7.1
                                        </span>
                                    </div>
                                </div>
                                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10">
                                    <span className="material-symbols-outlined">share</span>
                                    Share with Friends
                                </button>
                            </div>

                            {/* Additional Details Card (from user's aside) */}
                            <aside className="mt-8">
                                <div className="bg-slate-card p-6 rounded-2xl shadow-xl space-y-6">
                                    <h3 className="text-xl font-bold text-white">Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                                            <span className="text-slate-400 text-sm">Resolution</span>
                                            <span className="font-bold text-blue-400 text-sm uppercase">4K UHD</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                                            <span className="text-slate-400 text-sm">Audio</span>
                                            <span className="text-sm text-white">Dolby Atmos</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                                            <span className="text-slate-400 text-sm">Subtitles</span>
                                            <span className="text-sm text-white">English, Spanish</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4">
                                            <span className="text-slate-400 text-sm">Released</span>
                                            <span className="text-sm text-white">Nov 2023</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-white">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                        </svg>
                                        Download Offline
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* Recommendations Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-accent-blue rounded-full"></span>
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {movies.slice(0, 5).map((m) => (
                            <Link key={m.id} href={`/movies/${m.id}`} className="group cursor-pointer">
                                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 relative shadow-lg">
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-5xl">
                                            play_circle
                                        </span>
                                    </div>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${m.image}')` }}
                                    ></div>
                                </div>
                                <h3 className="text-white font-bold group-hover:text-primary transition-colors line-clamp-1">
                                    {m.title}
                                </h3>
                                <p className="text-slate-500 text-sm">{m.genre.split(" / ")[0]} • {m.duration}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
