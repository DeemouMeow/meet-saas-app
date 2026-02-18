"use client";

import ResponsiveDialog from "@/components/common/responsive-dialog";
import AgentsForm from "@/components/forms/agents";

interface CreateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function CreateAgentDialog({ open, onOpenChange }: CreateAgentDialogProps) {
    return (
        <ResponsiveDialog
            title="New Agent"
            description="Create a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentsForm onSuccess={() => onOpenChange(false)}
                        onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>

    );
};