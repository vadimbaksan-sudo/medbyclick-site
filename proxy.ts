import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Proxy (Next.js 16's renamed `middleware.ts` — see AGENTS.md and
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
 * "Migration to Proxy". Pattern-matching pre-16 "middleware.ts" tutorials
 * would silently write a file Next 16 never invokes.)
 *
 * Does two things, per @supabase/ssr's documented Next.js pattern and the
 * Next 16 auth guide's "Optimistic checks with Proxy" section:
 *   1. Refreshes the Supabase session cookie on every navigation (Supabase
 *      access tokens are short-lived; this keeps them valid without every
 *      Server Component needing to handle expiry).
 *   2. Performs an OPTIMISTIC (cookie-only, no DB query) redirect for
 *      protected routes. This is NOT the security boundary — the DAL
 *      (lib/auth/dal.ts) re-verifies on every Server Action/Route
 *      Handler/Server Component, per the auth guide's explicit warning that
 *      Proxy must not be the only line of defense.
 */

const PROTECTED_PREFIXES = ["/dashboard", "/doctor-dashboard", "/book"];
const AUTH_PAGES = ["/login", "/register"];

export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  // Supabase not configured (this sandbox has no live project) — skip the
  // refresh/redirect logic entirely rather than throwing on every request.
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser() (not getSession()) — contacts the Auth server, safe to use
  // for an authorization decision. See lib/auth/dal.ts's identical note.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && user) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
