"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.hello.queryOptions({ text: "Deemeow "}));

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center bg-green-400">
            {data?.greeting}
        </div>
    );
};