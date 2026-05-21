import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Box, Server, ChevronRight, Activity, Cpu as CpuIcon, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

type ModuleProps = {
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

const ModuleCard = ({ title, description, badge, icon, className, children }: ModuleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className={cn(
      "group relative p-8 rounded-[2rem] bg-card border border-white/5 hover:border-accent/30 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)]",
      className
    )}
  >
    {/* Background Grid Pattern & Glows */}
    <div className="absolute inset-0 bg-dots opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors duration-300 pointer-events-none" />
    
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-charcoal border border-white/5 flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 transition-all duration-300 shadow-inner">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-md">
            {badge}
          </span>
        )}
      </div>

      {/* Main Info */}
      <h3 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-6 font-mono">
        {description}
      </p>
    </div>

    {/* Custom Widget Slot */}
    {children && (
      <div className="relative mt-auto w-full border-t border-white/5 pt-6 bg-black/20 rounded-xl overflow-hidden p-4">
        {children}
      </div>
    )}
  </motion.div>
);

export const BentoEcosystem = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-4 inline-block">
          Modular Operations
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          System Ecosystem
        </h2>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto font-mono">
          Decentralized infrastructure pipelines and developer runtimes built for resilient execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Paperclip Card */}
        <ModuleCard
          className="md:col-span-2"
          title="Paperclip Sidebar"
          description="Context-aware terminal bridge that compiles, tests, and deploys workspace changes in direct response to system directives."
          badge="VS Code Ext"
          icon={<Layers className="w-5 h-5" />}
        >
          <div className="flex gap-4 items-stretch h-36 font-mono text-xs text-zinc-400 select-none">
            {/* Sidebar View */}
            <div className="w-1/3 bg-charcoal/90 border border-white/5 rounded-lg p-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1">Explorer</div>
                <div className="flex items-center gap-1.5 text-accent"><ChevronRight className="w-3 h-3" /> src/</div>
                <div className="flex items-center gap-1.5 pl-3 text-success"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> App.tsx</div>
                <div className="flex items-center gap-1.5 pl-3"><span className="w-1.5 h-1.5 rounded-full bg-muted"></span> index.css</div>
                <div className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /> package.json</div>
              </div>
              <div className="text-[10px] text-success/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                v0.4.0 Active
              </div>
            </div>
            
            {/* Integrated Terminal View */}
            <div className="flex-1 bg-black/80 border border-white/5 rounded-lg p-2.5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
              </div>
              <div className="space-y-1">
                <div className="text-muted text-[10px]">TERMINAL — paperclip-extension</div>
                <div className="text-zinc-300 font-bold">$ npm run compile</div>
                <div className="text-success">&gt; tsc --noEmit [Success]</div>
                <div className="text-zinc-300 font-bold">$ npm run test</div>
                <div className="text-muted">✓ 63 specs passed (1.42s)</div>
              </div>
              <div className="text-[10px] text-accent/80 font-bold">RELEASE READY: 0.4.0.vsix</div>
            </div>
          </div>
        </ModuleCard>

        {/* SNAP Worker Card */}
        <ModuleCard
          title="SNAP Worker"
          description="High-velocity asynchronous execution loop for background actions and database state sync."
          badge="Core Runtime"
          icon={<CpuIcon className="w-5 h-5" />}
        >
          <div className="h-36 flex flex-col justify-between font-mono text-xs">
            <div className="flex justify-between items-center text-muted mb-2">
              <span>WORKER STATE</span>
              <span className="text-success flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                ONLINE
              </span>
            </div>
            
            {/* Task list simulation */}
            <div className="space-y-2 flex-grow">
              <div className="bg-charcoal/80 border border-white/5 rounded p-2 flex justify-between items-center">
                <span className="truncate">Ingest RSS Wisdom</span>
                <span className="text-[10px] text-success bg-success/10 px-1.5 py-0.5 rounded">100%</span>
              </div>
              <div className="bg-charcoal/80 border border-white/5 rounded p-2 flex justify-between items-center">
                <span className="truncate">Todoist Shadow Sync</span>
                <span className="text-[10px] text-accent bg-accent/10 px-1.5 py-0.5 rounded animate-pulse">SYNCING</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span>Queue: 0 pending / 4,201 total</span>
            </div>
          </div>
        </ModuleCard>

        {/* The Vault Card */}
        <ModuleCard
          title="The Vault"
          description="Strictly segmented contextual key vault ensuring API credential insulation and secure SSE handshakes."
          badge="Security Vault"
          icon={<ShieldCheck className="w-5 h-5" />}
        >
          <div className="h-36 flex flex-col justify-between font-mono text-xs">
            <div className="flex items-center justify-between text-muted">
              <span>KEY VAULT SEGMENT</span>
              <Lock className="w-3.5 h-3.5 text-accent" />
            </div>

            <div className="space-y-1.5 my-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">SSE_ENDPOINT:</span>
                <span className="text-accent truncate max-w-[130px]">backend.getrecall.ai</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">API_KEY:</span>
                <span className="text-success truncate">••••••••••••sk_live</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">AUTHENTICATION:</span>
                <span className="text-success">VERIFIED</span>
              </div>
            </div>

            <div className="bg-success/5 border border-success/20 rounded p-1.5 text-center text-[10px] text-success font-bold uppercase tracking-wider">
              Enclave Sealed & Encrypted
            </div>
          </div>
        </ModuleCard>

        {/* HostVPS Card */}
        <ModuleCard
          className="md:col-span-2"
          title="HostVPS & Dokploy Cluster"
          description="Ubuntu-based hosting architecture featuring automatic container deployments, reverse proxies, and health telemetry."
          badge="Deployment"
          icon={<Box className="w-5 h-5" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-36 font-mono text-xs text-zinc-400">
            {/* Cluster Stats */}
            <div className="bg-charcoal/90 border border-white/5 rounded-lg p-3 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted uppercase tracking-wider font-bold">VPS Resource Telemetry</span>
                <Server className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>CPU LOAD</span>
                    <span className="text-white">14.8%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent h-full w-[14.8%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>RAM USAGE</span>
                    <span className="text-white">3.12 GB / 8.0 GB</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-success h-full w-[39%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Container Health */}
            <div className="bg-charcoal/90 border border-white/5 rounded-lg p-3 flex flex-col justify-between gap-1.5">
              <div className="text-[10px] text-muted uppercase tracking-wider font-bold">Dokploy Application Status</div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span>friday-showcase:</span>
                  <span className="text-success font-bold">RUNNING</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span>postgres-db:</span>
                  <span className="text-success font-bold">HEALTHY</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span>n8n-runner:</span>
                  <span className="text-success font-bold">ONLINE</span>
                </div>
              </div>
              <div className="text-[10px] text-muted text-right">App ID: cy81rmmWPGy...</div>
            </div>
          </div>
        </ModuleCard>
      </div>
    </section>
  );
};

