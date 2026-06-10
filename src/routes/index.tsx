import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Brain, Megaphone, Users, Contact, Star, Shield, BarChart3,
  Layers, Atom, ArrowRight, Check, Zap, TrendingDown, X, Lock, LayoutDashboard, LogOut,
  Plug, Fingerprint, BookOpen, Radar, Wand2, Radio, Workflow, LineChart, FlaskConical, Handshake,
  Mail
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/ThemeToggle";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { LandingPricingSection } from "@/components/billing/PlansSection";
import { BillingToggle } from "@/components/billing/BillingToggle";
import { PLANS, useBillingToggle } from "@/lib/plans";
import type { AuthTab } from "@/types/auth";

export const Route = createFileRoute("/")({
  component: Landing,
});

const MODULES = [
  { icon: Brain, title: "Brand Intelligence", desc: "Permanent AI memory of your voice, archetype & guidelines.", span: "md:col-span-2 md:row-span-2", accent: "indigo" },
  { icon: Sparkles, title: "Creative Engine", desc: "Multi-platform content production studio.", accent: "purple" },
  { icon: Megaphone, title: "Campaign Automation", desc: "Cross-channel deployment with auto-pilot.", accent: "indigo" },
  { icon: Users, title: "Audience Intelligence", desc: "Predictive segments. Geo hot-spots.", accent: "emerald" },
  { icon: Contact, title: "Lead & CRM", desc: "Unified inbox. AI lead scoring.", span: "md:col-span-2", accent: "indigo" },
  { icon: Star, title: "Influencer OS", desc: "Vet creators. Catch fake followers.", accent: "purple" },
  { icon: Shield, title: "Reputation Radar", desc: "Crisis alerts & social listening.", accent: "rose" },
  { icon: BarChart3, title: "Unified Analytics", desc: "Revenue attribution + AI forecast.", accent: "emerald" },
  { icon: Atom, title: "Simulation Engine", desc: "Predict ROI before you spend a cent.", accent: "purple" },
  { icon: Layers, title: "Collaboration", desc: "Approvals, calendar, asset library.", accent: "indigo" },
];

const CORE_FEATURES: { icon: any; label: string; accent: string }[] = [
  { icon: Plug, label: "Connect Platform", accent: "text-sky-300" },
  { icon: Fingerprint, label: "Brand DNA", accent: "text-indigo-300" },
  { icon: BookOpen, label: "Brand Guideline Generator", accent: "text-violet-300" },
  { icon: Brain, label: "Brand Intelligence", accent: "text-purple-300" },
  { icon: Radar, label: "Audience Intelligence", accent: "text-emerald-300" },
  { icon: Wand2, label: "Creative Engine", accent: "text-fuchsia-300" },
  { icon: Radio, label: "Reputation & Listening", accent: "text-rose-300" },
  { icon: Workflow, label: "Campaign Automation", accent: "text-amber-300" },
  { icon: Star, label: "Influencer OS", accent: "text-yellow-300" },
  { icon: Contact, label: "Lead & CRM", accent: "text-cyan-300" },
  { icon: LineChart, label: "Unified Analytics", accent: "text-teal-300" },
  { icon: FlaskConical, label: "Simulation Engine", accent: "text-pink-300" },
  { icon: Handshake, label: "Collaborations", accent: "text-blue-300" },
];

const REPLACED_TOOLS = [
  { name: "HubSpot", cost: 800 },
  { name: "Hootsuite", cost: 249 },
  { name: "Canva Teams", cost: 120 },
  { name: "Jasper AI", cost: 99 },
  { name: "Brandwatch", cost: 600 },
  { name: "Mailchimp", cost: 220 },
  { name: "Sprout Social", cost: 299 },
  { name: "AdEspresso", cost: 199 },
  { name: "Brand24", cost: 149 },
  { name: "Klaviyo", cost: 350 },
  { name: "Lookr Influencer", cost: 280 },
  { name: "Hotjar", cost: 99 },
];


function Landing() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("signup");
  const openAuth = (tab: AuthTab) => { setAuthTab(tab); setDemoOpen(true); };
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Nav onOpenAuth={openAuth} />
      <Hero onOpenDemo={() => openAuth("signup")} />
      <Marquee />
      <Bento />
      <LandingPricingSection />
      <ReplacementCalculator />
      
      <Footer />
      <AuthModal open={demoOpen} onOpenChange={setDemoOpen} initialTab={authTab} />
    </div>
  );
}

