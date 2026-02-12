"use client";

import { memo, useState } from "react";
import { CommandIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardCommand from "@/components/dashboard/command";

function CommandButton() {
    const [isCommandsOpen, setIsCommandsOpen] = useState<boolean>(false);

    return (
        <>
            <DashboardCommand open={isCommandsOpen} setOpen={setIsCommandsOpen}/>
            <Button
                className="w-50 h-8 cursor-pointer border-black/20 hover:border-black/40 justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                size="sm"
                variant="outline"
                onClick={() => setIsCommandsOpen(current => !current)}
            >
                <CommandIcon/> Command
            </Button>
        </>
    );
};

export default memo(CommandButton);