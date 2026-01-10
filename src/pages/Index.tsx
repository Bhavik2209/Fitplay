import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import WhyFitPlay from "../components/WhyFitPlay";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import DemoPreview from "../components/DemoPreview";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import ActivityFeed from "../components/ActivityFeed";
import Leaderboard from "../components/Leaderboard";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ScrollProgress />
      <Header />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="analytics">
        <AnalyticsDashboard />
      </div>
      <WhyFitPlay />
      <div id="demo">
        <DemoPreview />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <ActivityFeed />
      <Leaderboard />
      <div id="faq">
        <FAQ />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
