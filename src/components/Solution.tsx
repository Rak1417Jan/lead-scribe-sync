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
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">The Solution</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              One Platform,{" "}
              <span className="gradient-text">Every Channel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              LexiPitch automates everything from first contact to conversion using 
              intelligent workflows that adapt to lead behavior
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <h3 className="text-2xl font-bold mb-6">Example Workflow</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                  <div>
                    <p className="font-semibold">Day 1</p>
                    <p className="text-muted-foreground">Email with application form</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                  <div>
                    <p className="font-semibold">Day 2</p>
                    <p className="text-muted-foreground">WhatsApp reminder</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                  <div>
                    <p className="font-semibold">Form Submitted</p>
                    <p className="text-primary">Old reminders stop → New flow begins</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">6</div>
                  <div>
                    <p className="font-semibold">Day 6</p>
                    <p className="text-muted-foreground">AI voice call for payment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">8</div>
                  <div>
                    <p className="font-semibold">Day 8</p>
                    <p className="text-muted-foreground">Team WhatsApp follow-up</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
