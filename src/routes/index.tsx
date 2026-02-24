/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import type { AppVariables } from "../middleware/session.ts";
import { HomePage } from "../views/home.tsx";

export function createIndexRouter(): Hono<{ Variables: AppVariables }> {
  const router = new Hono<{ Variables: AppVariables }>();

  router.get("/", (c) => {
    const user = c.get("user") ?? null;
    return c.html(
      <HomePage user={user} />,
    );
  });

  return router;
}
