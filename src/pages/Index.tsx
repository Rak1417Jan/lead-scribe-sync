import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { WhiteLabel } from "@/components/WhiteLabel";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GridBackground } from "@/components/GridBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <GridBackground />
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <WhiteLabel />
        <HowItWorks />
        <CTA />
      </div>
    </div>
  );
};

export default Index;
