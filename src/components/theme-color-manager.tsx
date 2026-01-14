"use client";

import { useUIStore } from "@/hooks/useUIStore";
import { useEffect } from "react";

export function ThemeColorManager() {
    const { primaryColor } = useUIStore();

    useEffect(() => {
        const root = document.documentElement;
        if (primaryColor === 'default') {
            root.removeAttribute('data-theme-color');
        } else {
            root.setAttribute('data-theme-color', primaryColor);
        }
    }, [primaryColor]);

    return null;
}
