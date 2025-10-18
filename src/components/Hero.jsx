import React from "react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="floating mb-8">
          <div className="w-48 h-48 mx-auto glass rounded-full neon-glow flex items-center justify-center">
            <svg className="w-24 h-24 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H19V9Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
          Aditya M
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Frontend Engineer • React • DevOps Learner
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="glass px-8 py-4 rounded-full hover-glow font-semibold">View My Work</button>
          <button className="border border-purple-400 px-8 py-4 rounded-full hover:bg-purple-400 hover:bg-opacity-20 transition-all">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
