"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ArrowRight, Image as ImageIcon } from "lucide-react";

const customEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1]; // Smooth cubic bezier

// Helper component for animated data flow lines between stages
const FlowArrow = ({ active, color = "white" }: { active: boolean, color?: string }) => (
  <div className="relative w-8 md:w-16 flex items-center justify-center shrink-0">
     <div className="absolute w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
        {active && (
           <motion.div 
             initial={{ x: "-100%" }}
             animate={{ x: "200%" }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="w-1/2 h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-80"
             style={{ color }}
           />
        )}
     </div>
     <ArrowRight 
       className="relative z-10 transition-colors duration-500 bg-[#050510] px-1" 
       size={24} 
       style={{ color: active ? color : 'rgba(255,255,255,0.1)' }}
     />
  </div>
);

// Helper component for pumping Encoder layers
const EncoderLayer = ({ name, active, delay, color, borderStyle, glow = "none" }: any) => {
  return (
    <motion.div 
      initial={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}
      animate={active ? { 
        backgroundColor: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"],
        borderColor: "rgba(255,255,255,0.3)",
        boxShadow: glow,
        color: color
      } : {
        backgroundColor: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "none",
        color: "rgba(255,255,255,0.3)"
      }}
      transition={{ duration: 2, repeat: active ? Infinity : 0, delay: delay, ease: "easeInOut" }}
      className={`p-3 text-center text-[10px] md:text-sm font-mono rounded relative z-10 border ${borderStyle === 'dashed' ? 'border-dashed' : 'border-solid border-white/10'}`}
    >
      {name}
    </motion.div>
  );
};

export default function VisionTransformerVisualization() {
  const [step, setStep] = useState(0); 
  // 0: Initial Image
  // 1: Patch Extraction
  // 2: Linear Projection (Embeddings)
  // 3: Transformer Encoder
  // 4: Classification Output
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    if (step >= 4) {
      setIsPlaying(false);
      return;
    }
    
    // Smooth 3s timing per stage to let animations play out elegantly
    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [step, isPlaying]);

  const handlePlayPause = () => {
    if (step >= 4) setStep(0);
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  return (
    <section className="py-24 relative bg-background border-t border-white/5 overflow-hidden" id="vit">
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Transformer</span> (ViT)
            </h2>
            <p className="text-foreground/70 font-sans max-w-2xl text-lg leading-relaxed">
              Based on "An Image is Worth 16x16 Words". Processing images directly through standard Transformer architectures by mapping grid patches sequentially.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex gap-4 p-2 bg-[#0a0a16] border border-white/10 rounded-xl">
            <button 
              onClick={handlePlayPause}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all ${isPlaying || (step > 0 && step < 4) ? 'bg-primary/20 text-primary' : 'bg-primary text-black hover:bg-primary/90'}`}
            >
              {step >= 4 ? <RotateCcw size={16} /> : <Play size={16} />} 
              {step >= 4 ? 'Restart' : isPlaying ? 'Running Pipeline...' : 'Run Forward Pass'}
            </button>
            <button 
              onClick={handleReset}
              disabled={step === 0}
              className="flex items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </motion.div>

        {/* Dynamic Pipeline Visualization Container */}
        <div className="bg-[#050510] border border-white/10 rounded-3xl p-6 lg:p-12 relative shadow-2xl overflow-x-auto min-h-[500px] flex items-center hide-scrollbar">
          
          <div className="flex items-center justify-between min-w-[1000px] w-full relative h-[400px]">
             
             {/* 1. Input Image */}
             <div className="flex flex-col items-center gap-6 relative z-10 w-40 shrink-0">
               <div className="text-[10px] md:text-xs font-mono text-white/50 bg-[#050510] px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider h-6 flex items-center whitespace-nowrap">Input Image</div>
               <motion.div 
                 className={`w-28 h-28 md:w-32 md:h-32 rounded-xl flex items-center justify-center border-2 transition-all duration-700 bg-[#0a0a16] relative overflow-hidden`}
                 initial={{ borderColor: "rgba(255,255,255,0.05)", boxShadow: "none" }}
                 animate={{ 
                   borderColor: step === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
                   boxShadow: step === 0 ? "0 0 30px rgba(255,255,255,0.1)" : "none",
                   scale: step === 0 ? 1.05 : 1
                 }}
                 transition={{ ease: customEase, duration: 0.8 }}
               >
                 <ImageIcon size={48} className={`transition-all duration-700 ${step >= 0 ? "text-white/60" : "text-white/10"}`} />
                 
                 {/* Scanning laser effect during transition to 1 */}
                 {step === 1 && (
                    <motion.div 
                      initial={{ top: 0, opacity: 1 }}
                      animate={{ top: "100%", opacity: 0 }}
                      transition={{ duration: 1.5, ease: "linear" }}
                      className="absolute left-0 w-full h-[2px] bg-secondary shadow-[0_0_10px_#0044ff]"
                    />
                 )}
               </motion.div>
             </div>

             <FlowArrow active={step >= 1} color="#0044ff" />

             {/* 2. Image Patches */}
             <div className="flex flex-col items-center gap-6 relative z-10 w-40 shrink-0">
               <div className="text-[10px] md:text-xs font-mono text-secondary bg-[#050510] px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider h-6 flex items-center whitespace-nowrap">Extract Patches</div>
               <div className="w-28 h-28 md:w-32 md:h-32 grid grid-cols-3 grid-rows-3 gap-1 relative" style={{ perspective: "1000px" }}>
                 {Array.from({ length: 9 }).map((_, i) => (
                   <motion.div
                     key={`patch-${i}`}
                     initial={{ opacity: 0.05, z: 0, scale: 1, boxShadow: "none" }}
                     animate={{ 
                       opacity: step >= 1 ? 1 : 0.05, 
                       z: step === 1 ? 30 + Math.random()*20 : 0, 
                       scale: step === 1 ? 1.1 : 1,
                       boxShadow: step === 1 ? "0 5px 15px rgba(0,68,255,0.4)" : "none",
                       borderColor: step >= 1 ? "rgba(0,68,255,0.6)" : "rgba(255,255,255,0.05)"
                     }}
                     transition={{ duration: 0.8, delay: step === 1 ? i * 0.05 : 0, ease: customEase }}
                     className="bg-secondary/10 border rounded-sm"
                   />
                 ))}
               </div>
             </div>

             <FlowArrow active={step >= 2} color="#00f3ff" />

             {/* 3. Patch Embeddings */}
             <div className="flex flex-col items-center gap-6 relative z-10 w-48 shrink-0">
               <div className="text-[10px] md:text-xs font-mono text-primary bg-[#050510] px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider h-6 flex items-center whitespace-nowrap">Embeddings</div>
               <div className="flex gap-1.5 h-28 md:h-32 items-center justify-center relative w-full">
                 {Array.from({ length: 9 }).map((_, i) => (
                   <motion.div
                     key={`embed-${i}`}
                     initial={{ height: 10, opacity: 0, x: -60, filter: "blur(4px)" }}
                     animate={{ 
                       height: step >= 2 ? 40 + (i % 3) * 15 + Math.random()*20 : 10, 
                       opacity: step >= 2 ? 1 : 0, 
                       x: step >= 2 ? 0 : -60,
                       filter: step >= 2 ? "blur(0px)" : "blur(4px)",
                       backgroundColor: step === 2 ? "rgba(0, 243, 255, 0.8)" : "rgba(0, 243, 255, 0.3)"
                     }}
                     transition={{ duration: 0.8, delay: step === 2 ? i * 0.06 : 0, ease: customEase }}
                     className="w-3 md:w-4 rounded-sm relative group overflow-hidden"
                     style={{
                        boxShadow: step >= 2 ? "0 0 10px rgba(0, 243, 255, 0.2)" : "none"
                     }}
                   >
                     {/* Flow particles ascending inside embeddings */}
                     {step === 2 && (
                       <motion.div
                          initial={{ bottom: -10, opacity: 1 }}
                          animate={{ bottom: "120%", opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                          className="absolute w-full h-4 bg-white rounded-full blur-[2px]"
                       />
                     )}
                   </motion.div>
                 ))}
               </div>
             </div>

             <FlowArrow active={step >= 3} color="#8a2be2" />

             {/* 4. Transformer Encoder Stack */}
             <div className="flex flex-col items-center gap-6 relative z-10 w-56 md:w-64 shrink-0">
               <div className="text-[10px] md:text-xs font-mono text-accent bg-[#050510] px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider h-6 flex items-center whitespace-nowrap">Encoder Stack</div>
               <motion.div 
                 initial={{ opacity: 0.5, borderColor: "rgba(255,255,255,0.05)", y: 0 }}
                 animate={{ 
                   opacity: step >= 3 ? 1 : 0.5,
                   borderColor: step >= 3 ? "rgba(138,43,226,0.5)" : "rgba(255,255,255,0.05)",
                   boxShadow: step >= 3 ? "0 0 40px rgba(138,43,226,0.15)" : "none",
                   y: step === 3 ? [-4, 0, -4] : 0
                 }}
                 transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                 className="p-4 md:p-6 border rounded-2xl bg-[#080812] flex flex-col gap-3 md:gap-4 w-full relative overflow-hidden"
               >
                 <div className="text-center font-mono text-[8px] md:text-[10px] text-white/30 tracking-widest uppercase mb-1">L × Encoder Blocks</div>
                 
                 {/* Internal Data Flow Beam */}
                 {step === 3 && (
                   <motion.div 
                     initial={{ top: "-20%" }}
                     animate={{ top: "120%" }}
                     transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                     className="absolute left-[15%] w-[70%] h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent blur-[8px] pointer-events-none z-0"
                   />
                 )}

                 {/* Layers visually stacked bottom-to-top data flow conceptually, rendered top-down: MLP is at top */}
                 <EncoderLayer name="MLP" active={step >= 3} delay={1.2} color="rgba(255,255,255,0.9)" borderStyle="solid" />
                 <EncoderLayer name="Layer Norm" active={step >= 3} delay={0.8} color="rgba(255,255,255,0.6)" borderStyle="dashed" />
                 <EncoderLayer name="Multi-Head Attention" active={step >= 3} delay={0.4} color="rgba(138,43,226,1)" borderStyle="solid" glow="0 0 20px rgba(138,43,226,0.4)" />
                 <EncoderLayer name="Layer Norm" active={step >= 3} delay={0.0} color="rgba(255,255,255,0.6)" borderStyle="dashed" />
                 
               </motion.div>
             </div>

             <FlowArrow active={step >= 4} color="#22c55e" />

             {/* 5. Classification Output */}
             <div className="flex flex-col items-center gap-6 relative z-10 w-40 shrink-0">
               <div className="text-[10px] md:text-xs font-mono text-green-400 bg-[#050510] px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider h-6 flex items-center whitespace-nowrap">Output Class</div>
               <div className="flex items-center justify-center h-28 md:h-32">
                 <AnimatePresence>
                   {step >= 4 && (
                     <motion.div 
                       initial={{ scale: 0, opacity: 0, rotate: -30 }}
                       animate={{ scale: 1, opacity: 1, rotate: 0 }}
                       transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
                       className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-2 border-green-500 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] relative"
                     >
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.5 }}
                         className="absolute inset-0 rounded-full border border-green-400 blur-[2px]" 
                       />
                       <div className="text-center relative z-10">
                         <div className="text-green-400 font-mono text-2xl md:text-3xl font-bold">99%</div>
                         <div className="text-white/80 font-sans text-[10px] md:text-xs mt-1 tracking-wider uppercase">Match Found</div>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 {step < 4 && <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-dashed border-white/10 opacity-50" />}
               </div>
             </div>

          </div>
        </div>

        {/* Global Progress Logger */}
        <div className="mt-8 text-center bg-[#050510] border border-white/5 py-4 px-6 rounded-xl inline-block mx-auto min-w-[300px] shadow-lg">
           <AnimatePresence mode="wait">
             <motion.p 
               key={`status-${step}`}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -5 }}
               className="font-mono text-white/80 text-xs md:text-sm"
             >
                <span className="text-primary mr-3 font-bold">Logs:</span>
                {step === 0 && "[System] Awaiting input tensor..."}
                {step === 1 && "[Process] Slicing image into fixed-size sequence 16x16 grid patches"}
                {step === 2 && "[Process] Mapping patches to constant dimension via trainable linear projection"}
                {step === 3 && "[Network] Passing embedded sequence through parallel self-attention computation modules"}
                {step === 4 && "[Task] MLP Head processing final state of the [CLS] sequence token -> Output Prob>0.99"}
             </motion.p>
           </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
