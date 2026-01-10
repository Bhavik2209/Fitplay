import { Trophy, Flame, Zap } from "lucide-react";

const activities = [
    {
        user: "Sarah J.",
        action: "completed Boss Battle: Dragon of Laziness",
        xp: "+150 XP",
        time: "2m ago",
        avatar: "🏃‍♀️",
    },
    {
        user: "Mike R.",
        action: "achieved 30-day streak",
        xp: "+500 XP",
        time: "5m ago",
        avatar: "💪",
    },
    {
        user: "Alex K.",
        action: "reached Level 50",
        xp: "+1000 XP",
        time: "12m ago",
        avatar: "🥋",
    },
    {
        user: "Emma L.",
        action: "defeated Boss: Speed Demon",
        xp: "+200 XP",
        time: "18m ago",
        avatar: "🤸‍♀️",
    },
];

const ActivityFeed = () => {
    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-display font-bold">
                            Live Activity
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            See what the FitPlay community is achieving right now
                        </p>
                    </div>

                    {/* Activity Feed */}
                    <div className="rounded-3xl bg-card/50 backdrop-blur-md border border-border/50 p-6 space-y-4">
                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-card/80 transition-all duration-300"
                            >
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                                    {activity.avatar}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground">
                                        <span className="font-semibold">{activity.user}</span>{" "}
                                        <span className="text-muted-foreground">{activity.action}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                                </div>

                                {/* XP Badge */}
                                <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="text-xs font-mono font-semibold text-primary">{activity.xp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActivityFeed;
