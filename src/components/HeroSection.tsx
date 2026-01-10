import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (  
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Cursor-Following Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main orb - follows cursor directly */}
        <div
          className="absolute w-96 h-96 bg-energy/20 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Secondary orb - follows with delay */}
        <div
          className="absolute w-80 h-80 bg-primary/15 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-60%, -40%)',
          }}
        />

        {/* Tertiary orb - slower follow */}
        <div
          className="absolute w-64 h-64 bg-energy/15 rounded-full blur-3xl transition-all duration-1500 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-40%, -60%)',
          }}
        />

        {/* Accent orb - very slow */}
        <div
          className="absolute w-72 h-72 bg-accent/10 rounded-full blur-3xl transition-all duration-2000 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-30%, -30%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-tight">
            Turn Movement Into Play.
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your body becomes the controller. AI turns exercise into immersive games.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="default" size="xl" className="font-semibold">
              Start Playing
            </Button>
            <Button variant="glass" size="xl" className="font-medium">
              See How It Works
            </Button>
          </div>

          {/* Stats - clean and minimal */}
          <div className="pt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center space-y-1">
              <div className="text-3xl font-display font-bold font-mono">10K+</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl font-display font-bold font-mono">500M</div>
              <div className="text-sm text-muted-foreground">Reps Tracked</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl font-display font-bold font-mono">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
