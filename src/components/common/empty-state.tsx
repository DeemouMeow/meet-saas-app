"use client";

interface EmptyStateProps {
    title: string;
    description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-4 py-8">
            <div className="fkex flex-col items-center justify-center max-w-md mx-auto text-center">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}