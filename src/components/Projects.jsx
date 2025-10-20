import React from "react";
import { Link } from "react-router-dom";
import calimg from "./img/images/calculator.png";
import todoimg from "./img/images/todo1.png";
import weatherImg from "./img/images/weather.jpg";
import ecommImg from "./img/images/ecommer.jpg";
const projects = [
  
  {
    title: "Ecommerce Dashboard",
    description:
      "Smooth shopping experience with product filtering and order tracking Your one-stop shop for electronics, fashion, and more. Designed for both desktop and mobile users.",
    tech: ["React", "NodeJs", "ExpressJs"],
    colorFrom: "from-pink-500",
    colorTo: "to-blue-600",
    iconPath:ecommImg,
      border: "border-pink-400",
    link: "/ecommerce",
  },
  {
    title: "Responsive Calculator",
    description:
      "A sleek, responsive calculator built with React and CSS. Performs basic arithmetic operations efficiently. and user-friendly interface",
      
    tech: ["React", "CSS3", "JavaScript"],
    iconPath: calimg,
    border: "border-yellow-400",
    link: "/calculator",
  },
  {
    title: "Todo List",
    description:
      "A user-friendly To-Do List app built with React, allowing adding, editing, and deleting tasks with local storage persistence.",
    // tech: ["React", "Node.js", "MongoDB"],
    tech: ["React", "CSS3", "JavaScript"],
    
    iconPath:todoimg,
    border: "border-blue-400",
    link: "/todolist",
  },
  {
    title: "Weather App",
    description:
      "A dynamic weather app built with React and Lottie animations. Displays real-time weather, temperature, and wind info for any city.",
    // tech: ["React", "Redux", "Firebase"],
    tech: ["React", "CSS3", "JavaScript"],

    iconPath:weatherImg,
      
      border: "border-purple-400",
    link: "/weather",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto scrollbar-transparent">
          <div className="flex gap-6 min-w-max snap-x snap-mandatory pb-4">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="w-80 flex-shrink-0 snap-center glass rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div
                  className={`h-48 ${proj.colorFrom} ${proj.colorTo} bg-gradient-to-br rounded-xl mb-6 flex items-center justify-center`}>
                  <img src={proj.iconPath} className="projectImg" alt="" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{proj.title}</h3>
                <p className="text-gray-400 mb-4">{proj.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-opacity-20 rounded-full text-sm"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={proj.link || "#"}
                  className={`block text-center w-full py-2 ${proj.border} border rounded-lg hover:bg-opacity-20 transition-all`}>
                  View Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;


