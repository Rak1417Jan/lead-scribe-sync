import { ScrollReveal } from "./ScrollReveal";
import { AlertCircle, Clock, TrendingDown } from "lucide-react";

export const Problem = () => {
  const problems = [
    {
      icon: Clock,
      title: "Manual Follow-ups",
      description: "Sales teams juggle multiple tools — Clay for leads, Outreach for emails, separate systems for calls and WhatsApp"
    },
    {
      icon: TrendingDown,
      title: "Leads Slip Away",
      description: "Follow-ups are manual, slow, and inconsistent. Tools don't talk to each other"
    },
    {
      icon: AlertCircle,
      title: "No Coordination",
      description: "Sales reps spend 70% of time qualifying leads, leaving no time for actual follow-ups"
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              The <span className="gradient-text glow-text">Problem</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sales teams are drowning in tools that don't work together, losing deals every single day
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="p-8 rounded-2xl bg-card/50 border border-primary/20 hover:border-primary/40 transition-all group backdrop-blur-sm card-glow perspective-card hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-border">
                  <problem.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        
      </div>
    </section>
  );
};
