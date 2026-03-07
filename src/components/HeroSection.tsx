"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import NetworkBackground from "./NetworkBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <NetworkBackground />

      {/* Radial glow behind content */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full">
        {/* Two-column layout: text left, photo right */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Eyebrow label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-primary/5 border border-primary/20 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-primary/80 tracking-widest uppercase">Portfolio</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60 drop-shadow-[0_0_40px_rgba(0,229,255,0.15)]">
                Suman Kar
              </h1>
              <h2 className="text-lg md:text-xl font-mono text-secondary/90 mb-8 tracking-wide">
                Data Science & Machine Learning Engineer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-sm md:text-base text-foreground/55 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed"
            >
              Building data-driven ML systems, exploring deep learning architectures, and implementing cutting-edge AI research.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-wrap gap-4 items-center justify-center md:justify-start"
            >
              <motion.button
                onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,229,255,0.5)" }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3 bg-primary text-black font-mono font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all duration-200 cursor-pointer"
              >
                View Research
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.35)" }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3 bg-transparent border border-white/15 text-white/80 font-mono text-sm rounded-xl transition-all duration-200 cursor-pointer"
              >
                Explore Projects
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex-shrink-0 flex justify-center"
          >
            <div className="relative">
              {/* Glow ring behind photo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-accent/30 blur-2xl scale-110 opacity-60" />
              
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.06]" />
              
              {/* Photo */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src="/profile.jpg"
                  alt="Suman Kar — Data Science & ML Engineer"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
