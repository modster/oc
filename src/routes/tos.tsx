/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import type { AppVariables } from "../middleware/session.ts";
import { TosPage } from "../views/tos.tsx";

export function createTosRouter(): Hono<{ Variables: AppVariables }> {
  const router = new Hono<{ Variables: AppVariables }>();

  router.get("/tos", (c) => {
    const user = c.get("user") ?? null;
    return c.html(
      <TosPage user={user} />,
    );
  });

  return router;
}