const ghostBtnStyle: React.CSSProperties = {
  background: "transparent",
  border: "0.5px solid #2D2D4E",
  color: "#E2E8F0",
  borderRadius: 8,
  padding: "9px 20px",
  fontSize: 14,
  fontWeight: 500,
  transition: "all 150ms ease",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};
const purpleBtnStyle: React.CSSProperties = {
  background: "#7C3AED",
  color: "#fff",
  border: "0.5px solid #7C3AED",
  borderRadius: 8,
  padding: "9px 20px",
  fontSize: 14,
  fontWeight: 500,
  transition: "all 150ms ease",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

function NavButton({
  variant, onClick, children, ariaLabel,
}: { variant: "ghost" | "purple"; onClick?: () => void; children: React.ReactNode; ariaLabel?: string }) {
  const [hover, setHover] = useState(false);
  // Unified style for guest nav buttons: purple base, transparent on hover.
  const base: React.CSSProperties = {
    background: "#7C3AED",
    color: "#fff",
    border: "0.5px solid #7C3AED",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 150ms ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  const hoverStyle: React.CSSProperties = hover
    ? { background: "transparent", color: "#A78BFA", borderColor: "#7C3AED" }
    : {};
  // Keep variant param for backwards compatibility; styles intentionally identical.
  void variant;
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...hoverStyle }}
    >
      {children}
    </button>
  );
}

