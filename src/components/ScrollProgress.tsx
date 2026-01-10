import { useEffect, useState, useRef } from "react";

const sections = [
    { id: "hero", label: "Home" },
    { id: "how-it-works", label: "How It Works" },
    { id: "features", label: "Features" },
    { id: "demo", label: "Demo" },
    { id: "testimonials", label: "Reviews" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
];

export const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");
    const ticking = useRef(false);

    useEffect(() => {
        const updateProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
            setScrollProgress(progress);

            // Detect active section
            let currentSection = "hero";
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 300 && rect.bottom >= 100) {
                        currentSection = section.id;
                    }
                }
            });
            setActiveSection(currentSection);

            ticking.current = false;
        };

        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateProgress);
                ticking.current = true;
            }
        };

        // Initial update
        updateProgress();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-muted/30 z-50 backdrop-blur-sm">
                <div
                    className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-none"
                    style={{
                        width: `${scrollProgress}%`,
                        willChange: 'width'
                    }}
                />
            </div>

            {/* Section Dots Navigation */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative"
                        aria-label={`Navigate to ${section.label}`}
                    >
                        {/* Dot */}
                        <div
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section.id
                                ? 'bg-primary scale-125 shadow-lg shadow-primary/50'
                                : 'bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:scale-110'
                                }`}
                        />

                        {/* Label on hover */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-card/90 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                                <span className="text-xs font-medium">{section.label}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
};
