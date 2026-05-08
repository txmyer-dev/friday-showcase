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
    <div className="w-full max-w-3xl mx-auto bg-black rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm md:text-base">
      {/* Terminal Header */}
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
          <div className="w-3 h-3 rounded-full bg-green-500/20" />
        </div>
        <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-widest font-semibold">
          <Terminal className="w-3 h-3" />
          Live Orchestration
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="p-6 h-[400px] overflow-y-auto space-y-4 scroll-smooth bg-zinc-950/50"
      >
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-3",
                line.type === 'input' ? "text-foreground font-bold" : 
                line.type === 'error' ? "text-red-400" :
                line.type === 'success' ? "text-green-400" : "text-muted"
              )}
            >
              <span className="shrink-0 mt-1">
                {line.type === 'input' ? '>' : 
                 line.type === 'error' ? <AlertCircle className="w-4 h-4" /> :
                 line.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                 line.type === 'action' ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                 <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2" />}
              </span>
              <p className="leading-relaxed">
                {line.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {currentIndex === DEMO_LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-4 text-center"
          >
            <button 
              onClick={() => {
                setLines([]);
                setCurrentIndex(0);
              }}
              className="text-xs text-muted hover:text-white transition-colors border border-white/10 px-3 py-1 rounded-full"
            >
              Replay Demo
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
