"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateAgentDialog from "./create-agent-dialog";

export default function AgentsListHeader() {
    const [open, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <CreateAgentDialog open={open} onOpenChange={setIsOpen}/>
            <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
                <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xl">My Agents</h5>
                    <Button onClick={() => setIsOpen(current => !current)}>
                        <PlusIcon/>
                        Create
                    </Button>
                </div>
            </div>
        </>
    );
};