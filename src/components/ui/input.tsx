import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 bg-Navy-950 rounded-none border border-Neutral-700 px-3 py-2 text-sm font-mono text-Neutral-100 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-Neutral-500 focus-visible:border-Lime-500 focus-visible:ring-1 focus-visible:ring-Lime-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-Red-400 aria-invalid:ring-1 aria-invalid:ring-Red-400/50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
