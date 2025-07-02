"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const SignOutButton = () => {
  const { signOut } = useAuthActions();
  return (
    <Button
      variant="outline"
      onClick={signOut}
      title="Sign out"
      size="icon"
      className="cursor-pointer"
    >
      <LogOut />
    </Button>
  );
};

export default SignOutButton;
