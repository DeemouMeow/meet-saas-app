import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AgentsView, { AgentsViewLoading } from "@/components/views/agents-view";

export default async function Agents() {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading/>}>
                <AgentsView/>
            </Suspense>
        </HydrationBoundary>
    );
};