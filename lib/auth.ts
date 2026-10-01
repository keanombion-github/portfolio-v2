import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "portfolio_identity";
export const STATE_COOKIE = "portfolio_oauth";
export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
export type Identity = { login: string; name: string; profile: string };
export function authConfigured() {
  return Boolean(
    process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET &&
    (process.env.AUTH_SECRET?.length || 0) >= 32,
  );
}
export function signAuth(payload: Record<string, unknown>) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32)
    throw new Error("Identity is not configured.");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`;
}
export function verifyAuth(
  token: string | undefined,
  kind: "session" | "state",
): Record<string, unknown> | null {
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret || secret.length < 32 || !token || token.length > 4096)
      return null;
    const parts = token.split(".");
    if (parts.length !== 2 || !parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p)))
      return null;
    const expected = createHmac("sha256", secret).update(parts[0]).digest();
    const actual = Buffer.from(parts[1], "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      return null;
    const data = JSON.parse(Buffer.from(parts[0], "base64url").toString());
    if (
      !data ||
      data.kind !== kind ||
      !Number.isSafeInteger(data.exp) ||
      data.exp <= Math.floor(Date.now() / 1000)
    )
      return null;
    return data;
  } catch {
    return null;
  }
}
export function validState(token: string | undefined, state: string | null) {
  const data = verifyAuth(token, "state");
  if (
    !data ||
    typeof data.state !== "string" ||
    typeof data.verifier !== "string" ||
    !/^[A-Za-z0-9_-]{43}$/.test(data.state) ||
    !/^[A-Za-z0-9_-]{43}$/.test(data.verifier) ||
    !state ||
    !/^[A-Za-z0-9_-]{43}$/.test(state)
  )
    return null;
  return timingSafeEqual(Buffer.from(data.state), Buffer.from(state))
    ? data
    : null;
}
export async function getIdentity(): Promise<Identity | null> {
  if (!authConfigured()) return null;
  const data = verifyAuth(
    (await cookies()).get(SESSION_COOKIE)?.value,
    "session",
  );
  if (
    !data ||
    typeof data.login !== "string" ||
    !/^[A-Za-z0-9-]{1,39}$/.test(data.login) ||
    typeof data.name !== "string" ||
    data.name.length > 100 ||
    data.profile !== `https://github.com/${data.login}`
  )
    return null;
  return {
    login: data.login,
    name: data.name,
    profile: data.profile as string,
  };
}
