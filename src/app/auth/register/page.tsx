"use client";

import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/forms/register";

export default function RegisterPage() {
  return (
    <AuthCard 
        headerTitle="Create Account"
        headerDescription="Start your free trial of the AI meeting suite."
        backButtonLabel="Already a member?"
        backButtonText="Log In"
        backButtonHRef="/auth/login"
        showSocial
    >
        <RegisterForm/>
    </AuthCard>
    
  );
}
