"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github, FileText, Download } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Research", href: "#research" },
  { name: "Projects", href: "#projects" },
  { name: "Interactive Demos", href: "#demos" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Handlebar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-white hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all group"
        aria-label="Open Navigation"
      >
        <Menu className="w-6 h-6 transition-transform group-hover:scale-110" />
      </button>

      {/* Social Links (Top Right) */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <a 
          href="https://share.google/RDLdNksXLYkq6PrDZ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-white/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all group cursor-pointer"
        >
          <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-sm font-sans font-medium hidden md:block">LinkedIn</span>
        </a>
        <a 
          href="https://github.com/Karsuman4298" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-white/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all group cursor-pointer"
        >
          <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-sm font-sans font-medium hidden md:block">GitHub</span>
        </a>
        <a 
          href="https://drive.google.com/file/d/1ApDzGWiwzgegZV_0svVKTfMPzZGkf7tH/view?usp=drivesdk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-white/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-sm font-sans font-medium hidden md:block">Resume</span>
          </div>
          <Download className="w-3.5 h-3.5 ml-1 opacity-60 group-hover:opacity-100 transition-opacity hidden md:block" />
        </a>
      </div>

      {/* Side Panel Overlay & Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#050510] border-r border-white/10 z-50 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <span className="font-mono font-bold text-lg text-primary tracking-widest uppercase">Navigation</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col py-6 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => {
                      setIsOpen(false);
                      if (link.href !== "#") {
                         const target = document.querySelector(link.href);
                         if (target) {
                           target.scrollIntoView({ behavior: 'smooth' });
                         }
                      } else {
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="w-full text-left px-8 py-4 font-sans text-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-primary flex items-center group cursor-pointer"
                  >
                   <span className="font-mono text-xs text-primary/50 mr-4 group-hover:text-primary transition-colors">
                     0{i + 1}
                   </span>
                   {link.name}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto p-8 border-t border-white/5">
                 <p className="font-mono text-xs text-foreground/40 leading-relaxed">
                   Suman Kar<br/>
                   AI / Machine Learning Researcher<br/>
                   © 2026
                 </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
