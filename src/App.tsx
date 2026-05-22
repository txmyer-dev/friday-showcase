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
      {/* Floating Island Navbar */}
      <nav className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl rounded-full border transition-all duration-500 px-6 py-4 flex items-center justify-between font-mono text-xs",
        scrolled 
          ? "bg-card/80 backdrop-blur-xl border-accent/20 shadow-[0_10px_40px_rgba(201,168,76,0.06)] mt-2" 
          : "bg-transparent border-white/5"
      )}>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="font-bold tracking-widest text-white uppercase flex items-center gap-1.5">
            FRIDAY <span className="text-muted/60">//</span> SYSTEM OPERATIONS
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-muted font-bold uppercase tracking-wider">
          <button onClick={() => scrollToSection('pipeline')} className="hover:text-accent transition-colors flex items-center gap-1.5">
            <PipeIcon className="w-3.5 h-3.5" />
            Operations
          </button>
          <button onClick={() => scrollToSection('ecosystem')} className="hover:text-accent transition-colors flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Ecosystem
          </button>
        </div>

        <div>
          <a 
            href="mailto:txmyer@gmail.com" 
            className="bg-accent/10 border border-accent/30 hover:bg-accent hover:border-accent hover:text-white px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-accent transition-all duration-300 font-mono shadow-[0_2px_10px_rgba(201,168,76,0.15)]"
          >
            Connect
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-grid pt-24">
        {/* Neon Light Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,168,76,0.06),transparent_50%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] -z-10 animate-pulse pointer-events-none" />
        
        <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="hero-badge opacity-0 mb-6 bg-charcoal border border-white/5 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest text-accent flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            STATION ACTIVE: PORT 05-21
          </div>

          {/* Cinematic Title */}
          <h1 className="hero-title-main opacity-0 text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-none">
            Meet <span className="text-accent relative inline-block">
              FRIDAY
              <span className="absolute bottom-2 left-0 w-full h-[6px] bg-accent/30 rounded-full blur-[1px]"></span>
            </span>.
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle opacity-0 text-lg sm:text-2xl text-muted max-w-2xl mx-auto mb-12 font-mono leading-relaxed text-balance">
            Autonomous operations dashboard. Aligning automated workflows, client onboarding pipelines, and digital assistant teams.
          </p>

          {/* CTA */}
          <div className="hero-cta opacity-0 flex flex-col sm:flex-row gap-4 mb-20">
            <button
              onClick={() => scrollToSection('pipeline')}
              className="group flex items-center justify-center gap-2.5 bg-foreground text-background px-8 py-4.5 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-accent hover:text-white shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(201,168,76,0.3)] hover:scale-[1.02]"
            >
              Explore Operations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="mailto:txmyer@gmail.com"
              className="group flex items-center justify-center gap-2.5 bg-charcoal border border-white/5 hover:border-accent/40 text-white px-8 py-4.5 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-black"
            >
              Initiate Handshake
              <Send className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </a>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="hero-stats-bar opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl w-full border-t border-white/5 pt-10 font-mono text-left bg-black/10 p-6 rounded-3xl backdrop-blur-sm border border-white/5">
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1">Roster Load</div>
              <div className="text-2xl font-bold text-white">108 Agents</div>
              <div className="text-[10px] text-success">8 Special Teams</div>
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1">Coverage</div>
              <div className="text-2xl font-bold text-white">100% Sync</div>
              <div className="text-[10px] text-accent">Todoist Engaged</div>
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1">Pass rate</div>
              <div className="text-2xl font-bold text-white">63 / 63 Specs</div>
              <div className="text-[10px] text-success">Builds Clean</div>
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1">Active Cluster</div>
              <div className="text-2xl font-bold text-white">Ubuntu VPS</div>
              <div className="text-[10px] text-accent">Dokploy Orchestrated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Projects Showcase */}
      <div id="pipeline">
        <ActiveProjects />
      </div>

      {/* Bento Ecosystem */}
      <div id="ecosystem">
        <BentoEcosystem />
      </div>

      {/* Brutalist Call to Action Section */}
      <section className="py-32 px-4 text-center bg-black/20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-6 inline-block">
            Establish Link
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-8 text-balance">
            I build systems that run when you aren't looking.
          </h2>
          <p className="text-lg sm:text-2xl text-muted max-w-2xl mx-auto leading-relaxed mb-12 font-mono">
            Secure, scalable orchestration workflows designed for engineering leaders and autonomous operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="mailto:txmyer@gmail.com"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent/80 text-white font-bold px-8 py-5 rounded-full text-base uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.2)] hover:shadow-[0_4px_30px_rgba(201,168,76,0.4)] hover:scale-[1.03]"
            >
              Let's build your pipeline
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-white font-mono text-sm tracking-wider transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> /txmyer-dev
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-background relative z-10 font-mono text-[10px] text-muted tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span>FRIDAY CORE v2.6.5</span>
          </div>
          <div>
            © {new Date().getFullYear()} FRIDAY Showcase. Designed by Tony Myers.
          </div>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
            <span>/</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

