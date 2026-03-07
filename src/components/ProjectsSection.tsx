"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, Calendar, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "vision-transformer",
    title: "Vision Transformer (ViT)",
    subtitle: "Paper Implementation",
    period: "Jan 2026 – Feb 2026",
    description: "Implemented the research paper 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale'. Made predictions on the MNIST dataset and analyzed where CNNs fall short compared to Vision Transformers.",
    tags: ["Python", "PyTorch", "Matplotlib", "NumPy"],
    gradient: "from-cyan-500/8 to-blue-600/5",
    border: "border-cyan-500/15 hover:border-cyan-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(0,229,255,0.12)]",
    tag_color: "text-cyan-400/80 border-cyan-500/20 bg-cyan-500/5",
    links: { github: "https://github.com/Karsuman4298/Deep-learning/blob/main/Vit_implementation.ipynb" }
  },
  {
    id: "disease-analysis",
    title: "Disease Symptoms Analysis",
    subtitle: "ML Classification System",
    period: "Feb 2025 – Mar 2025",
    description: "Analyzed diseases and their symptoms to identify disease patterns. Achieved above 90% accuracy on test data and predicted over 40 diseases. Built Flask backend with REST APIs to serve model predictions.",
    tags: ["Python", "Flask", "Scikit-learn", "REST API"],
    gradient: "from-blue-500/8 to-indigo-600/5",
    border: "border-blue-500/15 hover:border-blue-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    tag_color: "text-blue-400/80 border-blue-500/20 bg-blue-500/5",
    links: { github: "https://github.com/Karsuman4298" }
  },
  {
    id: "chatbot",
    title: "Domain-Specific Chatbot",
    subtitle: "Local LLM Application",
    period: "Apr 2025 – Jun 2025",
    description: "Collaborated with a team to build a fully local chatbot using Ollama's Gemma3. Used LangChain for memory management and MongoDB for storing prompts and responses without reliance on external servers.",
    tags: ["Python", "LangChain", "MongoDB", "Gradio", "Ollama"],
    gradient: "from-violet-500/8 to-purple-600/5",
    border: "border-violet-500/15 hover:border-violet-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]",
    tag_color: "text-violet-400/80 border-violet-500/20 bg-violet-500/5",
    links: { github: "https://github.com/Karsuman4298" }
  },
  {
    id: "cluster-computing",
    title: "Cluster Computing System",
    subtitle: "Distributed Processing",
    period: "Jun 2025 – Jul 2025",
    description: "Built a distributed cluster computing setup using SSH and OpenMPI to connect multiple nodes for parallel processing. Achieved 23% speedup (2.3s vs 3s) on matrix multiplication compared to a single PC.",
    tags: ["Linux", "Bash", "SSH", "OpenMPI"],
    gradient: "from-teal-500/8 to-cyan-600/5",
    border: "border-teal-500/15 hover:border-teal-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(20,184,166,0.12)]",
    tag_color: "text-teal-400/80 border-teal-500/20 bg-teal-500/5",
    links: { github: "https://github.com/Karsuman4298" }
  }
];

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <section className="py-28 relative overflow-hidden bg-background" id="projects">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Projects</span>
          </h2>
          <p className="text-foreground/50 font-sans text-sm max-w-xl mx-auto">
            Click any card to view details and links.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(project.id)}
              className={`bg-gradient-to-br ${project.gradient} bg-[#080815] border ${project.border} ${project.glow} rounded-2xl p-7 cursor-pointer transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Top bar */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold font-display text-white/90 group-hover:text-white mb-1 transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[11px] text-foreground/40 uppercase tracking-wider">{project.subtitle}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-foreground/40" />
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={11} className="text-foreground/25" />
                <span className="font-mono text-[10px] text-foreground/30">{project.period}</span>
              </div>

              {/* Description */}
              <p className="text-foreground/60 text-sm leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 border rounded-lg ${project.tag_color}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              className={`w-full max-w-xl bg-[#080815] border ${selectedProject.border} rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] relative z-10 p-8`}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-5 right-5 p-1.5 text-white/30 hover:text-white/80 hover:bg-white/5 rounded-lg transition-all duration-150"
              >
                <X size={16} />
              </button>

              <p className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${selectedProject.tag_color}`}>
                {selectedProject.subtitle}
              </p>
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={11} className="text-foreground/25" />
                <span className="font-mono text-[10px] text-foreground/30">{selectedProject.period}</span>
              </div>

              <p className="text-foreground/70 font-sans text-sm leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 border rounded-lg ${selectedProject.tag_color}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <motion.a
                href={selectedProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer"
              >
                <Github size={14} /> View on GitHub
              </motion.a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
