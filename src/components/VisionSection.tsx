"use client";

import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#020205] flex items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-50"></div>
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
           <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight tracking-tight text-white/90 drop-shadow-[0_0_30px_rgba(0,243,255,0.2)]">
             "My goal is to develop <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">next-generation artificial intelligence systems</span> capable of autonomous learning, reasoning, and global impact."
           </h2>
           <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "100%" }}
             transition={{ duration: 1.5, delay: 0.5 }}
             viewport={{ once: true }}
             className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-lg mx-auto mt-12" 
           />
        </motion.div>
      </div>
    </section>
  );
}
