import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Zap, Plus, Building2, Stethoscope, GraduationCap, Briefcase, Store } from "lucide-react";
import { PageHeader, GlassCard, Pill } from "@/components/app/ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DashboardPlansSection } from "@/components/billing/PlansSection";
import { ComparisonTable } from "@/components/billing/ComparisonTable";

export const Route = createFileRoute("/dashboard/billing")({
  component: Billing,
  head: () => ({ meta: [{ title: "Billing & Plans — BrandSync AI" }] }),
});

const PRESETS = [
  { id: "re", icon: Building2, name: "Real Estate", desc: "High-lead workflows · CRM pipeline priority", focus: ["Lead Scoring", "WhatsApp", "Geo-Targeting"] },
  { id: "clinic", icon: Stethoscope, name: "Clinics & Hospitals", desc: "Retention tools + automated follow-ups", focus: ["Recall flows", "Reviews", "Loyalty"] },
  { id: "edu", icon: GraduationCap, name: "EdTech / D2C", desc: "Performance marketing · ROAS-first", focus: ["Creative volume", "TikTok", "Lookalikes"] },
  { id: "agency", icon: Briefcase, name: "Agencies / Franchises", desc: "White-label · multi-brand workspaces", focus: ["White-label", "Multi-brand", "API"] },
  { id: "retail", icon: Store, name: "Retail / Restaurants", desc: "Omnichannel WhatsApp + loyalty", focus: ["WhatsApp", "Repeat customer", "Localized creative"] },
];

const ADDONS = [
  { name: "+ 50K AI Credits", price: 49 },
  { name: "+ 5 Automation Seats", price: 99 },
  { name: "+ API Access Key", price: 149 },
  { name: "+ Dedicated IP", price: 199 },
];

const INVOICES = ["Apr 24", "Mar 24", "Feb 24", "Jan 24"];

function Billing() {
  const [preset, setPreset] = useState("edu");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Monetization" title="Billing & Plans" subtitle="Manage subscription, usage, add-ons, and industry presets." />

      {/* Current Plan Banner */}
      <div
        className="mb-6 flex flex-wrap items-center gap-6"
        style={{
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "20px 28px",
        }}
      >
        <div>
          <div className="text-[11px] font-bold uppercase" style={{ letterSpacing: "0.12em", color: "#7c3aed" }}>
            Current Plan
          </div>
          <div className="mt-1 text-xl font-semibold text-white">Growth · $599/mo</div>
          <div className="text-xs" style={{ color: "#9ca3af" }}>Renews May 24, 2026</div>
        </div>
        <div className="flex-1 min-w-[220px]">
          <div className="flex justify-between text-[13px]" style={{ color: "#9ca3af" }}>
            <span>AI Credits</span>
            <span>48,200 / 75,000</span>
          </div>
          <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "#1f2937" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: "64.3%",
                background: "linear-gradient(135deg, #7c3aed, #6366f1, #3b82f6)",
              }}
            />
          </div>
        </div>
        <PowerUpModal />
      </div>

      {/* Plan Cards or Skeleton */}
      <div className="mb-10">
        {loading ? (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  height: 540,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background:
                    "linear-gradient(90deg, #111827 25%, #1a2035 50%, #111827 75%)",
                  backgroundSize: "200% 100%",
                  animation: "billing-shimmer 1.5s infinite",
                }}
              />
            ))}
            <style>{`@keyframes billing-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
          </div>
        ) : (
          <DashboardPlansSection
            currentPlanId="free"
            onSwitch={(p) => {
              toast.success("Redirecting to checkout…", { description: `Switching to ${p.name}` });
            }}
          />
        )}
      </div>

      {/* Comparison Table */}
      <div className="mb-10">
        <h2 className="mb-4 text-white" style={{ fontSize: 18, fontWeight: 600 }}>
          Compare all features
        </h2>
        <ComparisonTable />
      </div>

      {/* Industry Presets (unchanged) */}
      <GlassCard className="mb-6">
        <div className="text-sm font-medium mb-3">Industry Presets</div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {PRESETS.map((p) => {
            const Icon = p.icon;
            const active = preset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => { setPreset(p.id); toast.success(`Dashboard reconfigured for ${p.name}`); }}
                className={`text-left rounded-lg border p-3 transition ${active ? "border-indigo-400/50 bg-indigo-500/10" : "border-white/10 bg-white/[0.02] hover:bg-white/5"}`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-indigo-300" : "text-muted-foreground"}`} />
                <div className="text-sm font-medium mt-2">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.desc}</div>
                <div className="mt-2 flex flex-wrap gap-1">{p.focus.map((f) => <Pill key={f} tone={active ? "indigo" : "neutral"}>{f}</Pill>)}</div>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Invoice History (unchanged) */}
      <GlassCard>
        <div className="text-sm font-medium mb-3">Invoice History</div>
        {INVOICES.length === 0 ? (
          <div className="text-center text-sm py-8" style={{ color: "#4b5563" }}>
            No invoices yet. Your billing history will appear here.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>{["Date", "Plan", "Amount", "Status", ""].map((h) => <th key={h} className="text-left py-2">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INVOICES.map((d) => (
                <tr key={d}>
                  <td className="py-2.5">{d}, 2026</td>
                  <td>Growth</td>
                  <td>$599.00</td>
                  <td><Pill tone="emerald">Paid</Pill></td>
                  <td className="text-right"><Button variant="ghost" size="sm">PDF</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </div>
  );
}

function PowerUpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="ml-auto text-white font-semibold"
          style={{
            height: 40,
            borderRadius: 10,
            background: "linear-gradient(135deg, #7c3aed, #6366f1, #3b82f6)",
          }}
        >
          <Zap className="h-4 w-4 mr-2" />Usage Power-up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0d1120] border-white/10 max-w-md">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><Zap className="h-4 w-4 text-indigo-400" /> Usage Power-up</DialogTitle></DialogHeader>
        <div className="space-y-2 mt-2">
          {ADDONS.map((a) => (
            <div key={a.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <div className="text-sm">{a.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm">${a.price}</span>
                <Button size="sm" onClick={() => toast.success(`${a.name} added · billed pro-rata`)} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
