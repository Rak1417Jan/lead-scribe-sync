import { ScrollReveal } from "./ScrollReveal";
import { UserPlus, Palette, Users, Rocket } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Onboard",
      description: "Sign up at partners.lexipitch.com in minutes"
    },
    {
      icon: Palette,
      title: "Customize",
      description: "Set your brand, logo, and pricing structure"
    },
    {
      icon: Users,
      title: "Add Clients",
      description: "Manage all clients from your partner dashboard"
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "Clients get instant access to full AI sales automation"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in 4 simple steps
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10 p-8 rounded-2xl bg-card border border-primary/10 hover:border-primary/30 transition-all group text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-primary mb-2">Step {index + 1}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
