import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Do I need any equipment?",
        answer: "No! FitPlay works with just your body and a camera. Our AI tracks your movements in real-time without any wearables, sensors, or special equipment. All you need is a device with a camera and some space to move.",
    },
    {
        question: "What devices does FitPlay work on?",
        answer: "FitPlay works on any device with a camera - smartphones, tablets, laptops, or desktop computers. We support iOS, Android, Windows, and macOS. For the best experience, we recommend a device with a front-facing camera and a stable internet connection.",
    },
    {
        question: "Is FitPlay really free?",
        answer: "Yes! Our Free plan is genuinely free forever with access to 3 games and basic features. You can upgrade to Premium anytime for unlimited games, advanced tracking, and exclusive content - but you can enjoy FitPlay without ever paying a penny.",
    },
    {
        question: "How does the AI tracking work?",
        answer: "Our computer vision AI uses your device's camera to detect 30+ body joint points in real-time. It tracks your movements with incredible accuracy, counting reps, analyzing form, and providing instant feedback - all without any wearable devices or sensors.",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Absolutely! You can cancel your Premium subscription at any time with just one click. No questions asked, no hidden fees. You'll continue to have access until the end of your billing period, then automatically switch to the Free plan.",
    },
    {
        question: "Is FitPlay suitable for beginners?",
        answer: "Yes! FitPlay adapts to your fitness level. Our AI automatically adjusts difficulty based on your performance, making it perfect for everyone from complete beginners to advanced athletes. Start at your own pace and progress naturally.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-bold">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about FitPlay
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-card/50 backdrop-blur-md border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors"
                            >
                                <span className="font-display font-bold text-lg pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-sm text-muted-foreground">
                        Still have questions?{" "}
                        <a href="#contact" className="text-primary hover:underline font-medium">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
