import { ScrollReveal } from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { Palette, DollarSign, LayoutDashboard, ArrowRight } from "lucide-react";

export const WhiteLabel = () => {
  const benefits = [
    {
      icon: Palette,
      title: "Your Brand",
      description: "Complete control over branding, logo, and client-facing elements"
    },
    {
      icon: DollarSign,
      title: "Your Pricing",
      description: "Set your own pricing structure and profit margins"
    },
    {
      icon: LayoutDashboard,
      title: "Your Dashboard",
      description: "Manage all clients from one centralized partner dashboard"
    }
  ];

  const weHandle = [
    "Technology & Infrastructure",
    "Hosting & Maintenance",
    "24/7 Support",
    "Billing & Payments"
  ];

  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              White-Label for{" "}
              <span className="gradient-text">Agencies & SaaS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Launch your own branded AI sales platform in under 30 minutes. 
              Your brand. Our infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-8">You Control</h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-primary/10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-8">We Handle</h3>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 space-y-4">
                {weHandle.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-card border border-primary/20">
                <p className="text-lg font-semibold mb-2">Ready to Launch?</p>
                <p className="text-muted-foreground mb-4">
                  Onboard at partners.lexipitch.com and start offering AI sales automation to your clients today
                </p>
                <Button className="w-full group">
                  Get Partner Access
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Why White-Label Wins</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              India runs on volume — not margin. Agencies, CRMs, and BPOs already have customers who want AI automation. 
              LexiPitch lets you sell an AI-powered sales platform instantly without building it yourself.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
