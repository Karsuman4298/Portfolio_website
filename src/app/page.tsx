import HeroSection from "@/components/HeroSection";
import TransformerVisualization from "@/components/TransformerVisualization";
import VisionTransformerVisualization from "@/components/VisionTransformerVisualization";
import AboutSection from "@/components/AboutSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import VisionSection from "@/components/VisionSection";
import ExtrasSection from "@/components/ExtrasSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-black">
      <HeroSection />
      <VisionSection />
      <AboutSection />
      <ResearchSection />
      <ProjectsSection />
      <SkillsSection />
      <TransformerVisualization />
      <VisionTransformerVisualization />
      <ExtrasSection />
    </main>
  );
}

