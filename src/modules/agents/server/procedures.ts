import { TRPCError } from "@trpc/server";
import { 
    and,
    count,
    desc, 
    eq, 
    ilike 
} from "drizzle-orm";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { 
    createTRPCRouter, 
    protectedProcedure 
} from "@/trpc/init";
import { 
    agentsCreateSchema, 
    agentsGetManySchema, 
    agentsGetOneSchema, 
    agentsDeleteSchema, 
    agentsUpdateSchema
} from "@/modules/agents/schemas";

const getAgent = async (agentId: string, userId: string) => {
    if (!agentId || !userId)
        return null;

    const [candidate] = await db
                .select()
                .from(agents)
                .where(
                    and(
                        eq(agents.id, agentId), 
                        eq(agents.userId, userId)
                    )
                );
    
    return candidate;
};

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
        .query(async ({ input, ctx }) => {
            const candidate = await getAgent(input.id, ctx.auth.user.id);
            
            if (!candidate)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No agent found"
                })

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
    delete: protectedProcedure
        .input(agentsDeleteSchema)
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            const { id: userId } = ctx.auth.user; 

            const [deleted] = await db
                .delete(agents)
                .where(
                    and(
                        eq(agents.id, id),
                        eq(agents.userId, userId)
                    )
                )
                .returning();
            
            return deleted;
        }),
    update: protectedProcedure
        .input(agentsUpdateSchema)
        .mutation(async ({ input, ctx }) => {
            const { id, name, instructions } = input;
            const { id: userId } = ctx.auth.user;
            
            const candidate = await getAgent(id, userId);
            
            if (!candidate)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No agent found"
                });

            await db
                .update(agents)
                .set(
                    {
                        instructions,
                        name
                    }
                )
                .where(
                    and(
                        eq(agents.id, id),
                        eq(agents.userId, userId)
                    )
                );
        })
});