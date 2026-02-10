"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/common/form-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ErrorAlert from "@/components/auth/error-alert";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
    const [error, setError] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: LoginSchemaType) => {
        setError("");
        setDisabled(true);

        authClient.signIn.email(
        {
            email: values.email,
            password: values.password
        },
        {
            onError: ({ error }) => {
                setError(error.message);
                setDisabled(false);
            },
            onSuccess: () => {
                setDisabled(false);
            },
            onRequest: () => {
                setDisabled(true);
            },
            onResponse: () => {
                setDisabled(false);
            },
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormInput 
                    control={form.control} 
                    label="Email Address" 
                    name="email" 
                    type="email" 
                    placeholder="you@company.com"
                    disabled={disabled}
                />
                <FormInput 
                    control={form.control} 
                    label="Password" 
                    name="password" 
                    type="password"
                    disabled={disabled}
                    labelRightElement={
                        <Link href="#" className="text-xs text-green-500 hover:text-green-400 transition-colors">
                            Forgot?
                        </Link>
                    }
                />
                {error && <ErrorAlert message={error}/>}

                <Button disabled={disabled} className="mt-2 w-full bg-green-400 py-6 text-base font-bold text-black hover:bg-green-500 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                    Authorize Agent
                </Button>
            </form>
        </Form>
    );
};