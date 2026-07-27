// Server-only Anthropic client. Never import from browser code.
// Uses the Messages API directly to avoid pulling the SDK into the Worker bundle.
// Falls back through a couple of current Claude model ids to survive per-account availability.

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODELS = [
  "claude-sonnet-4-5",
  "claude-sonnet-4-5-20250929",
  "claude-3-5-sonnet-latest",
];

export function isAnthropicEnabled() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export type AnthropicCallOptions = {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
  /** When true, appends an instruction asking Claude to reply with a single JSON object only. */
  jsonOnly?: boolean;
};

export async function callAnthropic(opts: AnthropicCallOptions): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const system = opts.jsonOnly
    ? `${opts.system}\n\nCRITICAL: Respond with a single valid JSON object only. No prose, no markdown code fences, no commentary.`
    : opts.system;

  const models = opts.model ? [opts.model] : DEFAULT_MODELS;
  let lastErr: Error | null = null;

  for (const model of models) {
    const res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 4096,
        temperature: opts.temperature ?? 0.7,
        system,
        messages: [{ role: "user", content: opts.user }],
      }),
    });

    if (res.status === 404 || res.status === 400) {
      // Model not available on this account — try the next candidate.
      const body = await res.text();
      lastErr = new Error(`Anthropic ${res.status}: ${body.slice(0, 300)}`);
      continue;
    }
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Anthropic ${res.status}: ${body.slice(0, 300)}`);
    }

    const json = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = (json.content ?? [])
      .filter((c) => c.type === "text" && typeof c.text === "string")
      .map((c) => c.text as string)
      .join("")
      .trim();
    if (!text) throw new Error("Anthropic returned empty response");
    return text;
  }

  throw lastErr ?? new Error("Anthropic call failed");
}
