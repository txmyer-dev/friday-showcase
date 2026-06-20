import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Layers as PipeIcon, Cpu, Send } from "lucide-react";
import gsap from "gsap";
import { BentoEcosystem } from "./components/BentoEcosystem";
import { ActiveProjects } from "./components/ActiveProjects";
import { cn } from "./lib/utils";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        
        tl.fromTo(".hero-badge", 
          { y: -20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8 }
        )
        .fromTo(".hero-title-main", 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.6"
        )
        .fromTo(".hero-subtitle", 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.8"
        )
        .fromTo(".hero-cta", 
          { scale: 0.9, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(".hero-stats-bar",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.4"
        );
      }, heroRef);

      return () => ctx.revert();
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white relative">
      {/* Terminal Navbar */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between font-mono text-xs border-b-2",
        scrolled 
          ? "bg-background border-foreground shadow-none" 
          : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 bg-accent"></span>
          </span>
          <span className="font-bold tracking-widest uppercase flex items-center gap-1.5">
            FRIDAY <span className="text-muted/60">//</span> SYSTEM OPERATIONS
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-muted font-bold uppercase tracking-wider">
          <button onClick={() => scrollToSection('pipeline')} className="hover:text-accent transition-colors flex items-center gap-1.5">
            <PipeIcon className="w-4 h-4" />
            OPERATIONS
          </button>
          <button onClick={() => scrollToSection('ecosystem')} className="hover:text-accent transition-colors flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            ECOSYSTEM
          </button>
        </div>

        <div>
          <a 
            href="mailto:txmyer@gmail.com" 
            className="border-2 border-foreground hover:bg-foreground hover:text-background px-6 py-2 font-bold uppercase tracking-widest text-foreground transition-all duration-200 font-mono flex items-center gap-2"
          >
            INITIATE HANDSHAKE
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 border-b-2 border-foreground">
        
        <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
          {/* Badge */}
          <div className="hero-badge opacity-0 mb-8 border-2 border-foreground px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-accent flex items-center gap-3 bg-charcoal">
            <span className="w-2 h-2 bg-accent animate-pulse" />
            STATION ACTIVE: PORT 05-21
          </div>

          {/* Cinematic Title */}
          <h1 className="hero-title-main opacity-0 text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none uppercase">
            Meet <span className="text-accent relative inline-block">
              FRIDAY
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle opacity-0 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12 font-mono leading-relaxed text-balance uppercase tracking-wider">
            Autonomous operations dashboard. Aligning automated workflows, client onboarding pipelines, and digital assistant teams.
          </p>

          {/* CTA */}
          <div className="hero-cta opacity-0 flex flex-col sm:flex-row gap-6 mb-24 w-full justify-center">
            <button
              onClick={() => scrollToSection('pipeline')}
              className="group flex items-center justify-center gap-3 bg-foreground text-background border-2 border-foreground px-10 py-5 text-base font-bold uppercase tracking-widest transition-all duration-200 hover:bg-accent hover:border-accent hover:text-white"
            >
              Explore Operations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <a
              href="mailto:txmyer@gmail.com"
              className="group flex items-center justify-center gap-3 bg-transparent border-2 border-foreground text-foreground px-10 py-5 text-base font-bold uppercase tracking-widest transition-all duration-200 hover:bg-foreground hover:text-background"
            >
              System Connect
              <Send className="w-5 h-5" />
            </a>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="hero-stats-bar opacity-0 grid grid-cols-2 md:grid-cols-4 gap-0 w-full border-2 border-foreground font-mono text-left bg-charcoal">
            <div className="p-6 border-r-2 border-b-2 md:border-b-0 border-foreground">
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold mb-2">Roster Load</div>
              <div className="text-2xl font-bold text-foreground">108 Agents</div>
              <div className="text-[10px] text-accent mt-1">8 Special Teams</div>
            </div>
            <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-foreground">
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold mb-2">Coverage</div>
              <div className="text-2xl font-bold text-foreground">100% Sync</div>
              <div className="text-[10px] text-accent mt-1">Todoist Engaged</div>
            </div>
            <div className="p-6 border-r-2 border-foreground">
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold mb-2">Pass rate</div>
              <div className="text-2xl font-bold text-foreground">63 / 63 Specs</div>
              <div className="text-[10px] text-accent mt-1">Builds Clean</div>
            </div>
            <div className="p-6">
              <div className="text-[10px] text-muted uppercase tracking-widest font-bold mb-2">Active Cluster</div>
              <div className="text-2xl font-bold text-foreground">Ubuntu VPS</div>
              <div className="text-[10px] text-accent mt-1">Dokploy Orchestrated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Projects Showcase */}
      <div id="pipeline" className="border-b-2 border-foreground">
        <ActiveProjects />
      </div>

      {/* Bento Ecosystem */}
      <div id="ecosystem" className="border-b-2 border-foreground">
        <BentoEcosystem />
      </div>

      {/* Terminal Call to Action Section */}
      <section className="py-32 px-4 text-center bg-charcoal relative overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-background bg-accent px-4 py-2 mb-8 inline-block">
            ESTABLISH LINK // PORTAL OPEN
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-10 text-balance uppercase">
            Systems that run when you aren't looking.
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-16 font-mono uppercase tracking-wider">
            Secure, scalable orchestration workflows designed for engineering leaders and autonomous operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="mailto:txmyer@gmail.com"
              className="inline-flex items-center gap-4 bg-accent hover:bg-foreground text-white hover:text-background font-bold px-10 py-6 text-base uppercase tracking-widest transition-all duration-200 border-2 border-transparent hover:border-foreground"
            >
              Initialize Build
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/txmyer-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-muted hover:text-foreground font-mono text-sm tracking-widest transition-colors border-b-2 border-transparent hover:border-foreground pb-1"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> /txmyer-dev
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t-2 border-foreground relative z-10 font-mono text-xs text-muted tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-accent animate-pulse" />
            <span className="text-foreground font-bold">FRIDAY CORE v2.6.5</span>
          </div>
          <div>
            © {new Date().getFullYear()} FRIDAY Showcase. Designed by Tony Myers.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Github</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


