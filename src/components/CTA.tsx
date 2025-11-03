import { ScrollReveal } from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 border border-primary/20 glow-border">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Sales?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the future of AI-powered sales automation. Start your white-label journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Get Partner Access
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/20">
                Schedule Demo
              </Button>
            </div>

            <div className="pt-8 border-t border-primary/10">
              <p className="text-sm text-muted-foreground mb-4">Contact Us</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="https://partners.lexipitch.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Globe className="w-4 h-4" />
                  partners.lexipitch.com
                </a>
                <a href="mailto:naman@lexipitch.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  naman@lexipitch.com
                </a>
                <a href="tel:+919079243628" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +91-9079243628
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
