"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-primary text-on-primary font-bold hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:-translate-y-[2px]",
      secondary:
        "bg-transparent border border-primary text-primary hover:bg-primary/10",
      ghost:
        "bg-transparent text-on-surface-variant hover:text-primary font-mono before:content-['+'] before:mr-2",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded transition-all duration-200 ease-in-out px-4 py-2",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
