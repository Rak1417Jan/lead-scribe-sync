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

  const workflow = [
    { day: "1", action: "Email with application form", highlight: false },
    { day: "2", action: "WhatsApp reminder", highlight: false },
    { day: "4", action: "Form Submitted", subtitle: "Old reminders stop → New flow begins", highlight: true },
    { day: "6", action: "AI voice call for payment", highlight: false },
    { day: "8", action: "Team WhatsApp follow-up", highlight: false },
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

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
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

          <ScrollReveal delay={200}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 backdrop-blur-sm glow-border hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] transition-all">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Example Workflow</h3>
              <div className="space-y-4">
                {workflow.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-4 rounded-lg transition-all ${
                      step.highlight 
                        ? 'bg-primary/20 border border-primary/40' 
                        : 'bg-background/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      step.highlight 
                        ? 'bg-primary/40 text-primary glow-border' 
                        : 'bg-primary/20 text-muted-foreground'
                    }`}>
                      {step.day}
                    </div>
                    <div>
                      <p className={`font-semibold ${step.highlight ? 'text-primary' : ''}`}>
                        {step.day !== "4" ? `Day ${step.day}` : step.action}
                      </p>
                      <p className={step.highlight ? "text-primary text-sm" : "text-muted-foreground"}>
                        {step.subtitle || (step.day !== "4" ? step.action : step.subtitle)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
