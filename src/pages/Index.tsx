import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { WhiteLabel } from "@/components/WhiteLabel";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <WhiteLabel />
      <HowItWorks />
      <CTA />
    </div>
  );
};

export default Index;
