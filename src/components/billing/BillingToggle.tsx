import type { BillingCycle } from "@/lib/plans";

export function BillingToggle({
  cycle,
  onChange,
  showSavingsBadge = true,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
  showSavingsBadge?: boolean;
}) {
  const annual = cycle === "annual";
  return (
    <div className="inline-flex items-center gap-3">
      <span
        className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
          annual ? "text-[#9ca3af]" : "text-white"
        }`}
      >
        Mo
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        onClick={() => onChange(annual ? "monthly" : "annual")}
        className="relative inline-flex h-[26px] w-[48px] items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e1a]"
        style={{ background: annual ? "rgba(124,58,237,0.25)" : "#1f2937" }}
      >
        <span
          className="inline-block h-[20px] w-[20px] rounded-full transition-transform duration-200"
          style={{
            transform: annual ? "translateX(25px)" : "translateX(3px)",
            background: annual
              ? "linear-gradient(135deg, #7c3aed, #6366f1, #3b82f6)"
              : "#9ca3af",
            boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        />
      </button>
      <span
        className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
          annual ? "text-white" : "text-[#9ca3af]"
        }`}
      >
        Yr
      </span>
      {showSavingsBadge && (
        <span
          className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(34,197,94,0.12)",
            color: "#22c55e",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          Save up to 30%
        </span>
      )}
    </div>
  );
}
