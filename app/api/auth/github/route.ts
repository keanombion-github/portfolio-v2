import { site } from "@/lib/site";
import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  authConfigured,
  cookieOptions,
  signAuth,
  STATE_COOKIE,
} from "@/lib/auth";
import { rateLimit, sameOrigin } from "@/lib/request-guard";

export async function GET(request: Request) {
  if (!sameOrigin(request))
    return new Response("Request not allowed.", { status: 403 });
  const canonical = new URL(site.url);
  const incomingHost = request.headers.get("host") || new URL(request.url).host;
  if (incomingHost !== canonical.host) {
    return NextResponse.redirect(new URL("/api/auth/github", canonical));
  }
  if (!authConfigured())
    return NextResponse.redirect(
      new URL("/recommendations?auth=unavailable", site.url),
    );
  if (!rateLimit(request, "github-auth", 10))
    return new Response("Please try again in a minute.", { status: 429 });
  const state = randomBytes(32).toString("base64url"),
    verifier = randomBytes(32).toString("base64url");
  const url = new URL("https://github.com/login/oauth/authorize");
  url.search = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: new URL("/api/auth/github/callback", site.url).href,
    state,
    scope: "",
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
    code_challenge_method: "S256",
  }).toString();
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(
    STATE_COOKIE,
    signAuth({
      kind: "state",
      state,
      verifier,
      exp: Math.floor(Date.now() / 1000) + 600,
    }),
    { ...cookieOptions, maxAge: 600 },
  );
  return response;
}

