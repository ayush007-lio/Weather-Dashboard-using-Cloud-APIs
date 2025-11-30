import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  // Update these with your actual links
  const GITHUB_URL = "https://github.com/ayush007-lio";
  const LINKEDIN_URL = "https://www.linkedin.com/in/ayush-s-5689142b3/";
  const TWITTER_URL = "https://x.com/SahasaA35123?t=938VkwcSWxtwv7csm6luXQ&s=09";

  return (
    <footer className="mt-8 glass-panel p-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Credit */}
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            Crafted with <span className="text-primary">♦</span> by{" "}
            <span className="font-semibold text-foreground">Ayush S</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Weather Dashboard powered by OpenWeatherMap
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            asChild
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="Visit GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            asChild
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            asChild
          >
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              aria-label="Visit Twitter profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom: Year */}
      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
