"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchemaType } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/common/form-input";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/auth/error-alert";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
    const [error, setError] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: RegisterSchemaType) => {
        setError("");
        setDisabled(true);
        
        authClient.signUp.email(
        {
            name: values.firstName,
            email: values.email,
            password: values.password,
        },
        {
            onError: ({ error }) => {
                setError(error.message);
                setDisabled(false);
            },
            onSuccess: () => {
                console.log("Success LogIn!");
                setDisabled(false);
            },
            onRequest: () => {
                setDisabled(true);
            },
            onResponse: () => {
                setDisabled(false);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormInput 
                        control={form.control} 
                        label="First Name" 
                        name="firstName" 
                        placeholder="John"
                        disabled={disabled}
                    />
                    <FormInput 
                        control={form.control} 
                        label="Last Name" 
                        name="lastName" 
                        placeholder="Doe"
                        disabled={disabled}
                    />
                </div>

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
                />

                {error && <ErrorAlert message={error}/>}
                
                <Button
                    disabled={disabled}
                    type="submit"
                    className="mt-2 w-full bg-green-400 py-6 text-base font-bold text-black hover:bg-green-500 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}