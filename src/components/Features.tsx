import { ScrollReveal } from "./ScrollReveal";
import { Phone, MessageSquare, Mail, Target, Settings } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Lead Generation",
      description: "Find, enrich, and qualify leads automatically — Clay-style sourcing that feeds directly into campaigns"
    },
    {
      icon: Phone,
      title: "AI Voice",
      description: "Conversational calling engine powered by Tata telephony with real-time CRM sync"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Multi-provider integration with one virtual number for both text and voice"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Dual system: Transactional instant delivery (99%+) and warmed marketing sequences"
    },
    {
      icon: Settings,
      title: "Disposition Engine",
      description: "Core automation layer that orchestrates all channels, cancels outdated sequences, and syncs with CRMs"
    }
  ];

  return (
    <section id="features" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text glow-text">Platform</span> Overview
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to automate your sales process, unified in one intelligent platform
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="p-8 rounded-2xl bg-card/50 border border-primary/20 hover:border-primary/40 transition-all group backdrop-blur-sm card-glow perspective-card hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all glow-border">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
