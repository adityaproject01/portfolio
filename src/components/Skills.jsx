import React from "react";

const skillsData = [
  {
    category: "Frontend Development",
    description: "Building beautiful user interfaces",
    color: "text-blue-300",
    emoji: "💻",
    skills: [
      { name: "React", icon: "⚛️", from: "from-blue-400", to: "to-blue-600" },
      { name: "JavaScript", icon: "📜", from: "from-yellow-400", to: "to-yellow-600" },
      { name: "Tailwind CSS", icon: "🎨", from: "from-cyan-400", to: "to-cyan-600" },
      { name: "TypeScript", icon: "🔷", from: "from-blue-500", to: "to-blue-700" },
    ],
  },
  {
    category: "Backend Development",
    description: "Powering applications with robust APIs",
    color: "text-green-300",
    emoji: "⚙️",
    skills: [
      { name: "Node.js", icon: "📦", from: "from-green-400", to: "to-green-600" },
      { name: "Express.js", icon: "🚀", from: "from-gray-600", to: "to-gray-800" },
      { name: "MongoDB", icon: "🍃", from: "from-green-500", to: "to-green-700" },
      { name: "PostgreSQL", icon: "🐘", from: "from-blue-600", to: "to-blue-800" },
    ],
  },
  {
    category: "DevOps & Cloud",
    description: "Deploying and scaling applications",
    color: "text-purple-300",
    emoji: "☁️",
    skills: [
      { name: "Docker", icon: "🐳", from: "from-blue-500", to: "to-blue-700" },
      { name: "AWS", icon: "☁️", from: "from-orange-400", to: "to-orange-600" },
      { name: "CI/CD", icon: "🔄", from: "from-red-500", to: "to-red-700" },
      { name: "Kubernetes", icon: "⚙️", from: "from-purple-500", to: "to-purple-700" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {skillsData.map((cat, idx) => (
            <div key={idx} className="glass rounded-3xl p-8 hover-glow transition-transform duration-300">
              {/* Card Header */}
              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${cat.skills[0].from} ${cat.skills[0].to} rounded-2xl flex items-center justify-center`}>
                  <span className="text-3xl">{cat.emoji}</span>
                </div>
                <h3 className={`text-2xl font-bold ${cat.color}`}>{cat.category}</h3>
                <p className="text-gray-400 mt-2">{cat.description}</p>
              </div>

              {/* Skills */}
              <div className="grid grid-cols-2 gap-4">
                {cat.skills.map((s, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${s.from} ${s.to} rounded-lg flex items-center justify-center`}>
                      <span className="text-lg font-bold">{s.icon}</span>
                    </div>
                    <h4 className="font-semibold text-sm">{s.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
