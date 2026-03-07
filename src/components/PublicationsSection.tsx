"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

const PUBLICATIONS = [
  {
    title: "Scaling Laws for Sparse Attention in Vision Transformers",
    authors: "Kar, S., et al.",
    venue: "NeurIPS",
    year: "2025",
    link: "#",
    citation: "Kar, S., Doe, J. (2025). Scaling Laws for Sparse Attention. Advances in Neural Information Processing Systems, 38."
  },
  {
    title: "Memory-Efficient Sequence Modeling with Quantized State Spaces",
    authors: "Kar, S., Smith, A.",
    venue: "ICLR",
    year: "2024",
    link: "#",
    citation: "Kar, S., Smith, A. (2024). Memory-Efficient Sequence Modeling. International Conference on Learning Representations."
  },
  {
    title: "Autonomous Architecture Search via Reinforcement Learning",
    authors: "Kar, S.",
    venue: "ICML",
    year: "2024",
    link: "#",
    citation: "Kar, S. (2024). Autonomous Architecture Search. Proceedings of the 41st International Conference on Machine Learning."
  }
];

export default function PublicationsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-4"
        >
          <FileText className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            Selected <span className="text-foreground/50">Publications</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {PUBLICATIONS.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group border-l-2 border-primary/20 pl-6 pb-8 relative"
            >
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
              
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3>
                  <div className="font-mono text-sm text-foreground/70 mb-4">
                    {pub.authors} <span className="text-accent mx-2">•</span> <span className="font-bold text-white">{pub.venue}</span> {pub.year}
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded text-xs font-mono text-foreground/50 italic opacity-80 group-hover:opacity-100 transition-opacity">
                    {pub.citation}
                  </div>
                </div>
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-foreground transition-all shrink-0 hover:border-primary">
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
