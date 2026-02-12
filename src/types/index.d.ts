import type { LucideIcon } from "lucide-react";

export namespace Dashboard {
    export type SidebarSectionItem = {
        label: string; 
        href: string; 
        icon?: LucideIcon; 
    };

    export type Section = readonly SidebarSectionItem[];
};

export type ServerActionResult<T = void> = {
  success: boolean;
  message?: string;
  data?: T; 
};

export type Session = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
};

export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
};