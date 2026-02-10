"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function HomeView() {
    const { data } = authClient.useSession();
    const router = useRouter();

    const signOut = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/auth/login")
            }
        });
    };

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center bg-green-400">
            <span className="text-white text-2xl">Logged in as {data.user.name}</span>
            <Button
                onClick={signOut}
            >
                Sign Out
            </Button>
        </div>
    );
};