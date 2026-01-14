"use client";

import { Palette } from "lucide-react";
import { useUIStore, type PrimaryColor } from "@/hooks/useUIStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const colors: { name: PrimaryColor; color: string }[] = [
    { name: 'default', color: '#18181a' },
    { name: 'cyan', color: '#a5fcfd' },
    { name: 'green', color: '#86efac' },
    { name: 'yellow', color: '#fde68a' },
    { name: 'blue', color: '#94bcfa' },
    { name: 'violet', color: '#c4b5fd' },
    { name: 'pink', color: '#fb63b6' },
    { name: 'orange', color: '#fca5a5' },
];

export function ColorPicker() {
    const { primaryColor, setPrimaryColor } = useUIStore();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-accent rounded-full text-foreground transition-colors opacity-50"
            >
                <Palette className="h-3.5 w-3.5" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 p-3 bg-popover border border-border rounded-xl shadow-xl min-w-[180px] z-50 origin-top-right"
                    >
                        <p className="text-xs font-bold text-muted-foreground mb-3 px-1 uppercase tracking-wider">
                            Theme Color
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => {
                                        setPrimaryColor(c.name);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                                        primaryColor === c.name
                                            ? "border-primary scale-110 shadow-sm"
                                            : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                                    )}
                                    style={{ backgroundColor: c.color }}
                                    title={c.name}
                                >
                                    {primaryColor === c.name && (
                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
