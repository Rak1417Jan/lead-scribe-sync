import { useMemo, useState, useEffect, useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, TrendingUp, TrendingDown, IndianRupee, Gauge, ArrowUpRight, Zap, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

// Pricing tiers in hours as per requirements (converted to minutes)
const PRICING_TIERS = [
  { 
    minMinutes: 0, 
    maxMinutes: 119999, // 0 to 1999.98 hours
    minHours: 0,
    rate: 2.675, 
    label: "No Commitment" 
  },
  { 
    minMinutes: 120000, // 2000 hours
    maxMinutes: 599999, // 2000 to 9999.98 hours
    minHours: 2000,
    rate: 2.45, 
    label: "2000+ Hours" 
  },
  { 
    minMinutes: 600000, // 10000 hours
    maxMinutes: 2999999, // 10000 to 49999.98 hours
    minHours: 10000,
    rate: 2.123, 
    label: "10,000+ Hours" 
  },
  { 
    minMinutes: 3000000, // 50000 hours and above
    maxMinutes: Infinity,
    minHours: 50000,
    rate: 1.973, 
    label: "50,000+ Hours" 
  }
];

const getTierForMinutes = (minutes: number) => {
  // Find the tier where minutes fall between minMinutes and maxMinutes
  const matchingTier = PRICING_TIERS.find(tier => 
    minutes >= tier.minMinutes && minutes <= tier.maxMinutes
  );
  
  // Return the matching tier or the first tier if none match (shouldn't happen with proper ranges)
  return matchingTier || PRICING_TIERS[0];
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
    
    // Always update the cost per minute to match the current tier
    setCostPerMinute(newTier.rate);
    
    // Don't do anything else if tier hasn't changed
    if (newTier.minHours === currentTier.minHours) {
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
    
    // Mark initial mount as complete
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [minutes, currentTier]);

  const sellingPrice = useMemo(() => costPerMinute * markup, [costPerMinute, markup]);

  const grossRevenue = useMemo(() => sellingPrice * minutes, [sellingPrice, minutes]);
  const variableCost = useMemo(() => costPerMinute * minutes, [costPerMinute, minutes]);
  const netProfit = useMemo(() => grossRevenue - variableCost, [grossRevenue, variableCost]);

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
                onChange={(e) => {
                  const newValue = Math.min(Math.max(0, Number(e.target.value) || 0), 100000);
                  setHours(newValue);
                  // Force update the tier and cost per minute
                  const newTier = getTierForMinutes(newValue * 60);
                  setCurrentTier(newTier);
                  setCostPerMinute(newTier.rate);
                }}
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

        <div className="grid lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Revenue */}
          <motion.div 
            className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {/* Animated background elements */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/5 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium tracking-wide text-primary/80">
                  GROSS REVENUE
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <TrendingUp className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
              
              <motion.div 
                key={`revenue-${grossRevenue}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-2 text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              >
                {formatINR(grossRevenue)}
              </motion.div>
              
              <motion.div 
                className="mt-3 p-2 bg-primary/5 rounded-lg border border-primary/10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-mono font-semibold">₹{sellingPrice.toFixed(2)}/min</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Minutes</span>
                  <span className="font-mono">{minutes.toLocaleString("en-IN")}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-primary/10 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Markup</span>
                    <span className="font-semibold text-primary">{markup.toFixed(1)}x</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Subtle animated border effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ repeat: Infinity, duration: 3, repeatType: 'reverse' }}
            />
          </motion.div>

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
          <motion.div 
            className={`relative overflow-hidden p-6 rounded-2xl border backdrop-blur-sm ${
              netProfit >= 0 
                ? "bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-400/30" 
                : "bg-gradient-to-br from-rose-500/5 to-rose-600/10 border-rose-400/30"
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Animated background elements */}
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 blur-xl" 
                 style={{ background: netProfit >= 0 ? '#10b981' : '#f43f5e' }}>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
                  Net Profit
                </div>
                <motion.div 
                  animate={{ rotate: netProfit >= 0 ? 0 : 180 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {netProfit >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-rose-400" />
                  )}
                </motion.div>
              </div>
              
              <motion.div 
                key={netProfit}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`mt-2 text-4xl font-bold tracking-tight ${
                  netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatINR(netProfit)}
              </motion.div>
              
              <motion.div 
                className={`mt-2 text-xs font-medium ${
                  netProfit >= 0 ? 'text-emerald-400/80' : 'text-rose-400/80'
                }`}
              >
                {netProfit >= 0 ? '✓ Profitable' : 'Adjust to increase profit'}
              </motion.div>
              
              {/* Subtle animated border effect */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
              />
            </div>
          </motion.div>
          <div className="text-xs text-muted-foreground mt-2">After one-time and annual fees</div>
        </div>

      </div>
    </section>
  );
};
