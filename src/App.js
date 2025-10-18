import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";

function App() {
  return (
    <div className="relative min-h-full overflow-x-hidden font-inter text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* 3D Particle Animated Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="pt-20">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
