import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Busy Mom of 2",
        image: "/images/celebration.png",
        quote: "FitPlay turned my boring home workouts into something I actually look forward to. Lost 15 lbs in 2 months!",
        rating: 5,
    },
    {
        name: "Mike Chen",
        role: "Software Developer",
        image: "/images/hero-fitness.png",
        quote: "As a gamer, this is perfect. I'm finally exercising consistently because it feels like playing my favorite games.",
        rating: 5,
    },
    {
        name: "Community",
        role: "10,000+ Active Players",
        image: "/images/group-workout.png",
        quote: "Join our diverse community of fitness gamers. From beginners to athletes, everyone wins together.",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-bold">
                        Loved by 10,000+ Players
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Real stories from people who transformed their fitness journey
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="group relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-md border border-border/50 p-8 hover:bg-card/80 hover:border-primary/30 transition-all duration-500"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 opacity-10">
                                <Quote className="w-16 h-16 text-primary" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="text-primary text-lg">★</span>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-foreground/90 leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-sm">{testimonial.name}</div>
                                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="text-center mt-12">
                    <p className="text-sm text-muted-foreground">
                        ⭐ 4.9/5 average rating • 10,000+ downloads
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
