import { eq } from "drizzle-orm";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsCreateSchema, agentsGetOneSchema } from "@/modules/agents/schemas";

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents);

        return data;
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