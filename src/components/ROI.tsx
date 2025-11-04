import { useMemo, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, TrendingUp, IndianRupee, Gauge, ArrowUpRight } from "lucide-react";

export const ROI = () => {
  // Fixed fees
  const setupFee = 75000; // one-time
  const annualFee = 30000; // annual

  // Controls
  const [minutes, setMinutes] = useState<number>(100000); // default to 1L minutes
  const [costPerMinute, setCostPerMinute] = useState<number>(2.0); // what we charge partner (₹)
  const [markup, setMarkup] = useState<number>(2.0); // partner sells at 2x by default

  const sellingPrice = useMemo(() => costPerMinute * markup, [costPerMinute, markup]);

  const grossRevenue = useMemo(() => sellingPrice * minutes, [sellingPrice, minutes]);
  const variableCost = useMemo(() => costPerMinute * minutes, [costPerMinute, minutes]);
  const fixedCost = setupFee + annualFee;
  const netProfit = useMemo(() => grossRevenue - variableCost - fixedCost, [grossRevenue, variableCost]);

  const breakevenMinutes = useMemo(() => {
    const perMinuteMargin = sellingPrice - costPerMinute;
    if (perMinuteMargin <= 0) return Infinity;
    return Math.ceil(fixedCost / perMinuteMargin);
  }, [sellingPrice, costPerMinute]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <section id="roi" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold">See Your ROI</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Minutes In, <span className="gradient-text glow-text">Profit Out</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent economics your CFO will love. One-time setup {formatINR(setupFee)} and annual {formatINR(annualFee)}.
              Slide minutes to see how margins scale — at 1 lakh minutes, fayda compounding hai.
            </p>
          </div>
        </ScrollReveal>

        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <Label htmlFor="minutes" className="text-sm font-semibold mb-3 block">Monthly Minutes</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  value={[minutes]}
                  min={1000}
                  max={200000}
                  step={1000}
                  onValueChange={(v) => setMinutes(v[0])}
                />
              </div>
              <Input
                id="minutes"
                type="number"
                className="w-28"
                value={minutes}
                min={1000}
                max={200000}
                step={1000}
                onChange={(e) => setMinutes(Number(e.target.value || 0))}
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5" /> Range: 1k - 200k minutes
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <Label htmlFor="cost" className="text-sm font-semibold mb-2 block">Our Charge (₹/min)</Label>
            <Input
              id="cost"
              type="number"
              value={costPerMinute}
              min={0}
              step={0.1}
              onChange={(e) => setCostPerMinute(Number(e.target.value || 0))}
            />
            <div className="mt-3 text-xs text-muted-foreground">Default shown for illustration. You control pricing.</div>
          </div>

          <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <Label htmlFor="markup" className="text-sm font-semibold mb-2 block">Your Markup (x)</Label>
            <Input
              id="markup"
              type="number"
              value={markup}
              min={1}
              step={0.1}
              onChange={(e) => setMarkup(Number(e.target.value || 0))}
            />
            <div className="mt-3 text-xs text-muted-foreground">Example: we charge x, you charge 2x to clients.</div>
          </div>
        </div>

        {/* Highlight at 1L */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            1,00,000 minutes sweet-spot
          </Badge>
          <span className="text-sm text-muted-foreground">Scale unlocks superior unit economics</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Fixed fees */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
            <div className="text-sm text-muted-foreground mb-1">One-time Setup</div>
            <div className="text-2xl font-bold">{formatINR(setupFee)}</div>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground mb-1">Annual</div>
            <div className="text-2xl font-bold">{formatINR(annualFee)}</div>
          </div>

          {/* Revenue */}
          <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Gross Revenue</div>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold mt-1">{formatINR(grossRevenue)}</div>
            <div className="text-xs text-muted-foreground mt-2">Selling price ₹{sellingPrice.toFixed(2)} × {minutes.toLocaleString("en-IN")} min</div>
          </div>

          {/* Cost */}
          <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Variable Cost</div>
              <IndianRupee className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-3xl font-bold mt-1">{formatINR(variableCost)}</div>
            <div className="text-xs text-muted-foreground mt-2">Our charge ₹{costPerMinute.toFixed(2)} × {minutes.toLocaleString("en-IN")} min</div>
          </div>

          {/* Profit */}
          <div className={`p-6 rounded-2xl border backdrop-blur-sm ${netProfit >= 0 ? "bg-emerald-500/10 border-emerald-400/30" : "bg-rose-500/10 border-rose-400/30"}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Net Profit (after fixed fees)</div>
              <ArrowUpRight className={`w-4 h-4 ${netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`} />
            </div>
            <div className="text-3xl font-bold mt-1">{formatINR(netProfit)}</div>
            <div className="text-xs text-muted-foreground mt-2">Includes one-time and annual fees</div>
          </div>
        </div>

        {/* Breakeven */}
        <div className="mt-8 p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm text-center">
          {Number.isFinite(breakevenMinutes) ? (
            <div className="text-sm text-muted-foreground">
              Break-even at <span className="font-semibold text-foreground">{breakevenMinutes.toLocaleString("en-IN")}</span> minutes. Beyond this, every minute compounds your profit.
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Markup must be greater than cost to realize profit. Increase markup above x1.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
