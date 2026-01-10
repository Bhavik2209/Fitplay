import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out FitPlay",
        features: [
            "3 games available",
            "Basic AI tracking",
            "5 workouts per week",
            "Community access",
            "Progress tracking",
        ],
        cta: "Start Free",
        popular: false,
    },
    {
        name: "Premium",
        price: "$12",
        period: "per month",
        description: "Best for serious fitness gamers",
        features: [
            "All 20+ games unlocked",
            "Advanced AI pose detection",
            "Unlimited workouts",
            "Boss battles & challenges",
            "Detailed analytics",
            "Priority support",
            "Custom workout plans",
        ],
        cta: "Start Premium",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        description: "For gyms and fitness studios",
        features: [
            "Everything in Premium",
            "Multi-user accounts",
            "Custom branding",
            "API access",
            "Dedicated support",
            "Volume discounts",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-bold">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start free, upgrade anytime. No credit card required.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`group relative overflow-hidden rounded-3xl backdrop-blur-md border p-8 transition-all duration-300 hover:-translate-y-2 ${plan.popular
                                    ? 'bg-gradient-to-b from-primary/10 to-card/60 border-primary/50 shadow-xl shadow-primary/10'
                                    : 'bg-card/50 border-border/50 hover:border-primary/30'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-2xl rounded-tr-3xl flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-display font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/{plan.period}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-foreground/90">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                variant={plan.popular ? "default" : "outline"}
                                size="lg"
                                className="w-full font-semibold"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="text-center mt-12 text-sm text-muted-foreground">
                    💳 All plans include 14-day money-back guarantee • Cancel anytime
                </div>
            </div>
        </section>
    );
};

export default Pricing;
