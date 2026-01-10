// No imports needed for this component

const DemoPreview = () => {
  return (
    <section id="demo" className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Product Preview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what your fitness journey looks like in FitPlay
          </p>
        </div>

        {/* Premium HUD Mock */}
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 p-8 shadow-xl">

            {/* Player Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🦸</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">NinjaRunner42</h3>
                <div className="text-sm text-muted-foreground">Level 24 • Elite Warrior</div>
              </div>
            </div>

            {/* XP Progress - premium bar */}
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Level 24 Progress</span>
                <span className="font-mono text-muted-foreground">4,250 / 5,000 XP</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50 backdrop-blur-sm">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Boss Fight Card - premium glass */}
            <div className="rounded-2xl bg-primary/5 backdrop-blur-sm border border-primary/20 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-display font-bold text-primary uppercase tracking-wider">Boss Fight Active</div>
                  </div>
                  <h4 className="font-display font-bold text-2xl">Squats × 20</h4>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-mono font-semibold text-primary">14 / 20</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Calories:</span>
                      <span className="font-mono font-semibold text-foreground">127</span>
                    </div>
                  </div>
                </div>

                {/* Boss Icon */}
                <div className="text-5xl">🐉</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;
