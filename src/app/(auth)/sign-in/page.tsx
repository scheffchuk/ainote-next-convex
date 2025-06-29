"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const [step, setStep] = useState<"signIn" | "signUp">("signIn");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50">
      {/* Sign In form */}
      <div className="w-full max-w-md p-6 space-y-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-card-foreground">
          {step === "signIn" ? "Login" : "Create Account"}
        </h1>
        <p className="text-muted-foreground">
          {step === "signIn"
            ? "Enter your credentials to access your account."
            : "Create a new account to get started."}
        </p>
      </div>
    </div>
  );
}
