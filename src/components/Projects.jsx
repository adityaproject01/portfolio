import React from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern React-based shopping platform with real-time inventory management.",
    tech: ["React", "Node.js", "MongoDB"],
    colorFrom: "from-blue-500",
    colorTo: "to-purple-600",
    iconPath: "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z",
    border: "border-blue-400",
  },
  {
    title: "Music Streaming App",
    description: "Spotify-inspired music player with playlist management and social features.",
    tech: ["React", "Redux", "Firebase"],
    colorFrom: "from-purple-500",
    colorTo: "to-pink-600",
    iconPath: "M17,12C17,14.42 16.28,16.65 14.38,18.1L15.79,19.5C18.46,17.33 19.5,14.88 19.5,12C19.5,9.12 18.46,6.67 15.79,4.5L14.38,5.9C16.28,7.35 17,9.58 17,12M1,9V15H4L9,20V4L4,9H1Z",
    border: "border-purple-400",
  },
  {
    title: "DevOps Dashboard",
    description: "Real-time monitoring dashboard for CI/CD pipelines and server metrics.",
    tech: ["React", "Docker", "AWS"],
    colorFrom: "from-pink-500",
    colorTo: "to-blue-600",
    iconPath: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z",
    border: "border-pink-400",
  },
  {
    title: "DevOps Dashboard",
    description: "Real-time monitoring dashboard for CI/CD pipelines and server metrics.",
    tech: ["React", "Docker", "AWS"],
    colorFrom: "from-pink-500",
    colorTo: "to-blue-600",
    iconPath: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z",
    border: "border-pink-400",
  },
  {
    title: "DevOps Dashboard",
    description: "Real-time monitoring dashboard for CI/CD pipelines and server metrics.",
    tech: ["React", "Docker", "AWS"],
    colorFrom: "from-pink-500",
    colorTo: "to-blue-600",
    iconPath: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z",
    border: "border-pink-400",
  },
  // Add more projects here as needed
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
        className="w-80 flex-shrink-0 snap-center glass rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <div className={`h-48 ${proj.colorFrom} ${proj.colorTo} bg-gradient-to-br rounded-xl mb-6 flex items-center justify-center`}>
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d={proj.iconPath} />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-3">{proj.title}</h3>
        <p className="text-gray-400 mb-4">{proj.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {proj.tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-opacity-20 rounded-full text-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <button className={`w-full py-2 ${proj.border} border rounded-lg hover:bg-opacity-20 transition-all`}>
          View Project
        </button>
      </div>
    ))}
  </div>
</div>


      </div>
    </section>
  );
};

export default Projects;
