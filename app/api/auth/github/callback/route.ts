import { site } from "@/lib/site";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  authConfigured,
  cookieOptions,
  SESSION_COOKIE,
  signAuth,
  STATE_COOKIE,
  validState,
} from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(
    new URL("/recommendations?auth=failed#write-recommendation", site.url),
  );
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(STATE_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  const state = validState(
    (await cookies()).get(STATE_COOKIE)?.value,
    url.searchParams.get("state"),
  );
  const code = url.searchParams.get("code");
  if (
    !authConfigured() ||
    !state ||
    !code ||
    code.length > 512 ||
    url.searchParams.has("error")
  )
    return response;
  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          code_verifier: state.verifier,
          redirect_uri: new URL("/api/auth/github/callback", site.url).href,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );
    const token = await tokenResponse.json();
    if (
      !tokenResponse.ok ||
      typeof token.access_token !== "string" ||
      token.error
    )
      return response;
    const profileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token.access_token}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const profile = await profileResponse.json();
    if (
      !profileResponse.ok ||
      typeof profile.login !== "string" ||
      !/^[A-Za-z0-9-]{1,39}$/.test(profile.login) ||
      !Number.isSafeInteger(profile.id)
    )
      return response;
    response.cookies.set(
      SESSION_COOKIE,
      signAuth({
        kind: "session",
        login: profile.login,
        name:
          typeof profile.name === "string"
            ? profile.name.slice(0, 100)
            : profile.login,
        profile: `https://github.com/${profile.login}`,
        exp: Math.floor(Date.now() / 1000) + 86400,
      }),
      { ...cookieOptions, maxAge: 86400 },
    );
    response.headers.set(
      "Location",
      new URL("/recommendations#write-recommendation", site.url).href,
    );
    return response;
  } catch {
    return response;
  }
}
