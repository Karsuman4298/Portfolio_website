"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function AbstractBrain() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
      group.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1.6, 2]}>
          <meshStandardMaterial color="#00e5ff" transparent opacity={0.2} wireframe />
        </Icosahedron>

        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#050510"
            emissive="#a855f7"
            emissiveIntensity={0.6}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Sphere>

        <Icosahedron args={[2.2, 1]}>
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} wireframe />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function AboutSection() {
  return (
    <section className="py-28 relative overflow-hidden bg-background" id="about">
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">

        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs text-primary/60 tracking-widest uppercase mb-4">About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Me</span>
            </h2>

            <p className="text-base md:text-lg text-foreground/65 mb-5 leading-loose font-sans">
              I am a <span className="text-white font-semibold">Data Science and Machine Learning Engineer</span> with a strong foundation in Python, machine learning, and data science. Currently pursuing a <span className="text-white font-semibold">B.Tech in Computer Science</span> at Adamas University, Kolkata (2023–2027)
            </p>

            <p className="text-base md:text-lg text-foreground/50 mb-10 leading-loose">
              Skilled in data-driven problem solving, data cleaning, exploratory analysis, and building machine learning models for decision-making. Interested in collaborating on meaningful research in fast-paced environments.
            </p>

            <div className="space-y-4">
              <h3 className="font-mono text-secondary/80 text-xs uppercase tracking-widest mb-4">Research Interests & Focus Areas</h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Transformer Architectures",
                  "Vision Transformers (ViT)",
                  "LLM Fine-tuning",
                  "NLP",
                  "Distributed Computing",
                ].map((interest, i) => (
                  <motion.a
                    key={interest}
                    href={`https://www.google.com/search?q=${encodeURIComponent(interest)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.06, boxShadow: "0 0 14px rgba(0,229,255,0.25)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white/4 border border-white/10 hover:border-primary/50 rounded-full font-mono text-xs text-primary/70 hover:text-primary transition-all cursor-pointer block"
                  >
                    {interest}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 h-[480px] relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-full blur-[120px] opacity-40" />
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#00e5ff" />
            <directionalLight position={[-10, -10, -5]} intensity={2} color="#a855f7" />
            <AbstractBrain />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
