"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
    page: number;
    maximumPages: number;
    onPageChanged: (page: number) => void;
};

export default function Pagination({ page, maximumPages: maximumPage, onPageChanged }: PaginationProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {maximumPage || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    size="sm"
                    onClick={() => onPageChanged(Math.max(1, page - 1))}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    disabled={page === maximumPage || maximumPage === 0}
                    size="sm"
                    onClick={() => onPageChanged(Math.min(maximumPage, page + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    )
};