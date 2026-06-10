import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Plan, BillingCycle } from "@/lib/plans";

interface Props {
  plan: Plan;
  cycle: BillingCycle;
  variant?: "landing" | "dashboard";
  isCurrent?: boolean;
  onAction?: (plan: Plan) => void;
}

export function PlanCard({ plan, cycle, variant = "landing", isCurrent, onAction }: Props) {
  const annual = cycle === "annual";
  const price = plan.isFree ? 0 : annual ? plan.annualPerMo : plan.monthly;
  const cta = annual ? plan.ctaAnnual : plan.ctaMonthly;
  const isPopular = !!plan.popular;
  const priceFontSize = variant === "landing" ? 48 : 36;
  const padding = variant === "landing" ? 28 : 24;

  return (
    <div
      className="relative flex flex-col transition-all duration-200"
      style={{
        background: "#111827",
        borderRadius: 16,
        padding,
        border: isCurrent
          ? "2px solid rgba(16,185,129,0.5)"
          : isPopular
            ? "2px solid rgba(124,58,237,0.5)"
            : "1px solid rgba(255,255,255,0.06)",
        boxShadow: isCurrent
          ? "0 0 40px rgba(16,185,129,0.15)"
          : isPopular
            ? "0 0 40px rgba(124,58,237,0.15)"
            : "none",
      }}
      onMouseEnter={(e) => {
        if (!isPopular && !isCurrent) {
          e.currentTarget.style.background = "#1a2035";
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isPopular && !isCurrent) {
          e.currentTarget.style.background = "#111827";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        }
      }}
    >
      {isCurrent && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: "#10b981", borderRadius: 9999 }}
        >
          Current Plan
        </div>
      )}
      {isPopular && !isCurrent && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: "#7c3aed", borderRadius: 9999 }}
        >
          Most Popular
        </div>
      )}

      <div
        className="text-[11px] font-bold uppercase mb-3"
        style={{
          letterSpacing: "0.12em",
          color: isCurrent ? "#10b981" : isPopular || plan.id === "enterprise" ? "#7c3aed" : "#9ca3af",
        }}
      >
        {plan.name}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${plan.id}-${cycle}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-1">
            <span
              className="text-white"
              style={{ fontWeight: 800, fontSize: priceFontSize, lineHeight: 1 }}
            >
              ${price}
            </span>
            <span className="text-base" style={{ color: "#9ca3af" }}>
              {plan.isFree ? "" : "/mo"}
            </span>
          </div>

          {plan.isFree ? (
            <div className="mt-1 text-xs" style={{ color: "#4b5563" }}>
              No billing cycle
            </div>
          ) : annual ? (
            <div className="mt-2 space-y-0.5">
              <div
                className="text-sm"
                style={{ color: "#4b5563", textDecoration: "line-through" }}
              >
                ${plan.monthly}/mo
              </div>
              <div className="text-[13px] font-semibold" style={{ color: "#22c55e" }}>
                Save {plan.savePct}%
              </div>
              <div className="text-xs" style={{ color: "#9ca3af" }}>
                Billed ${plan.annualBilled.toLocaleString()}/yr
              </div>
            </div>
          ) : (
            <div className="mt-2 h-[42px]" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 text-[13px]" style={{ color: "#9ca3af" }}>
        {plan.subtitle}
      </div>

      <div className="my-4 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      <ul className="space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5 text-sm" style={{ color: "#9ca3af" }}>
            {f.included ? (
              <Check className="h-3.5 w-3.5 mt-1 shrink-0" style={{ color: "#22c55e" }} />
            ) : (
              <X className="h-3.5 w-3.5 mt-1 shrink-0" style={{ color: "#4b5563" }} />
            )}
            <span>{f.label}</span>
          </li>
        ))}
      </ul>

      {(() => {
        const isEnterprise = plan.id === "enterprise";
        const isFree = plan.id === "free";
        const isPurple =
          plan.id === "starter" || plan.id === "pro" || plan.id === "growth";
        return (
          <button
            type="button"
            onClick={() => onAction?.(plan)}
            className="mt-6 w-full font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e1a] hover:opacity-90 active:scale-[0.99]"
            style={{
              borderRadius: 10,
              height: 48,
              fontSize: 15,
              color: "#fff",
              background: isFree
                ? "#059669"
                : isPurple
                  ? "linear-gradient(135deg, #7c3aed, #6366f1, #3b82f6)"
                  : "transparent",
              border: isEnterprise ? "1px solid rgba(255,255,255,0.2)" : "none",
            }}
          >
            {cta}
          </button>
        );
      })()}
    </div>
  );
}
