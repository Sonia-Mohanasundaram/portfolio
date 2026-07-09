import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { SpaceBackground } from "@/components/portfolio/SpaceBackground";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Dock } from "@/components/portfolio/Dock";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { AIAssistant } from "@/components/portfolio/AIAssistant";
import { HireMeFab } from "@/components/portfolio/HireMeFab";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { ConfettiListener } from "@/components/portfolio/Confetti";
import { EasterEgg } from "@/components/portfolio/EasterEgg";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <SpaceBackground />
      <CustomCursor />
      <ConfettiListener />
      <EasterEgg />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <Contact />
        <Footer />
      </main>
      <Dock />
      <AIAssistant />
      <HireMeFab />
      <BackToTop />
    </>
  );
}
