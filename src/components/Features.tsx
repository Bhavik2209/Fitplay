import { Eye, Trophy, Users, Sword } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Real-time CV Pose Detection",
    description: "Our AI tracks your body movements with 30+ joint points for accurate exercise recognition.",
  },
  {
    icon: Trophy,
    title: "XP, Levels & Streaks",
    description: "Earn experience points, level up your avatar, and maintain daily streaks for bonus rewards.",
  },
  {
    icon: Users,
    title: "Multiplayer Challenges",
    description: "Compete with friends in real-time workout battles. Who can do more reps wins!",
  },
  {
    icon: Sword,
    title: "Daily Quests & Boss Battles",
    description: "Complete daily fitness quests and defeat epic bosses by doing exercises.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Core Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make fitness fun and addictive
          </p>
        </div>

        {/* Features Grid - 2x2 Premium Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-md border border-border/50 p-8 hover:bg-card/80 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-display font-bold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
