import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Palette, Users, Image as ImageIcon } from "lucide-react";
import favicon from "@/assets/favicon.ico";

type Props = {
  open: boolean;
  onClose: () => void;
  dashboardSrc?: string;
};

export const SeeItInAction = ({ open, onClose, dashboardSrc = "/src/assets/dashboard.png" }: Props) => {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("Your Brand");
  const [team, setTeam] = useState("Sales");
  type Theme = { name: string; primary: string; secondary: string; accent: string };
  const themes: Theme[] = [
    { name: "Violet Pulse", primary: "#7c3aed", secondary: "#a78bfa", accent: "#22d3ee" },
    { name: "Ocean", primary: "#0ea5e9", secondary: "#22d3ee", accent: "#10b981" },
    { name: "Emerald", primary: "#10b981", secondary: "#34d399", accent: "#3b82f6" },
    { name: "Amber", primary: "#f59e0b", secondary: "#fbbf24", accent: "#8b5cf6" },
    { name: "Rose", primary: "#ef4444", secondary: "#fb7185", accent: "#22d3ee" },
  ];
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [imgError, setImgError] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Lock background scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative z-10 w-[95vw] max-w-6xl max-h-[90vh] rounded-2xl border overflow-hidden shadow-2xl"
        style={{
          borderColor: "rgba(59,130,246,0.2)",
          background: `linear-gradient(135deg, ${theme.secondary}0F, ${theme.accent}0A 40%, transparent)`
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: `${theme.primary}22` }}>
          <div className="flex items-center gap-3">
            <img src={logo || favicon} alt="Brand" className="w-8 h-8 rounded" />
            <div className="text-lg font-semibold">See it in action</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full h-1 bg-muted">
          <div className="h-full transition-all" style={{ width: `${(step - 1) * 50}%`, background: theme.primary }} />
        </div>

        <div className="grid md:grid-cols-5 gap-0 overflow-auto max-h-[calc(90vh-68px)]">
          {/* Left: Controls */}
          <div className="md:col-span-2 p-6 space-y-6 border-r bg-card/60" style={{ borderColor: `${theme.primary}22` }}>
            <div className="flex items-center gap-3 text-sm">
              {[1,2,3].map((s) => (
                <div key={s} className={`flex items-center gap-2 ${s === step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <div className={`w-6 h-6 rounded-full grid place-items-center text-xs font-semibold ${s <= step ? 'bg-primary text-white' : 'bg-muted'}`}>{s}</div>
                  {s < 3 && <div className="w-8 h-[2px] bg-muted" />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="font-semibold flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Preview: Default Dashboard</div>
                <p className="text-sm text-muted-foreground">Start here — this is the default view your clients see before branding.</p>
                <div className="rounded-xl border border-primary/20 bg-background overflow-hidden">
                  {imgError ? (
                    <div className="aspect-video flex items-center justify-center text-sm text-muted-foreground">Add /src/assets/dashboard.png to show screenshot</div>
                  ) : (
                    <img
                      src={dashboardSrc}
                      alt="Dashboard"
                      className="w-full h-auto block transition-transform duration-300 hover:scale-[1.01]"
                      onError={() => setImgError(true)}
                    />
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="font-semibold">Brand it as yours</div>

                <label className="block text-sm">Your company name</label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-background border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Enter company name"
                />

                <label className="block text-sm mt-2 flex items-center gap-2"><Users className="w-4 h-4" /> Choose a team</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-background border border-primary/20 focus:outline-none"
                >
                  <option>Sales</option>
                  <option>Growth</option>
                  <option>Success</option>
                  <option>Agency</option>
                </select>

                <label className="block text-sm mt-2 flex items-center gap-2"><Palette className="w-4 h-4" /> Choose a theme</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTheme(t)}
                      className={`text-left p-3 rounded-lg border transition-all hover:shadow-sm ${
                        theme.name === t.name ? 'border-primary/50 ring-2 ring-primary/30' : 'border-primary/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="flex items-center gap-1">
                          <span className="w-4 h-4 rounded" style={{ background: t.primary }} />
                          <span className="w-4 h-4 rounded" style={{ background: t.secondary }} />
                          <span className="w-4 h-4 rounded" style={{ background: t.accent }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm mb-2">Upload your logo</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = () => setLogo(reader.result as string);
                      reader.readAsDataURL(f);
                    }}
                  />
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDrag(false);
                      const f = e.dataTransfer.files?.[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = () => setLogo(reader.result as string);
                      reader.readAsDataURL(f);
                    }}
                    className={`flex items-center justify-between gap-3 p-3 rounded-md border ${drag ? 'border-primary/60 bg-primary/5' : 'border-primary/20 bg-muted/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Drag & drop logo or</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>Choose file</Button>
                      {logo && <Button size="sm" variant="ghost" onClick={() => setLogo(null)}>Reset</Button>}
                    </div>
                  </div>
                  {logo && (
                    <div className="mt-3 flex items-center gap-3">
                      <img src={logo} alt="Logo preview" className="w-10 h-10 rounded" />
                      <span className="text-sm text-muted-foreground">Preview applied live on the right</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="font-semibold">Instant preview</div>
                <p className="text-sm text-muted-foreground">Your logo, name, and colors applied instantly across the dashboard.</p>
                <div className="rounded-xl border border-primary/20 overflow-hidden">
                  <PreviewPanel companyName={companyName} theme={theme} dashboardSrc={dashboardSrc} onImgError={() => setImgError(true)} />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>Back</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setCompanyName("Your Brand"); setTeam("Sales"); setTheme(themes[0]); }}>Reset</Button>
                {step < 3 ? (
                  <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
                ) : (
                  <Button onClick={onClose}>Looks good</Button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Live preview */}
          <div className="md:col-span-3 p-4" style={{ background: `linear-gradient(180deg, ${theme.primary}08, transparent)` }}>
            <div className="rounded-xl border overflow-hidden relative" style={{ borderColor: `${theme.primary}33`, background: `linear-gradient(135deg, ${theme.secondary}10, transparent 60%)` }}>
              <PreviewPanel companyName={companyName} theme={theme} dashboardSrc={dashboardSrc} onImgError={() => setImgError(true)} />
              {/* Header bar */}
              <div className="absolute top-0 left-0 right-0 h-12 flex items-center gap-3 px-4" style={{ background: `${theme.primary}F2` }}>
                <img src={logo || favicon} alt="brand" className="w-6 h-6 rounded" />
                <span className="text-white text-sm font-semibold">{companyName} • {team}</span>
                <span className="ml-auto text-white/80 text-xs px-2 py-1 rounded" style={{ background: `${theme.accent}99` }}>Live Preview</span>
              </div>
              {/* Sidebar accent */}
              <div className="absolute top-12 left-0 bottom-0 w-1.5" style={{ background: theme.primary }} />
              {/* Floating themed UI chips */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="px-3 py-1.5 rounded-lg text-xs text-white shadow" style={{ background: theme.secondary }}>Interested Leads ↑12%</div>
                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow" style={{ background: theme.accent }}>Book meeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PreviewPanel({ companyName, theme, dashboardSrc, onImgError }: { companyName: string; theme: { primary: string; secondary: string; accent: string }; dashboardSrc: string; onImgError: () => void; }) {
  const [error, setError] = useState(false);
  return (
    <div className="relative">
      {error ? (
        <div className="aspect-video bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
          Add /src/assets/dashboard.png to show screenshot
        </div>
      ) : (
        <img
          src={dashboardSrc}
          alt="Dashboard preview"
          className="w-full h-auto block"
          onError={() => { setError(true); onImgError(); }}
        />
      )}
      {/* Themed overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 0 9999px ${theme.primary}10` }} />
      {/* Subtle gradient beams */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl" style={{ background: `${theme.secondary}40` }} />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full blur-3xl" style={{ background: `${theme.accent}30` }} />
    </div>
  );
}
