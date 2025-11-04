import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { WhiteLabel } from "@/components/WhiteLabel";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { GridBackground } from "@/components/GridBackground";
import { ProblemSolution } from "@/components/ProblemSolution";
import { ROI } from "@/components/ROI";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <GridBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <WhiteLabel />
        <ROI />
        <CTA />
        <ProblemSolution />
        <Features />
        <HowItWorks />
      </div>
    </div>
  );
};

export default Index;
