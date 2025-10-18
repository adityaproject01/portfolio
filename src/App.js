import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const colors = ["#FFD700", "#FF4500", "#FFFFFF", "#1E90FF"];

  const generateSparkles = (count) => {
    const sparkles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 2;
      const top = Math.random() * 100 + "%";
      const left = Math.random() * 100 + "%";
      const delay = Math.random() * 10 + "s";
      const duration = Math.random() * 20 + 10 + "s";
      const radius = Math.random() * 50 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparkles.push(
        <div
          key={i}
          className="sparkle"
          style={{
            width: size + "px",
            height: size + "px",
            top: top,
            left: left,
            backgroundColor: color,
            animationDelay: delay,
            animationDuration: duration,
            position: "absolute",
            borderRadius: "50%",
            transform: `translateX(${radius}px)`,
          }}></div>
      );
    }
    return sparkles;
  };

  return (
    <div className="relative min-h-full bg-gray-900 text-white overflow-hidden">
      {/* Sparkles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {generateSparkles(100)}
      </div>

      {/* Main content */}
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
