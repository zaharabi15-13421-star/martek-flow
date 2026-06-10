import { useEffect, useState } from "react";

export type BillingCycle = "monthly" | "annual";

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: "free" | "starter" | "pro" | "growth" | "enterprise";
  name: string;
  subtitle: string;
  monthly: number;
  annualPerMo: number;
  annualBilled: number;
  savePct: number;
  features: PlanFeature[];
  ctaMonthly: string;
  ctaAnnual: string;
  popular?: boolean;
  isFree?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    subtitle: "Forever free",
    monthly: 0,
    annualPerMo: 0,
    annualBilled: 0,
    savePct: 0,
    isFree: true,
    ctaMonthly: "Get Started Free",
    ctaAnnual: "Get Started Free",
    features: [
      { label: "500 AI credits / mo", included: true },
      { label: "1 brand workspace", included: true },
      { label: "Brand DNA (basic)", included: true },
      { label: "Template gallery (10)", included: true },
      { label: "Image Lab (5/mo)", included: true },
      { label: "Caption Craft (10/mo)", included: true },
      { label: "Basic analytics", included: true },
      { label: "No WhatsApp", included: false },
      { label: "No automation", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    subtitle: "For solopreneurs · 1–2 users",
    monthly: 49,
    annualPerMo: 41,
    annualBilled: 492,
    savePct: 17,
    popular: true,
    ctaMonthly: "Upgrade Starter",
    ctaAnnual: "Upgrade Starter",
    features: [
      { label: "5K AI credits / mo", included: true },
      { label: "1 brand workspace", included: true },
      { label: "3 social channels", included: true },
      { label: "Brand DNA + Guidelines", included: true },
      { label: "Poster Studio", included: true },
      { label: "Blog Pilot + Captions", included: true },
      { label: "Hashtag Wizard", included: true },
      { label: "Lead & CRM (basic)", included: true },
      { label: "Email support", included: true },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "For growing teams · 5 users",
    monthly: 149,
    annualPerMo: 119,
    annualBilled: 1428,
    savePct: 20,
    ctaMonthly: "Upgrade to Pro",
    ctaAnnual: "Upgrade to Pro",
    features: [
      { label: "25K AI credits / mo", included: true },
      { label: "3 brand workspaces", included: true },
      { label: "All social + WhatsApp", included: true },
      { label: "Creative Engine (full)", included: true },
      { label: "Virtual Try-On", included: true },
      { label: "YouTube Marketing", included: true },
      { label: "Audience Intelligence", included: true },
      { label: "Campaign Automation", included: true },
      { label: "Influencer OS", included: true },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "For mid-market teams · 15 users",
    monthly: 399,
    annualPerMo: 299,
    annualBilled: 3588,
    savePct: 25,
    ctaMonthly: "Upgrade to Growth",
    ctaAnnual: "Upgrade to Growth",
    features: [
      { label: "75K AI credits / mo", included: true },
      { label: "10 brand workspaces", included: true },
      { label: "Multi-language (BD+USA)", included: true },
      { label: "Simulation Engine", included: true },
      { label: "Unified Analytics + GA4", included: true },
      { label: "Reputation & Listening", included: true },
      { label: "Product Holography", included: true },
      { label: "Collaboration tools", included: true },
      { label: "Priority support", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "For agencies & brands · unlimited",
    monthly: 1499,
    annualPerMo: 1049,
    annualBilled: 12588,
    savePct: 30,
    ctaMonthly: "Contact Sales",
    ctaAnnual: "Contact Sales",
    features: [
      { label: "Unlimited AI credits", included: true },
      { label: "Unlimited workspaces", included: true },
      { label: "White-label dashboard", included: true },
      { label: "Multi-brand management", included: true },
      { label: "API access + SSO", included: true },
      { label: "Dedicated CSM", included: true },
      { label: "SLA & DPA", included: true },
      { label: "Custom integrations", included: true },
      { label: "Onboarding support", included: true },
    ],
  },
];

const STORAGE_KEY = "brandsync_billing_cycle";

export function useBillingToggle() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "monthly" || v === "annual") setCycle(v);
    } catch {}
  }, []);
  const update = (c: BillingCycle) => {
    setCycle(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
  };
  return { cycle, setCycle: update };
}
