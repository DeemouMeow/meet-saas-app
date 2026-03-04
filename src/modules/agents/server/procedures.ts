import { and, count, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsCreateSchema, agentsGetManySchema, agentsGetOneSchema } from "@/modules/agents/schemas";

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure
        .input(agentsGetManySchema)
        .query(async ({ ctx, input }) => {
            const { search, pageSize, page } = input;
            const { id: userId } = ctx.auth.user;

            const filters = and(
                eq(agents.userId, userId),
                search ? ilike(agents.name, `%${search}%`) : undefined
            );

            const [data, [total]] = await Promise.all([
                db
                    .select()
                    .from(agents)
                    .where(filters)
                    .orderBy(desc(agents.createdAt), desc(agents.id))
                    .limit(pageSize)
                    .offset((page - 1) * pageSize),
                db
                    .select({ count: count() })
                    .from(agents)
                    .where(filters)
            ]);

            const totalPages = Math.ceil(total.count / pageSize);

            return {
                items: data,
                total: total.count,
                totalPages
            };
        }),
    getOne: protectedProcedure
        .input(agentsGetOneSchema)
        .query(async ({ input }) => {
            const [candidate] = await db
                .select()
                .from(agents)
                .where(eq(agents.id, input.id));
            
            return candidate;
        }),
    create: protectedProcedure
        .input(agentsCreateSchema)
        .mutation(async ({ input, ctx }) => {
            const { name, instructions } = input;
            const { auth } = ctx;
            const { user } = auth;

            const [insertedAgent] = await db
                .insert(agents)
                .values({
                    name,
                    instructions,
                    userId: user.id
                })
                .returning();
            
            return insertedAgent;
        }),
});