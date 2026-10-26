"use client";

import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10 bg-[#0d131d]/95 border-Neutral-800 relative">
        <div className="pointer-events-none absolute -top-0.5 -left-0.5 h-4 w-4 border-t-2 border-l-2 border-Lime-500" />
        <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-4 w-4 border-b-2 border-r-2 border-Lime-500" />

        <div className="w-full max-w-xs">
          <SignupForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block"></div>
    </div>
  );
}
