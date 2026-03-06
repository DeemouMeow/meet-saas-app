import Link from "next/link";
import { 
    BreadcrumbItem, 
    BreadcrumbLink 
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface HeaderItemProps {
    label: string;
    href: string;
    className?: string;
};

export default function HeaderItem({ href, label, className }: HeaderItemProps) {
    return (
        <BreadcrumbItem>
            <BreadcrumbLink asChild className={cn("font-medium text-xl", className)}>
                <Link href={href}>
                    {label}
                </Link>
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};