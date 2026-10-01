import { site } from "@/lib/site";
import { NextResponse } from "next/server";
import { cookieOptions, SESSION_COOKIE, STATE_COOKIE } from "@/lib/auth";
import { sameOrigin } from "@/lib/request-guard";

export async function POST(request: Request) {
  if (!request.headers.get("origin") || !sameOrigin(request))
    return new Response("Request not allowed.", { status: 403 });
  const response = NextResponse.redirect(
    new URL("/recommendations#write-recommendation", site.url),
    303,
  );
  response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  response.cookies.set(STATE_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
