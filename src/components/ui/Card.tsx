"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg bg-surface-container/30 backdrop-blur-md",
          "border border-surface-container-highest transition-all duration-300",
          "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(112,0,255,0.1)]",
          className
        )}
        {...props}
      >
        <div className="relative z-10 p-6">{children}</div>
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card };
