import { Gamepad2, Activity, Cpu } from "lucide-react";

const steps = [
  {
    icon: Gamepad2,
    title: "Pick a Game",
    description: "Choose from epic boss battles, racing challenges, or rhythm fitness games.",
  },
  {
    icon: Activity,
    title: "Move in Real Life",
    description: "Do squats, lunges, punches, or any exercise. Your movement is your controller.",
  },
  {
    icon: Cpu,
    title: "AI Tracks You in Real Time",
    description: "Our computer vision AI detects your movements with pinpoint accuracy.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your workout into an adventure
          </p>
        </div>

        {/* Premium Glass Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-md border border-border/50 p-8 hover:bg-card/70 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Step number - subtle watermark */}
              <div className="absolute top-6 right-6 text-5xl font-display font-bold text-primary/5">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                <step.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
