import { motion } from 'framer-motion';
import { Box, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

type ModuleProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
};

const ModuleCard = ({ title, description, icon, className }: ModuleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={cn(
      "group relative p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-accent/30 transition-all overflow-hidden",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 h-full flex flex-col">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted leading-relaxed flex-grow">{description}</p>
    </div>
  </motion.div>
);

export const BentoEcosystem = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">A Modular Ecosystem</h2>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
          Purpose-built modules designed to scale, secure, and automate your most critical workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModuleCard
          className="md:col-span-2"
          title="Paperclip"
          description="The orchestration sidebar. A context-aware bridge that allows you to manage cloud infrastructure, deployments, and AI agents directly from your workspace without switching tools."
          icon={<Layers className="w-6 h-6" />}
        />
        <ModuleCard
          title="SNAP Worker"
          description="High-velocity asynchronous execution. Handles long-running background tasks, data migrations, and complex logic with near-zero latency."
          icon={<Cpu className="w-6 h-6" />}
        />
        <ModuleCard
          title="The Vault"
          description="Military-grade encrypted context management. Your data stays private, portable, and accessible only to the agents you authorize."
          icon={<ShieldCheck className="w-6 h-6" />}
        />
        <ModuleCard
          className="md:col-span-3"
          title="HostVPS Integration"
          description="Seamless deployment across Ubuntu-based cloud nodes. Automated repo updates, container orchestration via Dokploy, and unified logging across your entire cluster."
          icon={<Box className="w-6 h-6" />}
        />
      </div>
    </section>
  );
};
