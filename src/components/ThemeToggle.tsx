import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 flex items-center justify-center group overflow-hidden"
            aria-label="Toggle theme"
        >
            <Sun className="w-5 h-5 text-foreground rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 absolute" />
            <Moon className="w-5 h-5 text-foreground rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 absolute" />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/5 transition-opacity duration-300 rounded-xl" />
        </button>
    );
}
