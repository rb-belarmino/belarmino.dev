import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function Chip({ className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded font-mono text-label-caps tracking-widest',
        'bg-primary/10 text-primary border border-primary/20',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
