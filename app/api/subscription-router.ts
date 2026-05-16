import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { subscriptions } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const subscriptionRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        planType: z.enum(["basic", "premium", "vip"]),
        message: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(subscriptions).values({
        userId: input.userId ?? null,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        planType: input.planType,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(subscriptions).orderBy(desc(subscriptions.createdAt));
  }),

  mySubscriptions: publicQuery.query(async ({ ctx }) => {
    const userId = ctx.user?.id;
    if (!userId) return [];
    const db = getDb();
    return db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "active", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(subscriptions)
        .set({ status: input.status })
        .where(eq(subscriptions.id, input.id));
      return { success: true };
    }),
});
