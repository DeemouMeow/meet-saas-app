"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgentProcedures } from "@/types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsCreateSchema, AgentsCreateSchemaType } from "@/modules/agents/schemas";
import { 
    Form 
} from "@/components/ui/form";
import FormInput from "@/components/forms/common/form-input";
import FormTextarea from "@/components/forms/common/form-textarea";
import { Button } from "@/components/ui/button";
import AvatarPlaceholder from "@/components/common/avatar-placeholder";
import { toast } from "sonner";
import { APP_ROUTES } from "@/lib/routes";

interface AgentsFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentProcedures.GetOne;
};

export default function AgentsForm({ onSuccess, onCancel, initialValues }: AgentsFormProps) {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions()
                );

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    );
                }

                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);

                if (error.data?.code === "FORBIDDEN")
                    router.push(APP_ROUTES.upgrade);
            },
        })
    );

    const form = useForm<AgentsCreateSchemaType>({
        resolver: zodResolver(agentsCreateSchema),
        defaultValues: {
            name: initialValues?.name || "",
            instructions: initialValues?.instructions || ""
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: AgentsCreateSchemaType) => {
        if (isEdit) {
            console.log("TODO: Edit");
        } else {
            createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="flex flex-col items-center w-full gap-6">
                    <AvatarPlaceholder 
                        seed={form.watch("name")}
                        classname="h-20 w-20 border"
                    />

                    <div className="w-full space-y-4">
                        <FormInput 
                            control={form.control} 
                            label="Agent Name" 
                            name="name"
                            type="text" 
                            placeholder="Mr.Agent"
                            disabled={isPending}
                        />

                        <FormTextarea
                            control={form.control}
                            label="Instructions"
                            name="instructions"
                            placeholder="instructions"
                            disabled={isPending}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button
                        type="submit"
                        disabled={isPending} 
                        className="mt-2 bg-green-400 py-6 text-base font-bold text-black hover:bg-green-500 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                        {isEdit ? "Edit": "Create Agent"}
                    </Button>

                    {onCancel && <Button 
                                    type="button" 
                                    disabled={isPending}
                                    onClick={onCancel}
                                    className="mt-2 bg-green-400 py-6 text-base font-bold text-black hover:bg-green-500 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                        Cancel
                    </Button>}
                </div>
            </form>
        </Form>
    );
};