"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface DashboardCommandProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardCommand({ setOpen, open }: DashboardCommandProps) {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find your meetings or agents"
            />
            <CommandList>
                <CommandItem>
                    Test Item
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
};