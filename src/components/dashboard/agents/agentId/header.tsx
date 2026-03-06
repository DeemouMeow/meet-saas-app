"use client";

import { APP_ROUTES } from "@/lib/routes";

import { 
    ChevronRightIcon, 
} from "lucide-react";
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import HeaderDropdown from "@/components/dashboard/agents/agentId/header-dropdown";
import HeaderItem from "@/components/dashboard/agents/agentId/header-item";

interface AgentIdHeaderProps {
    agentName: string;
    agentId: string;
};

export default function AgentIdHeader({ agentId, agentName }: AgentIdHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <HeaderItem 
                        label="Agents" 
                        href={APP_ROUTES.agents}
                    />
                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                        <ChevronRightIcon/>
                    </BreadcrumbSeparator>
                    <HeaderItem 
                        label={agentName} 
                        href={`${APP_ROUTES.agents}/${agentId}`} 
                        className="text-foreground"
                    />
                </BreadcrumbList>
            </Breadcrumb>
            <HeaderDropdown 
                agentId={agentId}
                agentName={agentName}
            />
        </div>
    );
};