function Nav({ onOpenAuth }: { onOpenAuth: (tab: AuthTab) => void }) {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const [accountPopup, setAccountPopup] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // close avatar dropdown on outside click
  useEffect(() => {
    if (!avatarMenu) return;
    const onClick = (e: MouseEvent) => {
      if (!avatarRef.current?.contains(e.target as Node)) setAvatarMenu(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [avatarMenu]);

  const isLoggedIn = !!session?.user;
  const displayName = (user?.user_metadata?.full_name as string) || user?.email?.split("@")[0] || "U";
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) || undefined;

  const handleDashboardClick = () => {
    if (isLoggedIn) navigate({ to: "/dashboard/intelligence" });
    else setAccountPopup(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAvatarMenu(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[color:var(--app-bg)]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center glow-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">BrandSync <span className="text-indigo-400">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Platform</a>
            <a href="#calc" className="hover:text-foreground">Replace Stack</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isLoggedIn ? (
              <>
                <NavButton variant="ghost" onClick={() => onOpenAuth("login")}>Login</NavButton>
                <NavButton variant="purple" onClick={() => onOpenAuth("signup")}>Sign Up</NavButton>
                <NavButton variant="ghost" onClick={handleDashboardClick}>
                  Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </NavButton>
              </>
            ) : (
              <>
                <NavButton variant="purple" onClick={() => navigate({ to: "/dashboard/intelligence" })}>
                  <LayoutDashboard className="h-3.5 w-3.5" /> Go to Dashboard
                </NavButton>
                <div ref={avatarRef} className="relative">
                  <button
                    type="button"
                    aria-label="Account menu"
                    onClick={() => setAvatarMenu((v) => !v)}
                    style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: avatarUrl ? `center/cover url(${avatarUrl})` : "#2D2D4E",
                      color: "#A78BFA", fontSize: 12, fontWeight: 600,
                      display: "grid", placeItems: "center", cursor: "pointer",
                    }}
                  >
                    {!avatarUrl && initials}
                  </button>
                  <AnimatePresence>
                    {avatarMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-44 overflow-hidden"
                        style={{ background: "#1A1A2E", border: "0.5px solid #2D2D4E", borderRadius: 10, zIndex: 60 }}
                      >
                        <button
                          type="button"
                          onClick={() => { setAvatarMenu(false); navigate({ to: "/dashboard/intelligence" }); }}
                          className="w-full text-left px-3 py-2 text-[13px] flex items-center gap-2 hover:bg-white/5"
                          style={{ color: "#E2E8F0" }}
                        >
                          <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                        </button>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full text-left px-3 py-2 text-[13px] flex items-center gap-2 hover:bg-white/5"
                          style={{ color: "#E2E8F0" }}
                        >
                          <LogOut className="h-3.5 w-3.5" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <AccountRequiredPopup
        open={accountPopup}
        onClose={() => setAccountPopup(false)}
        onSignUp={() => { setAccountPopup(false); onOpenAuth("signup"); }}
        onLogin={() => { setAccountPopup(false); onOpenAuth("login"); }}
      />
    </>
  );
}

function AccountRequiredPopup({
  open, onClose, onSignUp, onLogin,
}: { open: boolean; onClose: () => void; onSignUp: () => void; onLogin: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 8000);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-required-title"
          style={{
            position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
            background: "#1A1A2E", border: "0.5px solid #7C3AED", borderRadius: 12,
            padding: "20px 24px", maxWidth: 360, width: "calc(100% - 32px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 1001,
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{ position: "absolute", top: 12, right: 12, color: "#64748B", cursor: "pointer", background: "transparent", border: "none" }}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex justify-center">
            <Lock className="h-5 w-5" style={{ color: "#A78BFA" }} />
          </div>
          <h3
            id="account-required-title"
            className="text-center"
            style={{ marginTop: 8, fontSize: 16, fontWeight: 500, color: "#E2E8F0" }}
          >
            Account required
          </h3>
          <p
            className="text-center"
            style={{ marginTop: 6, fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}
          >
            You need an account to access the BrandSync AI dashboard. Sign up free or log in to continue.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              type="button"
              onClick={onSignUp}
              style={{
                flex: 1, background: "#7C3AED", color: "#fff", borderRadius: 8,
                padding: "9px 0", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer",
              }}
            >
              Sign Up Free
            </button>
            <button
              type="button"
              onClick={onLogin}
              style={{
                flex: 1, background: "transparent", border: "0.5px solid #2D2D4E", color: "#E2E8F0",
                borderRadius: 8, padding: "9px 0", fontSize: 13, cursor: "pointer",
              }}
            >
              Log In
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <section className="relative">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          v3.0 — Now with Predictive Simulation Engine
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight"
        >
          <span className="text-gradient">BrandSync AI</span>
          <div className="text-foreground/90 mt-2 text-3xl md:text-5xl">
            Integrated Marketing & Intelligence OS
          </div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          One AI platform replacing your entire MarTech stack — branding, creative, campaigns,
          CRM, influencers, listening, analytics. <span className="text-foreground">10–15 tools. One unified OS.</span>
        </motion.p>

        {/* Floating product mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="relative mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-2 glow-primary">
            <div className="rounded-xl bg-[#0a0d16]/80 backdrop-blur-md p-6 grid grid-cols-12 gap-4 min-h-[340px]">
              <div className="col-span-4 glass rounded-lg p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Predicted ROAS</div>
                <div className="mt-2 text-3xl font-semibold text-emerald-300">4.82×</div>
                <div className="mt-3 h-16 flex items-end gap-1">
                  {[40, 55, 48, 70, 82, 76, 95].map((v, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500/40 to-purple-400" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>
              <div className="col-span-5 glass rounded-lg p-4">
                <div className="flex items-center gap-2 text-xs text-indigo-300"><Sparkles className="h-3.5 w-3.5" /> AI Recommendation</div>
                <div className="mt-2 text-sm">Shift 22% of Meta budget to TikTok creators in the 18–24 segment. Projected lift:</div>
                <div className="mt-2 flex items-baseline gap-2"><span className="text-2xl font-semibold text-emerald-300">+38%</span><span className="text-xs text-muted-foreground">CTR · 14d</span></div>
                <div className="mt-3 inline-flex items-center gap-2 text-xs rounded-md bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2 py-1">Auto-pilot ON</div>
              </div>
              <div className="col-span-3 glass rounded-lg p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Sentiment</div>
                <div className="mt-2 relative h-24 w-24 mx-auto rounded-full bg-[conic-gradient(from_0deg,oklch(0.72_0.18_155)_0_240deg,oklch(0.65_0.02_260)_240deg_320deg,oklch(0.65_0.25_20)_320deg_360deg)]">
                  <div className="absolute inset-2 rounded-full bg-[#0a0d16] grid place-items-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold">68%</div>
                      <div className="text-[9px] text-muted-foreground">positive</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 glass rounded-lg p-4">
                <div className="flex items-center gap-2 text-xs text-purple-300 mb-3"><Atom className="h-3.5 w-3.5" /> Simulation: $40K · 14d · D2C / Skincare</div>
                <div className="grid grid-cols-4 gap-3">
                  {[{l:"Reach",v:"2.4M"},{l:"CTR",v:"3.1%"},{l:"Conv. Prob.",v:"71%"},{l:"Efficiency",v:"A"}].map((m) => (
                    <div key={m.l} className="rounded-md bg-white/5 px-3 py-2">
                      <div className="text-[10px] text-muted-foreground">{m.l}</div>
                      <div className="text-base font-semibold text-foreground">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...CORE_FEATURES, ...CORE_FEATURES];
  return (
    <section className="relative py-12 border-y border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
      <div className="text-center mb-6 px-6">
        <div className="text-[11px] uppercase tracking-[0.25em] text-indigo-300/80 font-semibold mb-2">Unified Brand and Marketing Intelligence</div>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Our Core Intelligence for Every Brand and Marketing <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">Every Decision.</span>
        </h3>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex gap-4 animate-marquee whitespace-nowrap w-max">
          {items.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300 shrink-0"
              >
                <Icon className={`w-4 h-4 ${f.accent} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">{f.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Bento() {
  const accentMap: Record<string, string> = {
    indigo: "from-indigo-500/20 text-indigo-300",
    purple: "from-purple-500/20 text-purple-300",
    emerald: "from-emerald-500/20 text-emerald-300",
    rose: "from-rose-500/20 text-rose-300",
  };
  return (
    <section id="features" className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-[11px] uppercase tracking-widest text-indigo-300/80">The Platform</div>
        <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">10 Modules. <span className="text-gradient">One brain.</span></h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Every team. Every channel. Every metric — orchestrated by a single AI that knows your brand inside out.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-4">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              whileHover={{ y: -4 }}
              className={`relative group glass rounded-2xl p-6 overflow-hidden ${m.span ?? ""}`}
            >
              <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br opacity-50 ${accentMap[m.accent].split(" ")[0]}`} />
              <Icon className={`h-6 w-6 ${accentMap[m.accent].split(" ")[1]}`} />
              <div className="mt-4 text-lg font-semibold">{m.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              <div className="absolute bottom-4 right-5 text-xs text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const PLAN_FEATURES: Record<string, string[]> = {
  free: ["Basic analytics", "Brand DNA", "Template gallery"],
  starter: ["All channels", "CRM + Inbox", "Reporting", "Basic creative"],
  pro: ["All channels", "Auto-pilot ads", "CRM + Inbox", "Reporting", "AI creative", "Influencers"],
  growth: ["All channels", "Auto-pilot ads", "CRM + Inbox", "Reporting", "AI creative", "Predictive ROI", "Listening", "Influencers"],
  enterprise: ["All channels", "Auto-pilot ads", "CRM + Inbox", "Reporting", "AI creative", "Predictive ROI", "Listening", "Influencers", "White-label", "API access", "Dedicated CSM"],
};
const ALL_FEATURES = ["Basic analytics", "Brand DNA", "Template gallery", "All channels", "CRM + Inbox", "Reporting", "Basic creative", "Auto-pilot ads", "AI creative", "Influencers", "Predictive ROI", "Listening", "White-label", "API access", "Dedicated CSM"];

function ReplacementCalculator() {
  const { user } = useAuth();
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(REPLACED_TOOLS.map((t) => [t.name, true]))
  );
  const { cycle, setCycle } = useBillingToggle();
  const [planId, setPlanId] = useState<string>("starter");
  const currentPlan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const total = REPLACED_TOOLS.reduce((s, t) => s + (enabled[t.name] ? t.cost : 0), 0);
  const ourPrice = currentPlan.isFree ? 0 : (cycle === "annual" ? currentPlan.annualPerMo : currentPlan.monthly);
  const savings = Math.max(total - ourPrice, 0);
  const pct = total > 0 ? Math.max(Math.round((savings / total) * 100), 0) : 0;
  const includedFeatures = new Set(PLAN_FEATURES[planId] ?? []);
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <section id="calc" className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-[11px] uppercase tracking-widest text-emerald-300/80">UVP</div>
        <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">One AI Platform. <span className="text-gradient">10–15 Tools Replaced.</span></h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Toggle the tools your team currently pays for and watch your bill collapse.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-rose-300"><X className="h-4 w-4" /> Messy Stack</div>
            <div className="text-sm text-muted-foreground">{fmt(total)}/mo</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {REPLACED_TOOLS.map((t) => {
              const on = enabled[t.name];
              return (
                <button
                  key={t.name}
                  onClick={() => setEnabled((e) => ({ ...e, [t.name]: !e[t.name] }))}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${on ? "bg-rose-500/10 border-rose-500/30 text-foreground" : "bg-white/[0.02] border-white/10 text-muted-foreground line-through"}`}
                >
                  <span>{t.name}</span>
                  <span className="text-xs">${t.cost}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-indigo-500/15 to-purple-500/10 border border-indigo-400/30 glow-primary">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-indigo-300 text-sm"><Shield className="h-4 w-4" /> BrandSync Plan</div>
              <select
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                className="w-full bg-[#0a0d16]/80 border border-indigo-400/30 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-indigo-400"
              >
                {PLANS.map((p) => {
                  const price = p.isFree ? 0 : (cycle === "annual" ? p.annualPerMo : p.monthly);
                  return (
                    <option key={p.id} value={p.id}>
                      BrandSync {p.name} — ${price.toLocaleString()}/mo
                    </option>
                  );
                })}
              </select>
              <div className="scale-90 origin-left">
                <BillingToggle cycle={cycle} onChange={setCycle} showSavingsBadge={false} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground whitespace-nowrap sm:self-start">{fmt(ourPrice)}/mo</div>
          </div>
          <div className="rounded-xl bg-[#0a0d16]/60 p-6">
            <div className="text-[11px] uppercase tracking-widest text-emerald-300">You Save</div>
            <div className="mt-1 text-5xl font-semibold text-emerald-300">{fmt(savings)}</div>
            <div className="text-sm text-muted-foreground">per month — that's <span className="text-emerald-300">{pct}%</span> off your current MarTech bill.</div>
            {!user && (
              <Link to="/dashboard/intelligence" className="mt-3 inline-flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 transition">
                Start your free trial <ArrowRight className="h-3 w-3" />
              </Link>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {ALL_FEATURES.map((f) => {
                const has = includedFeatures.has(f);
                return has ? (
                  <div key={f} className="flex items-center gap-1.5 text-foreground/80"><Check className="h-3 w-3 text-emerald-400 shrink-0" /> {f}</div>
                ) : (
                  <div key={f} className="flex items-center gap-1.5 text-muted-foreground/50">
                    <Lock className="h-3 w-3 shrink-0" />
                    <span className="truncate">{f}</span>
                    <span className="ml-auto text-[9px] uppercase tracking-wider text-indigo-300/70">Upgrade</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingDown className="h-4 w-4 text-emerald-400" /> Avg. customer reduces MarTech spend by <span className="text-emerald-300 font-medium">62%</span> in 90 days.
          </div>
        </div>
      </div>
    </section>
  );
}



function Footer() {
  const socialIcons = [
    {
      name: "LinkedIn",
      href: "#",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
      ),
    },
    {
      name: "Twitter/X",
      href: "#",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      ),
    },
  ];

  const navColumns = [
    {
      title: "Platform",
      links: ["Brand DNA", "Brand Intelligence", "Creative Engine", "Campaign Automation", "Influencer OS", "Simulation Engine"],
    },
    {
      title: "Solutions",
      links: ["For SMEs", "For Agencies", "For Enterprise", "For E-commerce", "Multi-brand Management"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Blog", "Case Studies", "API Reference", "Changelog", "Status Page"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press Kit", "Privacy Policy", "Terms of Service", "Contact Us"],
    },
  ];

  return (
    <footer className="relative">
      {/* Smooth transition gradient wash at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 -translate-y-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(7,11,29,0.85))",
        }}
      />

      {/* Gradient accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--bs-violet)]/40 to-transparent" />

      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(124,58,237,0.12), transparent)",
        }}
      />

      <div className="relative bg-[#070b1d]">
        <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Main footer grid: Brand + 4 nav columns + Contact */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--bs-violet)] to-[var(--bs-cyan)]">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                BrandSync AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI-powered operating system for modern brands.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialIcons.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="text-muted-foreground transition-colors duration-200 hover:text-[var(--bs-violet)]"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--bs-violet)]">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-14 rounded-xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bs-violet)]/10">
              <Mail className="h-5 w-5 text-[var(--bs-violet)]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--bs-violet)]">
                Support & Inquiries
              </p>
              <a
                href="mailto:bhuiyainrafi@gmail.com"
                className="mt-1 text-sm text-foreground transition-colors hover:text-[var(--bs-violet)]"
              >
                bhuiyainrafi@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 BrandSync AI. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliant"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// silence unused
void Button;
