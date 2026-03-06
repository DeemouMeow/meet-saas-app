"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAgentMutations = (agentId?: string) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const invalidate = async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (agentId)
            await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: agentId }));

        console.log("Successfully invalidate");
    };

    const create = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => await invalidate()
        })
    );

    const update = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: async () => await invalidate()
        })
    );

    const deleteAgent = useMutation(
        trpc.agents.delete.mutationOptions({
            onSuccess: async () => await invalidate()
        })
    );

    return {
        create,
        update,
        deleteAgent,
        isPending: create.isPending || update.isPending
    };
};

export default useAgentMutations;