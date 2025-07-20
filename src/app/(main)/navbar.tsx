import ThemeSwitcher from "@/components/theme-switcher";
import Link from "next/link";
import React from "react";
import SignOutButton from "../(auth)/sign-out-button";

const Navbar = () => {
  return (
    <nav className="bg-card flex justify-center border-b p-4">
      <div className="container mx-auto flex items-center justify-between xl:max-w-6xl">
        <Link
          href="/"
          className="text-card-foreground flex items-center gap-3 text-xl font-semibold transition-opacity hover:opacity-80"
        >
          Amnesiac Memos
        </Link>
        <div className="flex items-center gap-2">
          {/* Theme button and signout button */}
          <ThemeSwitcher />
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
