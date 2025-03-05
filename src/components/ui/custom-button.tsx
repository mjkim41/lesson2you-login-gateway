
import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none";
    
    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary/90 shadow-sm",
      outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
      link: "bg-transparent text-primary hover:underline p-0"
    };
    
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3"
    };
    
    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyle,
          className
        )}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <span className={`flex items-center justify-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
