import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
    size?: number;
    className?: string;
}

function Spinner({ size = 16, className }: SpinnerProps) {
    return <Loader2 className={cn("animate-spin", className)} size={size} />;
}

export { Spinner };
