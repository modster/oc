import { Hono } from "hono";
import { type AppVariables, clearSession, getSession, setSession } from "../middleware/session.ts";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

export function createAuthRouter(
  clientId: string,
  clientSecret: string,
  appUrl: string,
  sessionSecret: string,
): Hono<{ Variables: AppVariables }> {
  const router = new Hono<{ Variables: AppVariables }>();

  const redirectUri = `${appUrl}/auth/callback`;

  /**
   * GET /auth/login
   * Redirects the user to Google's OAuth 2.0 consent screen.
   */
  router.get("/login", (c) => {
    // Generate a random state parameter to prevent CSRF
    const state = crypto.randomUUID();

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state,
      access_type: "online",
      prompt: "select_account",
    });

    // Store state in a short-lived cookie for CSRF validation
    c.header(
      "Set-Cookie",
      `oauth_state=${state}; HttpOnly; SameSite=Lax; Path=/; Max-Age=300${
        c.req.url.startsWith("https") ? "; Secure" : ""
      }`,
    );

    return c.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
  });

  /**
   * GET /auth/callback
   * Handles the OAuth 2.0 callback from Google.
   */
  router.get("/callback", async (c) => {
    const { code, state, error } = c.req.query();

    if (error) {
      return c.redirect(`/?error=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      return c.redirect("/?error=missing_params");
    }

    // Validate CSRF state
    const cookieHeader = c.req.header("Cookie") ?? "";
    const stateCookie = cookieHeader
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith("oauth_state="))
      ?.split("=")[1];

    if (!stateCookie || stateCookie !== state) {
      return c.redirect("/?error=invalid_state");
    }

    // Clear the state cookie
    c.header(
      "Set-Cookie",
      `oauth_state=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${
        c.req.url.startsWith("https") ? "; Secure" : ""
      }`,
    );

    // Exchange authorization code for tokens
    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return c.redirect("/?error=token_exchange_failed");
    }

    const tokens = await tokenRes.json() as { access_token?: string };
    if (!tokens.access_token) {
      return c.redirect("/?error=no_access_token");
    }

    // Fetch user profile from Google
    const userRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      return c.redirect("/?error=userinfo_failed");
    }

    const profile = await userRes.json() as {
      sub?: string;
      name?: string;
      email?: string;
      picture?: string;
    };

    if (!profile.sub || !profile.email) {
      return c.redirect("/?error=invalid_profile");
    }

    await setSession(
      c,
      {
        id: profile.sub,
        name: profile.name ?? profile.email,
        email: profile.email,
        picture: profile.picture,
      },
      sessionSecret,
    );

    return c.redirect("/");
  });

  /**
   * GET /auth/logout
   * Clears the session and redirects to the homepage.
   */
  router.get("/logout", async (c) => {
    // Verify the user has an active session before clearing
    const user = await getSession(c, sessionSecret);
    if (user) {
      clearSession(c);
    }
    return c.redirect("/");
  });

  return router;
}
