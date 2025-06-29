import React from "react";
import { cn } from "@/lib/utils";

const HeaderItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex-1 bg-gray-600 rounded flex items-center cursor-pointer p-0.5",
            className,
        )}
        {...props}
    />
));

export default HeaderItem;
