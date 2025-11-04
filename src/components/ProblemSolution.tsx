import { ScrollReveal } from "./ScrollReveal";
import { AlertCircle, Clock, TrendingDown, CheckCircle2, Zap } from "lucide-react";

export const ProblemSolution = () => {
  const problems = [
    {
      icon: Clock,
      title: "Manual Follow-ups",
      description:
        "Sales teams juggle multiple tools — Clay for leads, Outreach for emails, separate systems for calls and WhatsApp",
    },
    {
      icon: TrendingDown,
      title: "Leads Slip Away",
      description: "Follow-ups are manual, slow, and inconsistent. Tools don't talk to each other",
    },
    {
      icon: AlertCircle,
      title: "No Coordination",
      description:
        "Sales reps spend 70% of time qualifying leads, leaving no time for actual follow-ups",
    },
  ];

  const features = [
    "AI voice calls with real-time CRM sync",
    "WhatsApp automation with multi-provider support",
    "Smart email sequences that adapt",
    "Disposition-based workflows that react in real-time",
    "All channels update automatically",
    "No manual coordination needed",
  ];

  return (
    <section className="px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Problem */}
          <div>
            <ScrollReveal>
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  The <span className="gradient-text glow-text">Problem</span>
                </h2>
                <p className="text-muted-foreground">
                  Sales teams are drowning in tools that don't work together, losing deals every single day
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6">
              {problems.map((p, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 hover:border-primary/40 transition-all backdrop-blur-sm card-glow">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <p.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                    <p className="text-muted-foreground">{p.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div>
            <ScrollReveal>
              <div className="mb-8 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full bg-primary/10 border border-primary/30">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold">The Solution</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  One Platform, <span className="gradient-text glow-text">Every Channel</span>
                </h2>
                <p className="text-muted-foreground">
                  LexiPitch automates everything from first contact to conversion using intelligent workflows that adapt
                  to lead behavior
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-5">
              {features.map((f, i) => (
                <ScrollReveal key={i} delay={100 + i * 50}>
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all backdrop-blur-sm border border-transparent hover:border-primary/20">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg">{f}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
