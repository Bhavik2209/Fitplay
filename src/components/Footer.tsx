import { Github, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FitPlay
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn your workout into an epic gaming adventure powered by AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-display font-bold text-sm mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-sm mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-display font-bold text-sm mb-4">Connect</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li><a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group">
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group">
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group">
                <Youtube className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group">
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2024 FitPlay. All rights reserved. Made with ❤️ for fitness gamers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
