"use client";

import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/forms/login";

export default function LoginPage() {
  return (
    <AuthCard
        headerTitle="Welcome back"
        headerDescription="Enter your details to resume your sessions."
        backButtonLabel="Don't have access?"
        backButtonText="Request Invite"
        backButtonHRef="/auth/register"
        showSocial
    >
        <LoginForm/>
    </AuthCard>
  );
};
