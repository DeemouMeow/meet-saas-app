"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "@/hooks/use-agents-filters";
import useDebounce from "@/hooks/use-debounce";
import { GET_MANY_CONSTANTS } from "@/modules/agents/constants";
import { SearchIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchAgentsFilter() {
    const [filters, setFilters] = useAgentsFilters();
    const [inputValue, setInputValue] = useState<string>(filters.search);

    const isAnyFilterApplied = !!filters.search;
    const debouncedSearch = useDebounce(inputValue);

    useEffect(() => {
        if (debouncedSearch !== filters.search)
            setFilters({
                search: debouncedSearch || null,
                page: GET_MANY_CONSTANTS.DEFAUTL_PAGE
            });
    }, [debouncedSearch]);

    const onFiltersClear = () => {
        setFilters({
            search: null,
            page: null
        });

        setInputValue("");
    };

    return (
        <div className="relative flex items-center gap-x-2">
            <SearchIcon className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground"/>
            <Input
                placeholder="Filter by name"
                onChange={(event) => {
                    setInputValue(event.target.value)
                }}
                value={inputValue}
                className="pl-7 w-50 h-9"
            />
            {isAnyFilterApplied && (
                <Button variant="outline" size="sm" onClick={onFiltersClear}>
                    <XCircleIcon/>
                    Clear
                </Button>
            )}
        </div>
    );
};
