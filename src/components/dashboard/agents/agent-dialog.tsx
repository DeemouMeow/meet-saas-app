"use client";

import ResponsiveDialog from "@/components/common/responsive-dialog";
import AgentsForm from "@/components/forms/agents";
import { AgentsUpdateSchemaType } from "@/modules/agents/schemas";

interface CreateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formInitialValues?: AgentsUpdateSchemaType;
};

export default function AgentDialog({ open, onOpenChange, formInitialValues }: CreateAgentDialogProps) {
    const agentId = formInitialValues?.id;

    return (
        <ResponsiveDialog
            title={agentId ? "Edit Agent" : "New Agent"}
            description={agentId ? "Update agent info" : "Create a new agent"}
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentsForm onConfirm={() => onOpenChange(false)}
                        onCancel={() => onOpenChange(false)}
                        initialValues={formInitialValues}
            />
        </ResponsiveDialog>

    );
};