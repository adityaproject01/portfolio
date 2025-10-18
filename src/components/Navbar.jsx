import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Aditya M
        </div>
        <div className="hidden md:flex space-x-8">
          {["home", "projects", "skills", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="nav-link px-4 py-2 hover:text-blue-300 transition-colors capitalize"
            >
              {link}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
