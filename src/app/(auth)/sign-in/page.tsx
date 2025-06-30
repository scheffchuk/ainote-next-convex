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
          : "Account created successfully"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-4">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
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
          className="w-full text-sm text-muted-foreground cursor-pointer"
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
