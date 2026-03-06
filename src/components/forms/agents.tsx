"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";
import useAgentMutations from "@/hooks/use-agents-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    agentsCreateSchema, 
    AgentsCreateSchemaType, 
    AgentsUpdateSchemaType } from "@/modules/agents/schemas";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/common/form-input";
import FormTextarea from "@/components/forms/common/form-textarea";
import { Button } from "@/components/ui/button";
import AvatarPlaceholder from "@/components/common/avatar-placeholder";

interface AgentsFormProps {
    onConfirm?: () => void;
    onCancel?: () => void;
    initialValues?: AgentsUpdateSchemaType;
};

export default function AgentsForm({ onConfirm, onCancel, initialValues }: AgentsFormProps) {
    const router = useRouter();
    const { create, update, isPending } = useAgentMutations(initialValues?.id);

    const form = useForm<AgentsCreateSchemaType>({
        resolver: zodResolver(agentsCreateSchema),
        defaultValues: {
            name: initialValues?.name || "",
            instructions: initialValues?.instructions || ""
        }
    });

    const isEdit = !!initialValues?.id;

    const onSubmit = async (values: AgentsCreateSchemaType) => {
        if (isEdit) {
            await update.mutateAsync(
                {
                id: initialValues.id,
                instructions: values.instructions,
                name: values.name
                }, 
                {
                    onSuccess: () => {
                        console.log("Successfully updated agent", values.name);
                        toast.success(`Agent '${values.name}' is successfully updated`);
                    },
                    onError: () => {
                        toast.error(`Unable to update '${values.name}' agent`);
                    }
                }
            );
        } else {
            await create.mutateAsync(
                values, 
                {
                    onSuccess: () => {
                        toast.success(`Mew agent is now available for meetings!`);
                    },
                    onError: (error) => {
                        if (error.data?.code === "FORBIDDEN") {
                            router.push(APP_ROUTES.upgrade);
                        }

                        toast.error(`Unable to create new agent! Upgrade your plan first!`);
                    }
                }
            );
        }

        onConfirm?.();
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
                        className="h-20 w-20 border"
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