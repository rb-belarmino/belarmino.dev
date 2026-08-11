'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-12 w-full rounded-md bg-black border border-surface-container-highest px-3 py-2 text-sm text-on-surface',
          'transition-all duration-200 outline-none',
          'focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-30 w-full rounded-md bg-black border border-surface-container-highest px-3 py-2 text-sm text-on-surface',
          'transition-all duration-200 outline-none resize-y',
          'focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea }
