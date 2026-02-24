import type { Context, MiddlewareHandler, Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

/** Hono Variables type — use as `Hono<{ Variables: AppVariables }>` */
export type AppVariables = {
  user: UserSession | null;
};

const SESSION_COOKIE = "oc_session";

/**
 * Encode a session payload as a signed base64 string.
 * Format: base64(payload).<signature>
 * Signature is a SHA-256 HMAC of the base64 payload using the session secret.
 */
async function signPayload(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${payload}.${sigB64}`;
}

async function verifyAndDecode(
  token: string,
  secret: string,
): Promise<string | null> {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const payload = token.slice(0, lastDot);
  const expected = await signPayload(payload, secret);
  // Constant-time comparison to prevent timing attacks
  if (token.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < token.length; i++) {
    diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0 ? payload : null;
}

export async function setSession(
  c: Context<{ Variables: AppVariables }>,
  user: UserSession,
  secret: string,
): Promise<void> {
  const payload = btoa(JSON.stringify(user));
  const token = await signPayload(payload, secret);
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secure: c.req.url.startsWith("https"),
  });
}

export async function getSession(
  c: Context<{ Variables: AppVariables }>,
  secret: string,
): Promise<UserSession | null> {
  const token = getCookie(c, SESSION_COOKIE);
  if (!token) return null;
  try {
    const payload = await verifyAndDecode(token, secret);
    if (!payload) return null;
    return JSON.parse(atob(payload)) as UserSession;
  } catch {
    return null;
  }
}

export function clearSession(c: Context<{ Variables: AppVariables }>): void {
  deleteCookie(c, SESSION_COOKIE, { path: "/" });
}

/**
 * Middleware that attaches the current session user (if any) to c.var.user.
 */
export function sessionMiddleware(
  secret: string,
): MiddlewareHandler<{ Variables: AppVariables }> {
  return async (c: Context<{ Variables: AppVariables }>, next: Next) => {
    const user = await getSession(c, secret);
    c.set("user", user);
    await next();
  };
}
