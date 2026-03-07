"use client";

import { motion } from "framer-motion";
import { PlayCircle, BookOpen, Clock } from "lucide-react";

export default function ExtrasSection() {
  return (
    <section className="py-24 relative bg-background border-t border-white/5" id="demos">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Interactive ML Demos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-colors group"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary">
            <PlayCircle size={24} />
          </div>
          <h3 className="text-2xl font-bold font-mono mb-3 text-white">Interactive ML Demos</h3>
          <div className="flex items-center gap-2 mb-5">
            <Clock size={14} className="text-primary/60" />
            <span className="font-mono text-xs text-primary/60 uppercase tracking-wider">Coming Soon</span>
          </div>
          <p className="text-foreground/70 leading-relaxed text-sm">
            Interactive demonstrations and experiments exploring deep learning models and AI systems will be added here soon.
          </p>
        </motion.div>

        {/* Research Blog */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-secondary/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-secondary/30 transition-colors group"
          id="contact"
        >
          <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 text-secondary">
            <BookOpen size={24} />
          </div>
          <h3 className="text-2xl font-bold font-mono mb-3 text-white">Research Blog</h3>
          <div className="flex items-center gap-2 mb-5">
            <Clock size={14} className="text-secondary/60" />
            <span className="font-mono text-xs text-secondary/60 uppercase tracking-wider">Coming Soon</span>
          </div>
          <p className="text-foreground/70 leading-relaxed text-sm">
            Blog posts discussing AI research, machine learning experiments, and technical deep-dives will be published here soon.
          </p>
        </motion.div>

      </div>

      {/* Contact Anchor */}
      <div className="max-w-6xl mx-auto px-6 mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#0a0a18] border border-white/5 rounded-2xl p-10"
        >
          <h3 className="text-2xl font-bold font-display text-white mb-3">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
          </h3>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />
          <p className="text-foreground/60 font-sans text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Open to collaborating on meaningful research, ML projects, and data science work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:suman.kar@stu.adamasuniversity.ac.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/60 text-primary font-mono text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] cursor-pointer"
            >
              suman.kar@stu.adamasuniversity.ac.in
            </motion.a>
            <motion.a
              href="https://github.com/Karsuman4298"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 font-mono text-sm rounded-xl transition-all cursor-pointer"
            >
              GitHub Profile
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
