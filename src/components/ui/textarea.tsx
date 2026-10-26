import * as React from "react";
import { cn } from "cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-none border border-Neutral-700 bg-Navy-950 px-3 py-2 text-sm font-mono text-Neutral-100 transition-colors outline-none placeholder:text-Neutral-500 focus-visible:border-Lime-500 focus-visible:ring-1 focus-visible:ring-Lime-500/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-Red-400 aria-invalid:ring-1 aria-invalid:ring-Red-400/50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
