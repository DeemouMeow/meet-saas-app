"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAgentMutations from "@/hooks/use-agents-mutation";
import { APP_ROUTES } from "@/lib/routes";
import AgentDialog from "@/components/dashboard/agents/agent-dialog";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, 
    PencilIcon, 
    TrashIcon 
} from "lucide-react";

interface HeaderDropDownProps {
    agentId: string;
    agentName: string;
};

export default function HeaderDropdown({ agentName, agentId }: HeaderDropDownProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { deleteAgent } = useAgentMutations();
    const router = useRouter();

    const editClickHandler = () => {
        setDialogOpen(current => !current);
    };

    const deleteClickHandler = async () => {
        await deleteAgent.mutateAsync(
            {
                id: agentId
            },
            {
                onSuccess: () => {
                    toast.success(`Agent '${agentName}' deleted!`);

                    router.push(APP_ROUTES.agents);
                },
                onError: () => {
                    toast.error(`Unable to delete '${agentName}' agent`);
                }
            }
        );
    };

    return (
        <>
            <AgentDialog open={dialogOpen} onOpenChange={setDialogOpen} formInitialValues={
                    {
                        name: agentName,
                        id: agentId,
                        instructions: ""
                    }
                }
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreVerticalIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-center cursor-pointer" onClick={editClickHandler}>
                        <PencilIcon className="size-4 text-black"/>Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-center cursor-pointer" onClick={deleteClickHandler}>
                        <TrashIcon className="size-4 text-destructive"/>Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};