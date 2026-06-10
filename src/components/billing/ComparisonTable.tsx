import { Check, X, Zap, Folder, Users, MessageCircle, Sparkles, Megaphone, BarChart3, Atom, Tag, Headphones } from "lucide-react";
import type { ComponentType } from "react";

type CellValue = string | boolean;

interface Row {
  icon: ComponentType<{ className?: string }>;
  label: string;
  values: [CellValue, CellValue, CellValue, CellValue, CellValue];
}

const PLAN_NAMES = ["Free", "Starter", "Pro", "Growth", "Enterprise"];
const GROWTH_IDX = 3;

const ROWS: Row[] = [
  { icon: Zap, label: "AI credits / mo", values: ["500", "5K", "25K", "75K", "Unlimited"] },
  { icon: Folder, label: "Workspaces", values: ["1", "1", "3", "10", "Unlimited"] },
  { icon: Users, label: "Users", values: ["1", "2", "5", "15", "Unlimited"] },
  { icon: MessageCircle, label: "WhatsApp", values: [false, false, true, true, true] },
  { icon: Sparkles, label: "Creative Engine", values: [false, "Basic", true, true, true] },
  { icon: Megaphone, label: "Campaign Auto.", values: [false, false, true, true, true] },
  { icon: BarChart3, label: "Analytics", values: ["Basic", "Basic", "Advanced", "Unified+GA4", "Custom"] },
  { icon: Atom, label: "Simulation Engine", values: [false, false, false, true, true] },
  { icon: Tag, label: "White-label / API", values: [false, false, false, false, true] },
  { icon: Headphones, label: "Support", values: ["—", "Email", "Chat", "Priority", "Dedicated CSM"] },
];

function renderValue(v: CellValue) {
  if (v === true) return <Check className="h-4 w-4 mx-auto" style={{ color: "#22c55e" }} />;
  if (v === false) return <X className="h-4 w-4 mx-auto" style={{ color: "#4b5563" }} />;
  return <span className="text-sm" style={{ color: "#e5e7eb" }}>{v}</span>;
}

export function ComparisonTable() {
  return (
    <div
      className="overflow-x-auto"
      style={{
        background: "#111827",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <table className="w-full border-collapse" style={{ minWidth: 720 }}>
        <thead>
          <tr style={{ position: "sticky", top: 0, background: "#111827", zIndex: 1 }}>
            <th
              className="text-left px-5 py-4 text-[11px] font-bold uppercase"
              style={{ letterSpacing: "0.12em", color: "#9ca3af", position: "sticky", left: 0, background: "#111827" }}
            >
              Feature
            </th>
            {PLAN_NAMES.map((name, i) => (
              <th
                key={name}
                className="px-4 py-4 text-center text-[11px] font-bold uppercase"
                style={{
                  letterSpacing: "0.12em",
                  color: i === GROWTH_IDX ? "#7c3aed" : "#9ca3af",
                  background: i === GROWTH_IDX ? "rgba(124,58,237,0.06)" : undefined,
                  borderLeft: i === GROWTH_IDX ? "1px solid rgba(124,58,237,0.5)" : undefined,
                  borderRight: i === GROWTH_IDX ? "1px solid rgba(124,58,237,0.5)" : undefined,
                }}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, rIdx) => {
            const Icon = row.icon;
            const odd = rIdx % 2 === 1;
            return (
              <tr key={row.label} style={{ background: odd ? "rgba(255,255,255,0.02)" : undefined }}>
                <td
                  className="px-5 py-3.5"
                  style={{ position: "sticky", left: 0, background: odd ? "#131a2a" : "#111827" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" style={{ color: "#7c3aed" }} />
                    <span className="text-sm" style={{ color: "#e5e7eb" }}>{row.label}</span>
                  </div>
                </td>
                {row.values.map((v, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-4 py-3.5 text-center"
                    style={{
                      background: cIdx === GROWTH_IDX ? "rgba(124,58,237,0.06)" : undefined,
                      borderLeft: cIdx === GROWTH_IDX ? "1px solid rgba(124,58,237,0.5)" : undefined,
                      borderRight: cIdx === GROWTH_IDX ? "1px solid rgba(124,58,237,0.5)" : undefined,
                    }}
                  >
                    {renderValue(v)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
