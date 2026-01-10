// No imports needed for this component

const benefits = [
  "No boring workouts",
  "Feels like gaming, trains like fitness",
  "Built for home and small spaces",
  "No equipment needed – just your body",
];

const WhyFitPlay = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <img
                src="/images/workout-action.png"
                alt="Person doing jumping jacks exercise at home, full of energy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Why FitPlay
              </h2>
            </div>

            {/* Value Proposition - premium card */}
            <div className="rounded-3xl bg-card/50 backdrop-blur-md border border-border/50 p-8">
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-4 text-lg group"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform flex-shrink-0" />
                    <span className="text-foreground/90 group-hover:text-foreground transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyFitPlay;
