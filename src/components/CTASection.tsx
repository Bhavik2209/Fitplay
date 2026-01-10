import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-12">

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            Ready to Play Your Fitness?
          </h2>

          {/* CTA Button */}
          <Button variant="default" size="xl" className="font-semibold">
            Join the Beta
          </Button>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
