
"use client";
import React from "react";
import { FaSearch, FaBell, FaPlus, FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header
      className="
        flex items-center justify-between px-6 py-4
        bg-gray-900 border-b border-gray-800
        text-gray-200
        dark:bg-gray-900 dark:border-gray-800
        light:bg-white light:border-gray-200
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Menu Button */}
        <button
          onClick={toggleSidebar}
          className="
            text-gray-300 text-lg
            hover:text-indigo-400 transition
            dark:text-gray-300
            light:text-gray-600 light:hover:text-indigo-600
          "
        >
          <FaBars />
        </button>

        <div>
          <h1 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
            Welcome back, Alex! Here’s what’s happening today.
          </p>
        </div>
      </div>

      {/* Center Search */}
      <div
        className="
          hidden md:flex items-center px-4 py-2 rounded-lg w-96
          bg-gray-800
          dark:bg-gray-800
          light:bg-gray-100
        "
      >
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search anything..."
          className="
            bg-transparent outline-none w-full text-sm
            text-gray-200 placeholder-gray-400
            dark:text-gray-200
            light:text-gray-700 light:placeholder-gray-400
          "
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          className="
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm
            bg-indigo-600 text-white
            hover:bg-indigo-500 transition
          "
        >
          <FaPlus />
          New
        </button>

        <button className="relative">
          <FaBell className="text-gray-300 text-lg dark:text-gray-300 light:text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-9 h-9 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-200 dark:text-gray-200 light:text-gray-700">
              Alex Johnson
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
