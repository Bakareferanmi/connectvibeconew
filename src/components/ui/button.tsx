import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ocean/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 transition-[scale,background-color,color,box-shadow,border-color] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-ocean text-snow shadow-[0_10px_24px_-12px_rgba(0,123,255,0.7)] hover:bg-deep",
        teal: "bg-teal text-deep hover:bg-green",
        invert: "bg-snow text-deep hover:bg-foam",
        outline:
          "bg-transparent text-deep shadow-[inset_0_0_0_1.5px_rgba(0,45,107,0.18)] hover:shadow-[inset_0_0_0_1.5px_rgba(0,45,107,0.5)]",
        ghost: "bg-transparent text-deep hover:bg-deep/6",
        onDark:
          "bg-snow/10 text-snow shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.28)] hover:bg-snow hover:text-deep",
        onDarkSolid: "bg-snow text-deep hover:bg-foam",
        link: "rounded-none bg-transparent px-0 text-ocean underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-5 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    static?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  static: isStatic,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        isStatic && "active:scale-100",
        className,
      )}
      {...props}
    />
  );
}

export { buttonVariants };
