import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2, Zap } from "lucide-react";

export const Solution = () => {
  const features = [
    "AI voice calls with real-time CRM sync",
    "WhatsApp automation with multi-provider support",
    "Smart email sequences that adapt",
    "Disposition-based workflows that react in real-time",
    "All channels update automatically",
    "No manual coordination needed"
  ];

  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm glow-border">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">The Solution</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              One Platform,{" "}
              <span className="gradient-text glow-text">Every Channel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              LexiPitch automates everything from first contact to conversion using 
              intelligent workflows that adapt to lead behavior
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group backdrop-blur-sm border border-transparent hover:border-primary/20">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
