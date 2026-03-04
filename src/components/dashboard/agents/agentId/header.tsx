"use client";

import Link from "next/link";
import { APP_ROUTES } from "@/lib/routes";

import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


interface AgentIdHeaderProps {
    agentName: string;
    agentId: string;
    onEdit: () => void;
    onRemove: () => void;
};

interface HeaderBreadcrumbItemProps {
    label: string;
    href: string;
    classname?: string;
};

const HeaderBreadcrumbItem = ({ href, label, classname }: HeaderBreadcrumbItemProps) => {
    return (
        <BreadcrumbItem>
            <BreadcrumbLink asChild className={cn("font-medium text-xl", classname)}>
                <Link href={href}>
                    {label}
                </Link>
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};

const HeaderBreadcrumbDropdown = () => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <MoreVerticalIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-center">
                    <PencilIcon className="size-4 text-black"/>Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-center">
                    <TrashIcon className="size-4 text-black"/>Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function AgentIdHeader({ agentId, agentName, onEdit, onRemove }: AgentIdHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <HeaderBreadcrumbItem 
                        label="Agents" 
                        href={APP_ROUTES.agents}
                    />
                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                        <ChevronRightIcon/>
                    </BreadcrumbSeparator>
                    <HeaderBreadcrumbItem 
                        label={agentName} 
                        href={`${APP_ROUTES.agents}/${agentId}`} 
                        classname="text-foreground"
                    />
                </BreadcrumbList>
            </Breadcrumb>
            <HeaderBreadcrumbDropdown/>
        </div>
    );
};