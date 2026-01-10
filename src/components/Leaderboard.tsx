import { Crown, Medal, Award } from "lucide-react";

const leaderboard = [
    { rank: 1, name: "NinjaWarrior99", xp: "15,420", badge: "🥇", icon: Crown },
    { rank: 2, name: "FitMaster2024", xp: "14,850", badge: "🥈", icon: Medal },
    { rank: 3, name: "BeastMode247", xp: "13,990", badge: "🥉", icon: Award },
    { rank: 4, name: "EliteRunner", xp: "12,340", badge: "🏆", icon: null },
    { rank: 5, name: "PowerPlayer", xp: "11,820", badge: "⭐", icon: null },
];

const Leaderboard = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-display font-bold">
                            Top Players
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Compete with the best and climb the ranks
                        </p>
                    </div>

                    {/* Leaderboard Card */}
                    <div className="rounded-3xl bg-card/60 backdrop-blur-md border border-border/50 p-6 md:p-8">
                        <div className="space-y-3">
                            {leaderboard.map((player) => (
                                <div
                                    key={player.rank}
                                    className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${player.rank <= 3
                                            ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20'
                                            : 'bg-muted/30 hover:bg-muted/50'
                                        }`}
                                >
                                    {/* Rank */}
                                    <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-display font-bold">
                                            {player.badge}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-display font-bold text-foreground truncate">
                                            {player.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Rank #{player.rank}</p>
                                    </div>

                                    {/* XP */}
                                    <div className="text-right">
                                        <p className="font-mono font-bold text-lg text-primary">{player.xp}</p>
                                        <p className="text-xs text-muted-foreground">Total XP</p>
                                    </div>

                                    {/* Icon for top 3 */}
                                    {player.icon && (
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            <player.icon className="w-6 h-6 text-primary" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-6 pt-6 border-t border-border/50 text-center">
                            <p className="text-sm text-muted-foreground">
                                Join now to compete and earn your spot on the leaderboard
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
