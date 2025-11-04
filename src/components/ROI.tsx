import { useMemo, useState, useEffect, useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, TrendingUp, IndianRupee, Gauge, ArrowUpRight, Zap, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

// Pricing tiers in hours as per requirements (converted to minutes)
const PRICING_TIERS = [
  { 
    minMinutes: 0, 
    minHours: 0,
    rate: 2.675, 
    label: "No Commitment" 
  },
  { 
    minMinutes: 120000, // 2000 hours
    minHours: 2000,
    rate: 2.45, 
    label: "2000+ Hours" 
  },
  { 
    minMinutes: 600000, // 10000 hours
    minHours: 10000,
    rate: 2.123, 
    label: "10,000+ Hours" 
  },
  { 
    minMinutes: 3000000, // 50000 hours
    minHours: 50000,
    rate: 1.973, 
    label: "50,000+ Hours" 
  }
];

const getTierForMinutes = (minutes: number) => {
  // Find the highest tier where minutes are greater than or equal to the tier's minMinutes
  const matchingTiers = PRICING_TIERS.filter(tier => minutes >= tier.minMinutes);
  // Return the tier with the highest minMinutes that matches, or the first tier if none match
  return matchingTiers.length > 0 
    ? matchingTiers.reduce((maxTier, currentTier) => 
        currentTier.minMinutes > maxTier.minMinutes ? currentTier : maxTier
      )
    : PRICING_TIERS[0];
};

// Animation variants for price changes
const priceChangeVariants = {
  initial: { scale: 1, y: 0 },
  pulse: { 
    scale: [1, 1.1, 1],
    y: [0, -5, 0],
    transition: { duration: 0.6 }
  }
};

export const ROI = () => {
  // Fixed fees - Key USPs
  const setupFee = 75000; // One-time setup (Key USP)
  const annualFee = 30000; // Annual fee (recurring)

  // Convert minutes to hours for display and input
  const [hours, setHours] = useState<number>(2000); // Default to 2000 hours
  const minutes = useMemo(() => hours * 60, [hours]); // Convert to minutes for calculations
  
  const [currentTier, setCurrentTier] = useState(getTierForMinutes(minutes));
  const [costPerMinute, setCostPerMinute] = useState<number>(2.675); // Start with no-commitment rate
  const [markup, setMarkup] = useState<number>(2.0); // partner sells at 2x by default
  const [showPriceDrop, setShowPriceDrop] = useState(false);
  const [prevTier, setPrevTier] = useState(currentTier);

  // Track previous tier to detect changes
  const prevTierRef = useRef(currentTier);
  const isInitialMount = useRef(true);
  
  // Update pricing tier when minutes change
  useEffect(() => {
    const newTier = getTierForMinutes(minutes);
    
    // Don't do anything if tier hasn't changed
    if (newTier.minHours === currentTier.minHours) {
      setCostPerMinute(newTier.rate);
      return;
    }
    
    // Only show confetti when moving to a higher tier (lower rate)
    // and it's not the initial mount
    if (newTier.rate < currentTier.rate && !isInitialMount.current) {
      setShowPriceDrop(true);
      
      // More noticeable confetti
      confetti({
        particleCount: 150,
        spread: 100,
        startVelocity: 30,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6'],
        ticks: 100,
      });
      
      const timer = setTimeout(() => setShowPriceDrop(false), 2000);
      
      // Update the current tier
      setPrevTier(currentTier);
      setCurrentTier(newTier);
      
      return () => clearTimeout(timer);
    } else {
      // Update the tier without animation
      setPrevTier(currentTier);
      setCurrentTier(newTier);
    }
    
    // Update the rate to match the current tier
    setCostPerMinute(newTier.rate);
    
    // Mark initial mount as complete
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [minutes]);

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
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {/* One-time Setup - Highlighted as USP */}
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-50/80 border border-amber-200/60 shadow-sm">
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      FIRST YEAR INCLUDED
                    </div>
                  </div>
                  <div className="text-amber-700 text-sm font-medium mb-1">One-time Setup</div>
                  <div className="text-2xl font-bold text-amber-900">₹75,000</div>
                  <div className="mt-2 text-xs text-amber-600">
                    <span className="font-medium">✓</span> One-time payment included in first year
                  </div>
                </div>
                
                {/* Annual Charge */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-600 text-sm font-medium mb-1">Annual Charge</div>
                  <div className="text-2xl font-bold text-slate-900">₹30,000<span className="text-sm font-normal text-slate-500">/year</span></div>
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="font-medium">✓</span> Applicable from second year onwards
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center max-w-2xl">
                No per-minute commitments • Scale up or down anytime • Cancel anytime
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Minutes In, <span className="gradient-text glow-text">Profit Out</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent economics your CFO will love. One-time setup {formatINR(setupFee)} and annual {formatINR(annualFee)}.
              Slide minutes to see how margins scale — at 100,000 minutes, the benefits start compounding.
            </p>
          </div>
        </ScrollReveal>

        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <Label htmlFor="hours" className="text-sm font-semibold mb-3 block">Monthly Hours</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="space-y-4">
                  <Slider
                    value={[hours]}
                    min={0}
                    max={100000} // 100K hours max
                    step={100}
                    onValueChange={(v) => {
                      // Only update if the value actually changes
                      if (v[0] !== hours) {
                        setHours(v[0]);
                      }
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>0 Hours</span>
                    <span>100,000+ Hours</span>
                  </div>
                </div>
              </div>
              <Input
                id="hours"
                type="number"
                className="w-28"
                value={hours}
                min={0}
                max={100000}
                step={100}
                onChange={(e) => setHours(Number(e.target.value) || 0)}
              />
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Current Tier</div>
                  <div className="text-xs text-muted-foreground">
                    {currentTier.minHours > 0 
                      ? `${currentTier.minHours.toLocaleString()}+ hours`
                      : 'No commitment'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary">{currentTier.label}</div>
                  <div className="text-xs text-muted-foreground">
                    ₹{currentTier.rate.toFixed(3)}/min
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div className="p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="cost" className="text-sm font-semibold">Price per Minute</Label>
                <div className="flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  <span>Volume Discounts Active</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {currentTier.minHours > 0 
                  ? `At ${currentTier.minHours.toLocaleString()}+ hours`
                  : 'No commitment required'}
              </p>
            </div>
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground">₹</span>
                </div>
                <Input
                  id="cost"
                  type="number"
                  value={costPerMinute}
                  min={0}
                  step={0.001}
                  readOnly
                  className="font-mono text-2xl font-bold text-primary bg-primary/5 pl-7 h-14"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  per min
                </div>
              </div>
              <AnimatePresence>
                {showPriceDrop && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -top-6 right-0 bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {((prevTier.rate - currentTier.rate) / prevTier.rate * 100).toFixed(0)}% OFF!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Pricing Tiers:</h4>
              <div className="grid gap-2">
                {PRICING_TIERS.map((tier, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-between p-2 rounded-md text-sm ${
                      currentTier.label === tier.label 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50'
                    }`}
                  >
                    <span className="font-medium">
                      {tier.minHours > 0 
                        ? `${tier.minHours.toLocaleString()}+ hours`
                        : 'No commitment'}
                    </span>
                    <span className="font-mono font-bold">₹{tier.rate.toFixed(3)}/min</span>
                  </div>
                ))}
              </div>
            </div>
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
