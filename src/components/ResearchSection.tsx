"use client";

import { motion } from "framer-motion";
import { Brain, Network, Database, Cpu } from "lucide-react";

const RESEARCH_INTERESTS = [
  {
    title: "Deep Learning & Neural Networks",
    description: "Understanding how deep neural networks work, exploring architectures for improved performance on complex tasks.",
    icon: <Brain className="w-8 h-8 text-primary" />,
    color: "from-primary/10",
    border: "border-primary/30",
  },
  {
    title: "Transformer Architectures",
    description: "Implementing and studying transformer-based models including Vision Transformers (ViT) for image recognition tasks.",
    icon: <Network className="w-8 h-8 text-secondary" />,
    color: "from-secondary/10",
    border: "border-secondary/30",
  },
  {
    title: "Natural Language Processing",
    description: "Exploring LLMs, fine-tuning language models, and building domain-specific chatbot systems using LangChain and local inference.",
    icon: <Cpu className="w-8 h-8 text-accent" />,
    color: "from-accent/10",
    border: "border-accent/30",
  },
  {
    title: "Distributed & Edge Computing",
    description: "Working with cluster computing systems, OpenMPI, and distributed processing for real-time resource optimization.",
    icon: <Database className="w-8 h-8 text-primary" />,
    color: "from-primary/10",
    border: "border-primary/30",
  },
];

const FOCUS_TAGS = [
  "Transformer Architectures",
  "Vision Transformers (ViT)",
  "LLM Fine-tuning",
  "NLP",
  "Distributed Computing",
  "Data Science",
];

export default function ResearchSection() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#050510]" id="research">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <p className="font-mono text-xs text-secondary/70 tracking-widest uppercase mb-4">Research</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Focus</span>
          </h2>
          <p className="text-foreground/50 font-sans text-sm max-w-xl mx-auto mb-6">
            Core areas of interest in AI and machine learning that I actively study and build projects around.
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent mx-auto"></div>
        </motion.div>

        {/* Focus Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {FOCUS_TAGS.map((tag) => (
            <motion.a
              key={tag}
              href={`https://www.google.com/search?q=${encodeURIComponent(tag + " AI research")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: "rgba(0,243,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-primary/80 hover:text-primary cursor-pointer transition-all"
            >
              {tag}
            </motion.a>
          ))}
        </motion.div>

        {/* Research Interest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {RESEARCH_INTERESTS.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${topic.color} to-transparent border ${topic.border} backdrop-blur-md rounded-2xl p-8 transition-all duration-300 group`}
            >
              <div className="bg-black/40 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                {topic.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3 text-white group-hover:text-primary transition-colors">
                {topic.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm font-sans">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Publications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#0a0a18] border border-white/5 rounded-2xl p-10 text-center"
          id="publications"
        >
          <h3 className="text-2xl font-bold font-display text-white mb-3">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Publications</span>
          </h3>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />
          <p className="text-foreground/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Research publications are currently in progress and will be listed here once available.
          </p>
          <p className="text-foreground/30 font-mono text-xs mt-4">Coming soon · 2026</p>
        </motion.div>
      </div>
    </section>
  );
}
