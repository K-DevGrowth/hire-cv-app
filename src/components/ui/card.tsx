import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) py-(--card-spacing) text-sm [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0",
  {
    variants: {
      variant: {
        default:
          "overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        cyber:
          "relative rounded-none border border-Neutral-800 bg-[#0d131d]/95 text-Neutral-100 shadow-2xl backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Card({
  className,
  variant = "default",
  size = "default",
  cyberCorners,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    size?: "default" | "sm";
    cyberCorners?: boolean;
  }) {
  const hasCyberCorners = cyberCorners ?? (variant === "cyber");

  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      {hasCyberCorners && (
        <>
          <div className="pointer-events-none absolute -top-[2px] -left-[2px] h-4 w-4 border-t-2 border-l-2 border-Lime-500" />
          <div className="pointer-events-none absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b-2 border-r-2 border-Lime-500" />
        </>
      )}
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t bg-muted/50 p-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
};
