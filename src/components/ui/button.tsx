import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils.ts'

export const buttonVariants = cva(
  'shadow-button before:absolute before:top-2 before:left-0 before:-z-[1] before:-right-1 before:-bottom-1.5  before:w-full uppercase inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none shrink-0 relative',
  {
    variants: {
      variant: {
        default:
          'bg-silver shadow hover:bg-silver-hover before:rounded-b-[10px] before:bg-[#6B8997]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        primary: 'bg-blue hover:bg-blue-hover before:bg-[#118C87]',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-yellow hover:bg-yellow-hover before:bg-[#CC8B13]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        square:
          'bg-semidark-navy rounded-[15px] before:rounded-b-[15px]  before:bg-[#10212A] shadow-none',
      },
      size: {
        default: 'h-12 px-4 rounded-[10px] before:rounded-b-[10px] py-2',
        lg: 'h-16 rounded-[15px] before:rounded-b-[15px] px-8',
        icon: 'size-12 rounded-[5px] before:rounded-b-[5px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
