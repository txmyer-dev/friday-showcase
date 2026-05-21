import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { NarrativeTerminal } from "./components/NarrativeTerminal";
import { BentoEcosystem } from "./components/BentoEcosystem";
import { ActiveProjects } from "./components/ActiveProjects";

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,113,227,0.1),transparent_50%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
            Meet <span className="text-accent">FRIDAY</span>.
          </h1>
          <p className="text-xl md:text-3xl text-muted max-w-2xl mx-auto mb-10 font-medium text-balance">
            Your infrastructure, orchestrated.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-lg font-semibold transition-colors hover:bg-accent hover:text-white"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See it in action
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Floating "Core" visual placeholder */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10"
        />
      </section>

      {/* Terminal Section */}
      <section id="demo" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
           <NarrativeTerminal />
        </div>
      </section>

      {/* Active Projects Showcase */}
      <ActiveProjects />

      {/* Bento Ecosystem */}
      <BentoEcosystem />

      {/* Sales Pitch Section */}
      <section className="py-32 px-4 text-center bg-zinc-950">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            I don't write code.
          </h2>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed mb-16">
            I build systems that work when you aren't looking.
          </p>

          <a 
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 text-accent text-xl font-semibold hover:gap-4 transition-all"
          >
            Let's build your infrastructure
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-muted text-sm">
        <p>© {new Date().getFullYear()} FRIDAY Showcase. Powered by the Chief-of-Staff Engine.</p>
      </footer>
    </div>
  );
}
