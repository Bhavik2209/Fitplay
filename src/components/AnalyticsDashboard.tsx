import { TrendingUp, Flame, Zap, Target } from "lucide-react";

const stats = [
    {
        label: "Weekly Workouts",
        value: "12",
        change: "+3 from last week",
        trend: "up",
        icon: Zap,
        color: "primary",
    },
    {
        label: "Current Streak",
        value: "7 days",
        change: "Personal best!",
        trend: "up",
        icon: Flame,
        color: "accent",
    },
    {
        label: "Total XP Earned",
        value: "2,450",
        change: "+450 this week",
        trend: "up",
        icon: TrendingUp,
        color: "primary",
    },
    {
        label: "Goals Completed",
        value: "8/10",
        change: "80% completion",
        trend: "neutral",
        icon: Target,
        color: "accent",
    },
];

const weeklyData = [
    { day: "Mon", reps: 45 },
    { day: "Tue", reps: 52 },
    { day: "Wed", reps: 38 },
    { day: "Thu", reps: 65 },
    { day: "Fri", reps: 58 },
    { day: "Sat", reps: 70 },
    { day: "Sun", reps: 48 },
];

const AnalyticsDashboard = () => {
    const maxReps = Math.max(...weeklyData.map(d => d.reps));

    return (
        <section className="py-32 relative overflow-hidden bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-bold">
                        Track Your Progress
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real-time analytics and insights to keep you motivated
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 p-6 hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-xl ${stat.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-5 h-5 ${stat.color === 'primary' ? 'text-primary' : 'text-accent'}`} strokeWidth={2} />
                            </div>

                            {/* Data */}
                            <div className="space-y-1">
                                <div className="text-3xl font-display font-bold font-mono">{stat.value}</div>
                                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                                <div className="text-xs text-accent font-medium">{stat.change}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity Chart */}
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-3xl bg-card/60 backdrop-blur-md border border-border/50 p-8">
                        <div className="mb-6">
                            <h3 className="text-xl font-display font-bold mb-1">Weekly Activity</h3>
                            <p className="text-sm text-muted-foreground">Your exercise performance over the last 7 days</p>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="flex items-end justify-between gap-3 h-48">
                            {weeklyData.map((data) => {
                                const heightPercentage = (data.reps / maxReps) * 100;
                                return (
                                    <div key={data.day} className="flex-1 flex flex-col items-center gap-3">
                                        <div className="w-full flex flex-col items-center gap-2">
                                            {/* Bar */}
                                            <div className="w-full bg-muted/50 rounded-t-lg relative overflow-hidden group/bar">
                                                <div
                                                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 hover:from-primary/80 hover:to-accent/80"
                                                    style={{ height: `${heightPercentage * 1.5}px` }}
                                                />
                                            </div>
                                            {/* Value */}
                                            <div className="text-xs font-mono font-semibold text-foreground">{data.reps}</div>
                                        </div>
                                        {/* Day label */}
                                        <div className="text-xs text-muted-foreground font-medium">{data.day}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
