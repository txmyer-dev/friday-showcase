import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

type Line = {
  text: string;
  type: 'input' | 'system' | 'action' | 'success' | 'error';
  delay?: number;
};

const DEMO_LINES: Line[] = [
  { text: "FRIDAY, Paperclip reports the Q3 numbers sync is failing. Fix it.", type: 'input', delay: 1000 },
  { text: "[Diagnosing...] Checking connectivity to cloud-vault...", type: 'system', delay: 1500 },
  { text: "Connection timeout on dokploy-postgres. Primary node unresponsive.", type: 'error', delay: 800 },
  { text: "[Action...] Initializing failover protocol to n8n backup node.", type: 'action', delay: 1200 },
  { text: "Rerouting authentication via encrypted vault proxy...", type: 'system', delay: 1000 },
  { text: "[Executing...] Data ingestion re-engaged. Syncing 4,201 records.", type: 'action', delay: 2000 },
  { text: "Status: Resolved. Q3 Finance Sync 100% complete.", type: 'success', delay: 500 },
];

export const NarrativeTerminal = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < DEMO_LINES.length) {
      const line = DEMO_LINES[currentIndex];
      const timer = setTimeout(() => {
        setLines(prev => [...prev, line]);
        setCurrentIndex(prev => prev + 1);
      }, line.delay || 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-charcoal/90 rounded-[2rem] border border-white/5 shadow-[0_0_50px_rgba(0,162,255,0.03)] overflow-hidden font-mono text-sm md:text-base relative">
      {/* Scanline overlay effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[length:100%_4px] opacity-30 z-20" />
      
      {/* Glow highlight */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Terminal Header */}
      <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between z-10 relative">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-error/20 border border-error/40" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-3.5 h-3.5 rounded-full bg-success/20 border border-success/40" />
        </div>
        <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-widest font-bold">
          <Terminal className="w-4 h-4 text-accent" />
          <span>Live Orchestration Stream</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="p-8 h-[360px] overflow-y-auto space-y-4 scroll-smooth bg-black/60 relative z-10"
      >
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-3",
                line.type === 'input' ? "text-foreground font-bold" : 
                line.type === 'error' ? "text-error" :
                line.type === 'success' ? "text-success" : "text-muted"
              )}
            >
              <span className="shrink-0 mt-1">
                {line.type === 'input' ? <span className="text-accent font-bold">&gt;</span> : 
                 line.type === 'error' ? <AlertCircle className="w-4 h-4 text-error" /> :
                 line.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-success" /> :
                 line.type === 'action' ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : 
                 <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 animate-pulse" />}
              </span>
              <p className="leading-relaxed whitespace-pre-wrap">
                {line.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {currentIndex === DEMO_LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-6 text-center"
          >
            <button 
              onClick={() => {
                setLines([]);
                setCurrentIndex(0);
              }}
              className="text-xs text-muted hover:text-white transition-colors border border-white/5 hover:border-white/20 bg-white/5 px-4 py-2 rounded-full font-bold uppercase tracking-wider font-mono"
            >
              Replay Simulation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
