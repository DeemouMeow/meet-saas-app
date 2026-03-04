import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarPlaceholderProps {
    seed: string;
    className?: string;
};

export default function AvatarPlaceholder({ seed, className } : AvatarPlaceholderProps) {
    const avatar = createAvatar(botttsNeutral, {
        seed
    });

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar"/>
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};


