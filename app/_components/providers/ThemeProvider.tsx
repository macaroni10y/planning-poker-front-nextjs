"use client";

import { themeColorAtom } from "@/app/_lib/atoms";
import { applyTheme } from "@/app/_lib/themes";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const themeColor = useAtomValue(themeColorAtom);
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDarkMode =
                document.documentElement.classList.contains("dark");
            applyTheme(themeColor, isDarkMode);
            setThemeLoaded(true);
        }
    }, [themeColor]);

    if (!themeLoaded) {
        return null;
    }

    return <>{children}</>;
};

export default ThemeProvider;
