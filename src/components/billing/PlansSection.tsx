import { PLANS } from "@/lib/plans";
import type { Plan } from "@/lib/plans";
import { useBillingToggle } from "@/lib/plans";
import { BillingToggle } from "./BillingToggle";
import { PlanCard } from "./PlanCard";

const PLAN_ORDER: Plan["id"][] = ["starter", "pro", "growth", "enterprise"];
const orderedPlans = (): Plan[] =>
  PLAN_ORDER
    .map((id) => PLANS.find((p) => p.id === id))
    .filter((p): p is Plan => Boolean(p));

export function LandingPricingSection() {
  const { cycle, setCycle } = useBillingToggle();
  return (
    <section
      id="pricing"
      style={{
        background: "#0a0e1a",
        padding: "96px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2
            className="text-white"
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Choose the Plan That Fits Your Ambition
          </h2>
          <p className="mt-3 text-base" style={{ color: "#9ca3af" }}>
            Transparent pricing. No hidden fees. Cancel anytime.
          </p>
          <div className="mt-6 flex justify-center">
            <BillingToggle cycle={cycle} onChange={setCycle} />
          </div>
        </div>

        <div
          className="mt-12 grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
        {orderedPlans().map((p) => (
            <PlanCard key={p.id} plan={p} cycle={cycle} variant="landing" />
          ))}
        </div>

        <p
          className="mt-10 text-center text-xs"
          style={{ color: "#4b5563" }}
        >
          All plans include 14-day onboarding support. Enterprise pricing is custom — contact us.
        </p>
      </div>
    </section>
  );
}

export function DashboardPlansSection({
  currentPlanId = "growth",
  onSwitch,
}: {
  currentPlanId?: Plan["id"];
  onSwitch?: (plan: Plan) => void;
}) {
  const { cycle, setCycle } = useBillingToggle();
  const visible = orderedPlans();

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <h2 className="text-white" style={{ fontSize: 18, fontWeight: 600 }}>
          Available plans
        </h2>
        <BillingToggle cycle={cycle} onChange={setCycle} />
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            cycle={cycle}
            variant="dashboard"
            isCurrent={p.id === currentPlanId}
            onAction={onSwitch}
          />
        ))}
      </div>
    </div>
  );
}
