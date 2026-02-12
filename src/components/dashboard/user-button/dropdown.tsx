"use client";

import AvatarPlaceholder from "@/components/avatar-placeholder";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type User } from "@/types";
import { CreditCardIcon, LogOutIcon } from "lucide-react";

interface UserButtonDropdownProps {
    user: User,
    logout: () => void;
};

export default function UserButtonDropdown({ user, logout }: UserButtonDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden rounded-lg border border-border/10 p-3 w-full gap-x-4">
                { user?.image 
                ? 
                (
                    <Avatar>
                        <AvatarImage src={user.image}/>
                    </Avatar>
                ) 
                : <AvatarPlaceholder seed={user.name || ""} classname="size-9"/> 
                }
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full">{user.name}</p>
                    <p className="text-xs truncate w-full">{user.email}</p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60">
                <div className="flex flex-col gap-1 items-center justify-center">
                    <h1 className="font-bold text-lg">Agent</h1>
                    <p className="text-lg font-semibold truncate w-full">{user.name}</p>
                    <p className="text-md font-semibold text-muted-foreground truncate w-full">{user.email}</p>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="font-bold flex flex-row justify-between cursor-pointer">
                    Billing
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="font-bold flex flex-row justify-between cursor-pointer">
                    Logout
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};