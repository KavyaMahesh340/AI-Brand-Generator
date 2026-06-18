import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 whitespace-nowrap shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-teal-200 bg-teal-50 text-teal-700',
        secondary:
          'border-gray-200 bg-gray-100 text-gray-700',
        destructive:
          'border-red-200 bg-red-50 text-red-700',
        outline:
          'border-gray-200 text-gray-700',
        success:
          'border-green-200 bg-green-50 text-green-700',
        warning:
          'border-amber-200 bg-amber-50 text-amber-700',
        info:
          'border-blue-200 bg-blue-50 text-blue-700',
        purple:
          'border-purple-200 bg-purple-50 text-purple-700',
        navy:
          'border-slate-300 bg-slate-100 text-slate-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
