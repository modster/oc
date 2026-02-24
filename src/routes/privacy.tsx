/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import type { AppVariables } from "../middleware/session.ts";
import { PrivacyPage } from "../views/privacy.tsx";

export function createPrivacyRouter(): Hono<{ Variables: AppVariables }> {
  const router = new Hono<{ Variables: AppVariables }>();

  router.get("/privacy", (c) => {
    const user = c.get("user") ?? null;
    return c.html(
      <PrivacyPage user={user} />,
    );
  });

  return router;
}
