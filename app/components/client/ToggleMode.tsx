"use client";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
const ThemeToggleButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <li>
      <button
        aria-label={"toggle_mode"}
        onClick={toggleTheme}
        className="flex items-center justify-center rounded-2xl 
                border-2 border-secondary w-10 h-10 cursor-pointer
                hover:border-active transition duration-300 mt-3 p-3">
        {darkMode ? (
          <IoMdSunny className="text-yellow-500 text-md" size={20} />
        ) : (
          <FaMoon className="text-slate-500 text-md" size={20} />
        )}
      </button>
    </li>
  );
};

export default ThemeToggleButton;
