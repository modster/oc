import { Hono } from "hono";
import { type AppVariables, sessionMiddleware } from "./src/middleware/session.ts";
import { createAuthRouter } from "./src/routes/auth.ts";
import { createIndexRouter } from "./src/routes/index.tsx";
import { createTosRouter } from "./src/routes/tos.tsx";
import { createPrivacyRouter } from "./src/routes/privacy.tsx";

// Load configuration from environment variables
const clientId = Deno.env.get("GOOGLE_CLIENT_ID") ?? "";
const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") ?? "";
const appUrl = Deno.env.get("APP_URL") ?? "http://localhost:8000";
const sessionSecret = Deno.env.get("SESSION_SECRET") ?? "dev-secret-change-in-production";
const port = parseInt(Deno.env.get("PORT") ?? "8000", 10);

if (!clientId || !clientSecret) {
  console.warn(
    "⚠️  GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are not set.\n" +
      "   OAuth login will not work. Copy .env.example to .env and fill in your credentials.",
  );
}

const app = new Hono<{ Variables: AppVariables }>();

// Attach session data to every request
app.use("*", sessionMiddleware(sessionSecret));

// Mount route handlers
app.route("/auth", createAuthRouter(clientId, clientSecret, appUrl, sessionSecret));
app.route("/", createIndexRouter());
app.route("/", createTosRouter());
app.route("/", createPrivacyRouter());

// 404 handler
app.notFound((c) => {
  return c.html(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>404 - Not Found</title>
    <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f5f5f5;}
    .box{text-align:center;}.box h1{font-size:3rem;color:#1a73e8;}.box p{color:#666;}
    .box a{color:#1a73e8;text-decoration:none;}</style></head>
    <body><div class="box"><h1>404</h1><p>Page not found.</p><a href="/">← Back to home</a></div></body></html>`,
    404,
  );
});

console.log(`🚀 Server running at ${appUrl} (port ${port})`);

Deno.serve({ port }, app.fetch);
