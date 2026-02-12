import { Dispatch, SetStateAction } from "react";
import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface DashboardCommandProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardCommand({ setOpen, open }: DashboardCommandProps) {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    Test Item
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
};