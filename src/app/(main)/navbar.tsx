import ThemeSwitcher from "@/components/theme-switcher";
import Link from "next/link";
import React from "react";
import { BiNotepad } from "react-icons/bi";
import SignOutButton from "../(auth)/sign-out-button";

const Navbar = () => {
  return (
    <nav className="flex justify-center p-4 bg-card border-b">
      <div className="container xl:max-w-6xl flex items-center mx-auto justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold text-card-foreground hover:opacity-80 transition-opacity"
        >
          <BiNotepad size={24} />
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
