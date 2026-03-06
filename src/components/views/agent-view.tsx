"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingState from "@/components/common/loading-state";
import ErrorState from "@/components/common/error-state";
import AgentIdHeader from "@/components/dashboard/agents/agentId/header";
import AvatarPlaceholder from "@/components/common/avatar-placeholder";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface AgentViewProps {
    agentId: string;
};

export const AgentViewLoading = () => (
    <LoadingState title="Agent information loading..." description="It may take a while"/>
);

export const AgentViewError = () => (
    <ErrorState title="Agent information is unavailable" description="Check provided agent ID"/>
);

export default function AgentView({ agentId }: AgentViewProps) {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({
        id: agentId
    }));

    const onAgentRemove = () => {

    };

    const onAgentEdit = () => {

    };

    const { name, instructions, id } = data;

    return (
        <div className="flex flex-col flex-1 gap-y-4 py-4 px-4 md:px-8">
            <AgentIdHeader 
                agentId={id} 
                agentName={name} 
                onEdit={() => {}} 
                onRemove={() => {}}
            />
            <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                <aside className="flex flex-col items-center md:items-start gap-4 md:w-64 shrink-0 border-b md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-6">
                    <div className="size-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary/10">
                        <AvatarPlaceholder seed={name} className="size-20"/>
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <h2 className="text-xl font-bold tracking-tight">{name}</h2>
                        <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                            <span className="size-2 rounded-full bg-green-500 animate-pulse"/>
                            {2} meetings held
                        </p>
                    </div>
                </aside>

                <main className="flex-1 space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Instructions
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-balance">
                        <p className="whitespace-pre-wrap leading-relaxed text-foreground/80">
                            {instructions}
                        </p>
                    </div>
                </main>

            </div>
        </div>
    );
};