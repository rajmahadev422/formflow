"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/store";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();
  const { setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Sync auth session to your global store
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session, setUser]);

  // Handle click outside to close the dropdown menu automatically
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Condition 1: Authenticated State (Displays Profile Image & Dropdown Trigger)
  if (session) {
    return (
      <div className="relative inline-block text-left" ref={menuRef}>
        {/* Profile Image Trigger */}
        <img
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-10 w-10 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-(--border) transition-all object-cover"
          src={session?.user?.image || "/default-avatar.png"}
          alt="User Menu"
        />

        {/* Dropdown Menu Overlay */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-(--surface) border border-(--border) p-1 shadow-lg z-50 flex flex-col gap-0.5 fade-up">
            
            {/* User Meta Data Profile Header */}
            {session?.user?.name && (
              <div className="px-3 py-2 text-xs border-b border-(--border) mb-1">
                <p className="font-semibold text-(--text) truncate m-0">
                  {session.user.name}
                </p>
                {session.user.email && (
                  <p className="text-(--text-3) truncate text-[11px] m-0 mt-0.5">
                    {session.user.email}
                  </p>
                )}
              </div>
            )}

            {/* Menu Link 1: Profile Layout */}
            <Link
              href="/forms"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-3 py-2 text-sm text-(--text-2) hover:text-(--text) hover:bg-(--bg-2) rounded-lg transition-colors no-underline inline-flex items-center gap-2"
            >
              <span>👤</span> Profile
            </Link>

            {/* Menu Link 2: Interactive Logout Action */}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full text-left px-3 py-2 text-sm text-(--danger) hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 border-none bg-transparent"
            >
              <span>🚪</span> Logout
            </button>
            
          </div>
        )}
      </div>
    );
  }

  // Condition 2: Unauthenticated State (Displays Base Login Action Trigger)
  return (
    <button 
      onClick={() => signIn("google")} 
      className="btn-primary px-4 py-2 text-sm"
    >
      Login
    </button>
  );
}