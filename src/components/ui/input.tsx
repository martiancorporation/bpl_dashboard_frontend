import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  isPassword?: boolean;
}

function Input({ className, type, isPassword = false, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[#DDDDDD] h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

export { Input };
