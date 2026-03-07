"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";

const HEAD_COLORS = [
  "rgba(0, 243, 255, ", // Cyan (Head 1)
  "rgba(138, 43, 226, ", // Purple (Head 2)
  "rgba(0, 255, 128, ", // Green (Head 3)
  "rgba(255, 100, 100, " // Red (Head 4)
];

export default function TransformerVisualization() {
  const [inputText, setInputText] = useState("The architecture utilizes multi-head self-attention");
  const [tokens, setTokens] = useState<string[]>([]);
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);
  const [activeHead, setActiveHead] = useState(0); // 0-3

  // Simple tokenizer
  useEffect(() => {
    const newTokens = inputText.split(/\s+/).filter(t => t.length > 0);
    setTokens(newTokens.slice(0, 8)); // Limit for visual clarity horizontally
  }, [inputText]);

  // Generate deterministic but pseudo-random attention weights based on word lengths and head
  const attentionWeights = useMemo(() => {
    return tokens.map((_, i) => {
      return tokens.map((_, j) => {
        // Base attention is higher for neighboring words
        let weight = Math.exp(-Math.abs(i - j) / 2);
        
        // Add pseudo-randomness based on head index and token strings
        const seed = (tokens[i]?.length || 1) * (tokens[j]?.length || 1) * (activeHead + 1);
        weight += (Math.sin(seed) * 0.3);
        
        // Normalize 0-1
        weight = Math.max(0.05, Math.min(1, weight));
        return weight;
      });
    });
  }, [tokens, activeHead]);

  // Normalize row weights to 1 (softmax simulation)
  const normalizedWeights = useMemo(() => {
    return attentionWeights.map(row => {
      const sum = row.reduce((a, b) => a + b, 0);
      return row.map(v => v / sum);
    });
  }, [attentionWeights]);

  // Calculate SVG curve paths strictly horizontally
  const renderAttentionCurves = () => {
    if (!tokens.length) return null;
    
    // We assume container is ~full width, spacing tokens evenly
    const containerWidth = 800; // Reference width (scales with preserveAspectRatio)
    const tokenWidth = containerWidth / Math.max(tokens.length, 1);
    
    return tokens.map((_, idx) => {
      const x1 = (idx * tokenWidth) + (tokenWidth / 2);
      const isSourceHovered = hoveredToken === idx;
      
      return tokens.map((_, targetIdx) => {
        const weight = normalizedWeights[idx][targetIdx];
        
        // Only show lines if source is hovered, OR if nothing is hovered show strong connections
        const shouldShow = isSourceHovered || (hoveredToken === null && weight > 0.15);
        if (!shouldShow) return null;

        const x2 = (targetIdx * tokenWidth) + (tokenWidth / 2);
        // Map curve height based on distance
        const distance = Math.abs(x2 - x1);
        const yDir = targetIdx % 2 === 0 ? 1 : -1; // alternate up/down curves
        const controlY = distance * 0.4 * yDir;

        // Visual properties mapping
        const opacity = isSourceHovered ? Math.max(0.2, weight) : weight * 0.5;
        const strokeWidth = weight * 4;
        const colorPrefix = HEAD_COLORS[activeHead];

        return (
          <path
            key={`attention-${idx}-${targetIdx}`}
            d={`M ${x1} 0 Q ${(x1 + x2) / 2} ${controlY} ${x2} 0`}
            fill="none"
            stroke={`${colorPrefix}${opacity})`}
            strokeWidth={Math.max(1, Math.min(strokeWidth, 5))}
            className="transition-all duration-500 ease-in-out"
          />
        );
      });
    });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background" id="transformer">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Layers className="text-primary w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold font-display">Multi-Head <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Self-Attention</span></h2>
          </div>
          <p className="text-foreground/70 font-sans max-w-2xl text-lg leading-relaxed mb-6">
            Visualizing the core mechanism behind Transformer models. Input tokens calculate relevance to every other token simultaneously across parallel "heads".
          </p>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full max-w-xl bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="Enter text to visualize..."
          />
        </motion.div>

        {/* Interactive Workspace */}
        <div className="bg-[#0a0a16] border border-white/10 rounded-3xl p-6 lg:p-10 relative shadow-2xl flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          
          {/* Main Token & Connection Area */}
          <div className="flex-1 w-full flex flex-col">
            
            {/* Head Selector controls */}
            <div className="flex items-center gap-4 mb-12">
              <span className="text-white/50 font-mono text-sm uppercase tracking-wider">Select Head:</span>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map(headIdx => (
                  <button
                    key={`head-${headIdx}`}
                    onClick={() => setActiveHead(headIdx)}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all border ${
                      activeHead === headIdx 
                        ? `bg-white/10 text-white font-bold` 
                        : 'bg-transparent text-white/50 border-white/10 hover:bg-white/5'
                    }`}
                    style={{ borderColor: activeHead === headIdx ? HEAD_COLORS[headIdx] + '1)' : ''}}
                  >
                    Head {headIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Tokens and Curves Container */}
            <div className="relative w-full h-48 lg:h-64 flex justify-center items-center mt-8">
               
               {/* SVG overlay for drawing attention curves */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 -100 800 200" preserveAspectRatio="xMidYMid meet">
                  {renderAttentionCurves()}
               </svg>

               {/* Tokens Line (Horizontal) */}
               <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
                  {tokens.map((token, i) => (
                     <motion.div
                       key={`token-${i}`}
                       layoutId={`token-${token}-${i}`}
                       onHoverStart={() => setHoveredToken(i)}
                       onHoverEnd={() => setHoveredToken(null)}
                       className={`
                         relative z-10 px-3 py-2 md:px-4 md:py-2 rounded-lg font-mono text-xs md:text-sm font-bold border cursor-pointer transition-all duration-300 shadow-lg text-center
                         ${hoveredToken === i ? 'bg-black text-white scale-110 z-20' : 'bg-[#11111a] text-white/80 border-white/10 hover:border-white/30'}
                       `}
                       style={{
                          borderColor: hoveredToken === i ? HEAD_COLORS[activeHead] + '1)' : '',
                          boxShadow: hoveredToken === i ? `0 0 20px ${HEAD_COLORS[activeHead]}0.4)` : '0 4px 6px rgba(0,0,0,0.3)'
                       }}
                     >
                        {token}
                        
                        {/* Hover Tooltip Weight score */}
                        <AnimatePresence>
                           {(hoveredToken !== null && hoveredToken !== i) && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: -30 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#020205] text-[10px] md:text-xs font-mono px-2 py-1 rounded border pointer-events-none"
                                style={{ borderColor: HEAD_COLORS[activeHead] + '0.5)', color: HEAD_COLORS[activeHead] + '1)' }}
                              >
                                 {(normalizedWeights[hoveredToken][i] * 100).toFixed(1)}%
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>

            <div className="text-center mt-12 mb-4 pointer-events-none opacity-60">
               <div className="font-mono text-xs text-white">Hover over any token to inspect its outgoing attention weights.</div>
            </div>
            
          </div>


          {/* Secondary Heatmap Visualization Container */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-[#050510] border border-white/5 rounded-2xl p-6">
             <div className="mb-6 flex flex-col gap-1">
               <h4 className="font-display font-bold text-white text-lg">Attention Matrix</h4>
               <p className="font-sans text-xs text-white/50">Row maps Source Token to Target Tokens (Columns).</p>
             </div>
             
             <div className="flex">
               {/* Y-axis labels (Source) */}
               <div className="flex flex-col gap-1 pr-3 pt-6 min-w-[60px]">
                 {tokens.map((token, i) => (
                   <div 
                     key={`y-label-${i}`} 
                     className={`h-6 md:h-8 flex items-center justify-end font-mono text-[10px] md:text-xs truncate transition-colors duration-300 pr-1
                      ${hoveredToken === i ? 'text-white font-bold' : 'text-white/40'}
                     `}
                     style={{ color: hoveredToken === i ? HEAD_COLORS[activeHead] + '1)' : '' }}
                   >
                     {token.substring(0, 6)}
                   </div>
                 ))}
               </div>

               <div className="flex flex-col flex-1">
                 {/* X-axis labels (Target) */}
                 <div className="flex gap-1 mb-2 h-4">
                   {tokens.map((token, i) => (
                     <div 
                       key={`x-label-${i}`} 
                       className={`flex-1 flex items-end justify-center font-mono text-[9px] truncate transition-colors duration-300
                         ${(hoveredToken !== null) ? 'text-white/40' : 'text-white/40'}
                       `}
                     >
                       {token.substring(0, 3)}
                     </div>
                   ))}
                 </div>
                 
                 {/* Heatmap Grid */}
                 <div className="flex flex-col gap-1">
                    {normalizedWeights.map((row, i) => {
                      const isRowHovered = hoveredToken === i;
                      const isFaded = hoveredToken !== null && !isRowHovered;

                      return (
                        <div key={`matrix-row-${i}`} className="flex gap-1 h-6 md:h-8">
                           {row.map((weight, j) => {
                             
                             // Dark theme base map: Low attention = dark bg, High attention = bright head color
                             const intensity = weight * 0.9 + 0.1; // Ensure slight visibility
                             
                             return (
                               <div 
                                 key={`matrix-cell-${i}-${j}`}
                                 className="flex-1 rounded-sm border transition-all duration-500 relative group overflow-hidden"
                                 style={{
                                   backgroundColor: HEAD_COLORS[activeHead] + `${intensity})`,
                                   borderColor: (isRowHovered && hoveredToken === j) ? '#fff' : 'rgba(255,255,255,0.05)',
                                   opacity: isFaded ? 0.2 : 1
                                 }}
                               >
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity pointer-events-none">
                                   <span className="font-mono text-[8px] text-white font-bold">{(weight*100).toFixed(0)}</span>
                                 </div>
                               </div>
                             );
                           })}
                        </div>
                      )
                    })}
                 </div>
               </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
