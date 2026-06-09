// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Hardcoded fallbacks ensure the client bundle always has the publishable Supabase
// credentials, even if the build environment is missing the env vars (e.g., after a
// remix without history). These are non-secret values safe to ship in the client.
const FALLBACK_SUPABASE_URL = "https://sxebfsftfsdzaixjzizw.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZWJmc2Z0ZnNkemFpeGp6aXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjQ1MjksImV4cCI6MjA5NjYwMDUyOX0.N0TF9cX0y0UBPYFMfoMVvJsUucAF6wD68vWOSGtbq3o";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? FALLBACK_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(SUPABASE_PUBLISHABLE_KEY),
      "process.env.SUPABASE_URL": JSON.stringify(SUPABASE_URL),
      "process.env.SUPABASE_PUBLISHABLE_KEY": JSON.stringify(SUPABASE_PUBLISHABLE_KEY),
      "process.env.VITE_SUPABASE_URL": JSON.stringify(SUPABASE_URL),
      "process.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(SUPABASE_PUBLISHABLE_KEY),
    },
  },
});
