"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues, signInSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  const [step, setStep] = useState<"signIn" | "signUp">("signIn");

  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    setIsLoading(true);
    try {
      await signIn("password", {
        ...values,
        flow: step,
      });
      toast.success(
        step === "signIn"
          ? "Signed in successfully"
          : "Account created successfully",
      );
      router.push("/notes");
    } catch (error) {
      console.error(error);
      // Might have better solution later.
      if (
        error instanceof Error &&
        (error.message.includes("InvalidAccountId") ||
          error.message.includes("InvalidSecret"))
      ) {
        form.setError("root", {
          type: "manual",
          message: "Invalid credentials.",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-muted/50 flex min-h-screen flex-col items-center justify-center p-4">
      {/* Sign In form */}
      <div className="bg-card w-full max-w-md space-y-8 rounded-lg p-6 shadow-lg">
        <h1 className="text-card-foreground text-3xl font-bold">
          {step === "signIn" ? "Login" : "Create Account"}
        </h1>
        <p className="text-muted-foreground">
          {step === "signIn"
            ? "Enter your credentials to access your account."
            : "Create a new account to get started."}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cat@example.com"
                      {...field}
                      type="email"
                      autoComplete="username"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="O Captain My Captain..."
                      {...field}
                      autoComplete={
                        step === "signIn" ? "current-password" : "new-password"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <div className="text-destructive text-sm">
                {form.formState.errors.root.message}
              </div>
            )}
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {step === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
        <Button
          variant="link"
          type="button"
          className="text-muted-foreground w-full cursor-pointer text-sm"
          onClick={() => {
            setStep(step === "signIn" ? "signUp" : "signIn");
            form.reset;
          }}
        >
          {step === "signIn"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
      </div>
    </div>
  );
}
