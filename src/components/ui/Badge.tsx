import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-medium transition-colors hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-main text-white shadow hover:border-black',
        outline: 'border-border bg-transparent text-text shadow',
        success: 'bg-success text-white',
        error: 'bg-error text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
