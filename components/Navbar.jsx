"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/store";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const path = usePathname();

  return (
    <nav className="sticky top-0 z-100 justify-between flex h-15 items-center gap-6 border-b border-(--border) bg-(--surface) px-6 backdrop-blur-md">
      <Link
        href="/"
        className="mr-2 text-[1.3rem] font-normal no-underline text-(--accent) font-['DM_Serif_Display',serif]"
      >
        FormFlow
      </Link>

      <div className="flex-1 gap-1 hidden sm:flex">
        {[
          { href: "/forms/create", label: "Create" },
          { href: "/forms", label: "My Forms" },
        ].map(({ href, label }) => {
          const isActive = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-[0.35rem] text-sm font-medium no-underline transition-all duration-150 ${
                isActive
                  ? "bg-(--accent-light) text-(--accent)"
                  : "bg-transparent text-(--text-2)"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-5">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="flex items-center rounded-lg border border-(--border) bg-(--bg-2) px-2.4 py-1.6 text-base text-(--text-2) transition-all duration-150 cursor-pointer"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <LoginButton />
      </div>
    </nav>
  );
}
