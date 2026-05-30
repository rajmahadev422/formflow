"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {

  const {data: session} = useSession();

  if(session) return redirect('/')
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg)">
      <div className="w-full max-w-md p-8 bg-(--bg-2) rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome</h1>

        <p className="text-center text-gray-600 mb-8">
          Sign in with your Google account
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/forms" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-(--border) rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.5 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.7 5.8l6.2 5.2C40.5 35.6 44 30.4 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
