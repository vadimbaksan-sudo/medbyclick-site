"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client for use in Client Components ("use client").
 *
 * Most auth in this app runs server-side via Server Actions (lib/auth/actions.ts)
 * and the DAL (lib/auth/dal.ts) — that is the security boundary and should stay
 * that way. Use this browser client only when a Client Component genuinely needs
 * to talk to Supabase directly, e.g.:
 *   - subscribing to auth state changes (`onAuthStateChange`) to update UI,
 *   - Supabase Realtime subscriptions,
 *   - client-side reads of tables protected by Row Level Security.
 *
 * It reads the same cookie-based session that @supabase/ssr's server client and
 * proxy.ts maintain, so it stays in sync with server-side auth.
 *
 * Only NEXT_PUBLIC_-prefixed vars are available in the browser; the anon key is
 * safe to expose (rate-limited + governed by Row Level Security). Requires
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY — see .env.example.
 *
 * Example usage in a Client Component:
 *
 *   "use client";
 *   import { useEffect, useState } from "react";
 *   import { createSupabaseBrowserClient } from "@/lib/supabase/client";
 *
 *   export function useSupabaseUser() {
 *     const [email, setEmail] = useState<string | null>(null);
 *     useEffect(() => {
 *       const supabase = createSupabaseBrowserClient();
 *       supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
 *       const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
 *         setEmail(session?.user?.email ?? null);
 *       });
 *       return () => sub.subscription.unsubscribe();
 *     }, []);
 *     return email;
 *   }
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. " +
        "Supply them from a real Supabase project (Project Settings → API) — see .env.example."
    );
  }

  return createBrowserClient(url, anonKey);
}
