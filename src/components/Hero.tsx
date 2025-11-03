import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Bot } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Floating AI icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Bot className="absolute top-20 left-[10%] w-8 h-8 text-primary/20 animate-float" />
        <Zap className="absolute top-40 right-[15%] w-6 h-6 text-secondary/20 animate-float" style={{ animationDelay: "0.5s" }} />
        <Sparkles className="absolute bottom-32 left-[20%] w-10 h-10 text-primary/20 animate-float" style={{ animationDelay: "1.5s" }} />
        <Bot className="absolute bottom-20 right-[25%] w-7 h-7 text-secondary/20 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-muted/50 border border-primary/30 backdrop-blur-sm animate-fade-in glow-border">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm font-semibold">White-Label AI Sales Infrastructure</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-up">
          We don't compete with{" "}
          <br className="hidden md:block" />
          <span className="gradient-text glow-text">sales teams</span>
          <br />
          We <span className="gradient-text glow-text">arm them</span> with AI agents
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
          LexiPitch unifies AI calls, WhatsApp, email, and lead generation into one intelligent platform — 
          automating every stage of the sales journey
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <a href="#contact">
            <Button size="lg" className="text-lg px-8 py-6 glow-border group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity" />
            </Button>
          </a>
        </div>
        

        

      </div>
    </section>
  );
};
