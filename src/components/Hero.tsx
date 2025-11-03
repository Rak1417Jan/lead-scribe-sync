import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-muted border border-primary/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm">White-Label AI Sales Infrastructure</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-up">
          We don't compete with{" "}
          <span className="gradient-text">sales teams</span>
          <br />
          We <span className="gradient-text glow-text">arm them</span> with AI agents
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          LexiPitch unifies AI calls, WhatsApp, email, and lead generation into one intelligent platform — 
          automating every stage of the sales journey
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" className="text-lg px-8 py-6 glow-border group">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/20 hover:border-primary">
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="p-6 rounded-xl bg-card border border-primary/10">
            <div className="text-4xl font-bold gradient-text mb-2">67%</div>
            <div className="text-muted-foreground">Follow-ups never happen</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-primary/10">
            <div className="text-4xl font-bold gradient-text mb-2">85%</div>
            <div className="text-muted-foreground">Leads go cold in 48hrs</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-primary/10">
            <div className="text-4xl font-bold gradient-text mb-2">70%</div>
            <div className="text-muted-foreground">Time spent qualifying</div>
          </div>
        </div>
      </div>
    </section>
  );
};
