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
      "group relative p-8 bg-charcoal border-2 border-foreground hover:bg-background transition-all duration-200 overflow-hidden flex flex-col justify-between",
      className
    )}
  >
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-14 h-14 bg-background border-2 border-foreground flex items-center justify-center text-foreground group-hover:scale-105 transition-transform duration-200">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-background bg-foreground px-3 py-1.5">
            {badge}
          </span>
        )}
      </div>

      {/* Main Info */}
      <h3 className="text-3xl font-black tracking-tight text-foreground mb-4 uppercase">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-8 font-mono uppercase tracking-wider">
        {description}
      </p>
    </div>

    {/* Custom Widget Slot */}
    {children && (
      <div className="relative mt-auto w-full border-t-2 border-foreground pt-8 bg-transparent overflow-hidden">
        {children}
      </div>
    )}
  </motion.div>
);

export const BentoEcosystem = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto bg-background">
      <div className="text-center mb-24 relative">
        <span className="text-xs font-bold uppercase tracking-widest text-background bg-accent px-4 py-2 mb-6 inline-block">
          MODULAR OPERATIONS
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 uppercase">
          System Ecosystem
        </h2>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto font-mono uppercase tracking-widest">
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
          icon={<Layers className="w-6 h-6" />}
        >
          <div className="flex gap-4 items-stretch h-40 font-mono text-xs text-foreground select-none">
            {/* Sidebar View */}
            <div className="w-1/3 bg-background border-2 border-foreground p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[10px] text-muted uppercase tracking-widest font-bold mb-2">EXPLORER</div>
                <div className="flex items-center gap-2 text-accent"><ChevronRight className="w-4 h-4" /> src/</div>
                <div className="flex items-center gap-2 pl-4 text-success"><span className="w-2 h-2 bg-success"></span> App.tsx</div>
                <div className="flex items-center gap-2 pl-4"><span className="w-2 h-2 bg-muted"></span> index.css</div>
                <div className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /> package.json</div>
              </div>
              <div className="text-[10px] text-success font-bold flex items-center gap-2 uppercase tracking-widest">
                <span className="w-2 h-2 bg-success animate-ping"></span>
                v0.4.0 ACTIVE
              </div>
            </div>
            
            {/* Integrated Terminal View */}
            <div className="flex-1 bg-charcoal border-2 border-foreground p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2">
                <div className="text-muted text-[10px] uppercase tracking-widest mb-2 border-b-2 border-foreground pb-2">TERMINAL — paperclip-extension</div>
                <div className="text-foreground font-bold">$ npm run compile</div>
                <div className="text-success">&gt; tsc --noEmit [SUCCESS]</div>
                <div className="text-foreground font-bold">$ npm run test</div>
                <div className="text-muted">✓ 63 specs passed (1.42s)</div>
              </div>
              <div className="text-[10px] text-accent font-bold uppercase tracking-widest pt-2 border-t-2 border-foreground">RELEASE READY: 0.4.0.vsix</div>
            </div>
          </div>
        </ModuleCard>

        {/* SNAP Worker Card */}
        <ModuleCard
          title="SNAP Worker"
          description="High-velocity asynchronous execution loop for background actions and database state sync."
          badge="Core Runtime"
          icon={<CpuIcon className="w-6 h-6" />}
        >
          <div className="h-40 flex flex-col justify-between font-mono text-xs">
            <div className="flex justify-between items-center text-muted mb-4 border-b-2 border-foreground pb-2 uppercase tracking-widest font-bold text-[10px]">
              <span>WORKER STATE</span>
              <span className="text-success flex items-center gap-2">
                <span className="w-2 h-2 bg-success animate-pulse" />
                ONLINE
              </span>
            </div>
            
            {/* Task list simulation */}
            <div className="space-y-3 flex-grow uppercase tracking-wider">
              <div className="bg-background border-2 border-foreground p-3 flex justify-between items-center">
                <span className="truncate font-bold">Ingest RSS</span>
                <span className="text-[10px] text-background bg-success px-2 py-1 font-bold">100%</span>
              </div>
              <div className="bg-background border-2 border-foreground p-3 flex justify-between items-center">
                <span className="truncate font-bold">Shadow Sync</span>
                <span className="text-[10px] text-background bg-accent px-2 py-1 font-bold animate-pulse">SYNCING</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-[10px] text-muted uppercase tracking-widest font-bold pt-2 border-t-2 border-foreground">
              <Activity className="w-4 h-4 text-accent" />
              <span>0 PENDING / 4,201 TOTAL</span>
            </div>
          </div>
        </ModuleCard>

        {/* The Vault Card */}
        <ModuleCard
          title="The Vault"
          description="Strictly segmented contextual key vault ensuring API credential insulation and secure SSE handshakes."
          badge="Security Vault"
          icon={<ShieldCheck className="w-6 h-6" />}
        >
          <div className="h-40 flex flex-col justify-between font-mono text-xs">
            <div className="flex items-center justify-between text-muted mb-4 border-b-2 border-foreground pb-2 uppercase tracking-widest font-bold text-[10px]">
              <span>KEY VAULT SEGMENT</span>
              <Lock className="w-4 h-4 text-accent" />
            </div>

            <div className="space-y-3 my-2 uppercase tracking-wider font-bold">
              <div className="flex flex-col gap-1">
                <span className="text-muted text-[10px]">SSE_ENDPOINT:</span>
                <span className="text-accent truncate">backend.getrecall.ai</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted text-[10px]">API_KEY:</span>
                <span className="text-success truncate">••••••••••••sk_live</span>
              </div>
              <div className="flex flex-col gap-1 border-t-2 border-foreground pt-2">
                <span className="text-muted text-[10px]">AUTHENTICATION:</span>
                <span className="text-success">VERIFIED</span>
              </div>
            </div>
          </div>
        </ModuleCard>

        {/* HostVPS Card */}
        <ModuleCard
          className="md:col-span-2"
          title="HostVPS Cluster"
          description="Ubuntu-based hosting architecture featuring automatic container deployments, reverse proxies, and health telemetry."
          badge="Deployment"
          icon={<Box className="w-6 h-6" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto sm:h-40 font-mono text-xs text-foreground uppercase tracking-wider">
            {/* Cluster Stats */}
            <div className="bg-background border-2 border-foreground p-4 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between border-b-2 border-foreground pb-2">
                <span className="text-[10px] text-muted font-bold tracking-widest">VPS TELEMETRY</span>
                <Server className="w-4 h-4 text-accent" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-2">
                    <span>CPU LOAD</span>
                    <span className="text-foreground">14.8%</span>
                  </div>
                  <div className="w-full bg-charcoal h-2 border border-foreground p-[1px]">
                    <div className="bg-accent h-full w-[14.8%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-2">
                    <span>RAM USAGE</span>
                    <span className="text-foreground">3.12 GB / 8.0 GB</span>
                  </div>
                  <div className="w-full bg-charcoal h-2 border border-foreground p-[1px]">
                    <div className="bg-success h-full w-[39%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Container Health */}
            <div className="bg-charcoal border-2 border-foreground p-4 flex flex-col justify-between gap-2">
              <div className="text-[10px] text-muted font-bold tracking-widest border-b-2 border-foreground pb-2 mb-2">DOKPLOY STATUS</div>
              <div className="space-y-3 font-bold">
                <div className="flex justify-between items-center text-[10px]">
                  <span>friday-showcase:</span>
                  <span className="text-background bg-success px-2 py-1">RUNNING</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span>postgres-db:</span>
                  <span className="text-background bg-success px-2 py-1">HEALTHY</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span>n8n-runner:</span>
                  <span className="text-background bg-success px-2 py-1">ONLINE</span>
                </div>
              </div>
              <div className="text-[10px] text-muted text-right mt-2 border-t-2 border-foreground pt-2">APP ID: CY81RMMW...</div>
            </div>
          </div>
        </ModuleCard>
      </div>
    </section>
  );
};
