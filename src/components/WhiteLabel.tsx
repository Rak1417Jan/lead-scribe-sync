import { ScrollReveal } from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Rocket, DollarSign, Settings, FileText } from "lucide-react";

export const WhiteLabel = () => {
  const coreFunctions = [
    "Autonomous inbound/outbound calling",
    "Lead qualification and meeting booking",
    "CRM integration (Salesforce, HubSpot, Zoho, Pipedrive)",
    "24/7 operation without human oversight"
  ];

  const included = [
    "Branded platform (domain, UI, documentation)",
    "Integration and onboarding support",
    "Team training (sales and operations)",
    "Ongoing maintenance and updates"
  ];

  const economics = [
    {
      icon: DollarSign,
      title: "Economics",
      points: [
        "Replaces or reduces call center labor",
        "Cost per conversation significantly below human agents",
        "You control pricing and margins"
      ]
    },
    {
      icon: Rocket,
      title: "Deployment",
      points: [
        "Live in weeks",
        "No engineering team needed",
        "Pre-built CRM connectors"
      ]
    }
  ];

  return (
    <section id="white-label" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              White-Label AI Sales Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deploy LexiPitch under your brand. You rebrand it, set pricing, own the clients. 
              We handle infrastructure and updates.
            </p>
          </div>
        </ScrollReveal>

        {/* Core Functions */}
        <ScrollReveal delay={100}>
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Core Functions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {coreFunctions.map((func, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">{func}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What's Included */}
        <ScrollReveal delay={150}>
          <div className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h3 className="text-3xl font-bold mb-8 text-center">What's Included</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Economics & Deployment */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {economics.map((section, index) => (
            <ScrollReveal key={index} delay={200 + index * 50}>
              <div className="p-8 rounded-2xl bg-card border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                {section.title === "Economics" && (
                  <Button variant="outline" className="w-full mt-6 border-primary/20">
                    <FileText className="w-4 h-4 mr-2" />
                    View Cost Comparison Sheet
                  </Button>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Commercial Logic */}
        <ScrollReveal delay={300}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Commercial Logic</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your clients need AI calling automation. Building internally is expensive and time-consuming. 
              White-labeling gives you immediate market access with full revenue and relationship control.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={350}>
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Book a technical demo for implementation details and cost modeling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Settings className="w-5 h-5 mr-2" />
                Book a Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/20">
                <FileText className="w-5 h-5 mr-2" />
                View Cost Sheet
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
