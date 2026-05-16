import { authRouter } from "./auth-router";
import { subscriptionRouter } from "./subscription-router";
import { contactRouter } from "./contact-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  subscription: subscriptionRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
