import AgentView, { AgentViewLoading } from "@/components/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface AgentIDProps {
    params: Promise<{ agentId: string }>;
};

export default async function AgentPage({ params }: AgentIDProps) {
    const { agentId } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({
        id: agentId
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentViewLoading/>}>
                <AgentView agentId={agentId}/>
            </Suspense>
        </HydrationBoundary>
    )
}