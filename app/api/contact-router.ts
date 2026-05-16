import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactMessages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(1),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactMessages).values({
        userId: input.userId ?? null,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        subject: input.subject ?? null,
        message: input.message,
      });
      return { id: Number(result[0].insertId), success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }),

  myMessages: publicQuery.query(async ({ ctx }) => {
    const userId = ctx.user?.id;
    if (!userId) return [];
    const db = getDb();
    return db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.userId, userId))
      .orderBy(desc(contactMessages.createdAt));
  }),

  markAsRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(contactMessages)
        .set({ isRead: "read" })
        .where(eq(contactMessages.id, input.id));
      return { success: true };
    }),
});
