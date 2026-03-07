"use client";

import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Programming Languages",
    accent: "cyan",
    header: "text-cyan-400",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/python.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/cplusplus.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg" },
    ],
  },
  {
    category: "ML & Deep Learning",
    accent: "blue",
    header: "text-blue-400",
    skills: [
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/pytorch.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/tensorflow.svg" },
      { name: "Keras", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/keras.svg" },
      { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/scikitlearn.svg" },
      { name: "Hugging Face", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/huggingface.svg" },
    ],
  },
  {
    category: "Data Science",
    accent: "violet",
    header: "text-violet-400",
    skills: [
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/numpy.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/pandas.svg" },
      { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/matplotlib.svg" },
      { name: "Plotly", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/plotly.svg" },
    ],
  },
  {
    category: "AI / NLP Tools",
    accent: "teal",
    header: "text-teal-400",
    skills: [
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/opencv.svg" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/jupyter.svg" },
      { name: "LangChain", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/langchain.svg" },
      { name: "W&B", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/weightsandbiases.svg" },
    ],
  },
  {
    category: "Dev Tools & Infrastructure",
    accent: "cyan",
    header: "text-cyan-400",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/git.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/docker.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/linux.svg" },
    ],
  },
  {
    category: "Cloud & Platforms",
    accent: "blue",
    header: "text-blue-400",
    skills: [
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/googlecloud.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/amazonaws.svg" },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/streamlit.svg" },
    ],
  },
];

// CSS filter to tint monochrome simple-icons SVGs on white
const iconFilters: Record<string, string> = {
  cyan:   "brightness(0) invert(83%) sepia(70%) saturate(600%) hue-rotate(152deg) brightness(105%)",
  blue:   "brightness(0) invert(50%) sepia(90%) saturate(700%) hue-rotate(200deg) brightness(110%)",
  violet: "brightness(0) invert(55%) sepia(60%) saturate(800%) hue-rotate(255deg) brightness(95%)",
  teal:   "brightness(0) invert(70%) sepia(50%) saturate(500%) hue-rotate(145deg) brightness(105%)",
};

const tileBorders: Record<string, string> = {
  cyan:   "border-cyan-500/15 hover:border-cyan-500/50 hover:bg-cyan-500/5",
  blue:   "border-blue-500/15 hover:border-blue-500/50 hover:bg-blue-500/5",
  violet: "border-violet-500/15 hover:border-violet-500/50 hover:bg-violet-500/5",
  teal:   "border-teal-500/15 hover:border-teal-500/50 hover:bg-teal-500/5",
};

export default function SkillsSection() {
  return (
    <section className="py-28 relative bg-[#040410]" id="skills">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-4">Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Expertise
            </span>
          </h2>
          <p className="text-foreground/50 font-sans text-sm max-w-xl mx-auto">
            Technologies and tools used across research, development, and data science projects.
          </p>
        </motion.div>

        <div className="space-y-12">
          {SKILL_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIdx * 0.06 }}
              viewport={{ once: true }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`font-mono text-[11px] uppercase tracking-widest ${group.header}`}>
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Icon grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: groupIdx * 0.04 + skillIdx * 0.04 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.07, y: -3 }}
                    className={`group flex flex-col items-center gap-3 p-4 bg-[#07070f] border rounded-xl cursor-default transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] ${tileBorders[group.accent]}`}
                  >
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        width={36}
                        height={36}
                        style={{ filter: iconFilters[group.accent] }}
                        className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-mono text-[9px] text-center text-white/50 group-hover:text-white/80 leading-tight transition-colors duration-150">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle bottom border gradient */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  );
}
