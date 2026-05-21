import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Terminal, 
  GitBranch, 
  Database, 
  Activity, 
  Workflow, 
  FileText, 
  Code,
  ArrowUpRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

type ProjectStatus = 'active' | 'completed' | 'blocked';

type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  statusText: string;
  icon: React.ReactNode;
  accomplishments: string[];
  link?: string;
  linkLabel?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'agentic-wiki',
    name: 'Agentic Wiki & Pulse System',
    category: 'System Core',
    description: 'Centralized System of Record operating on the ICM framework, synchronizing user directives and calendar/email signals.',
    status: 'active',
    statusText: 'Synchronized & Operational',
    icon: <GitBranch className="w-5 h-5" />,
    accomplishments: [
      'Established Morning_Briefing_Template.md structure.',
      'Configured 06:00 AM EDT proactive trigger for automated briefings.',
      'Implemented Todoist Shadow Map Sync Engine (todoist-shadow-map.json) to auto-close [x] tasks.',
      'Enforced automated Git commit & push protocols for constant sync.'
    ]
  },
  {
    id: 'paperclip-extension',
    name: 'Paperclip VS Code Extension',
    category: 'Developer Tools',
    description: 'Context-aware VS Code extension and sidebar facilitating direct cloud workspace orchestration.',
    status: 'completed',
    statusText: 'Release packaged (v0.4.0)',
    icon: <Layers className="w-5 h-5" />,
    accomplishments: [
      'Purged historical obsidian-paperclip duplicates and consolidated code.',
      'Resolved workspace cwd warning to stabilize runtime environment.',
      'Validated code health with compiler checks and 63 unit tests.',
      'Packaged and compiled paperclip-extension-0.4.0.vsix installer.'
    ]
  },
  {
    id: 'agency-agents',
    name: 'Agency Agents ("Special Forces")',
    category: 'Autonomous Agents',
    description: 'High-scale enterprise agentic workforce running on the Paperclip database.',
    status: 'active',
    statusText: 'Deployment Seeded',
    icon: <Database className="w-5 h-5" />,
    accomplishments: [
      'Pruned roster from 167 down to 108 highly-specialized agents.',
      'Implemented 8-Team structure (max 15 agents/team) covering platforms, creative, systems, operations.',
      'Migrated all agent profiles to Paperclip database.',
      'Assigned company onboarding tasks to the Paperclip CEO agent.'
    ]
  },
  {
    id: 'assistant-app',
    name: 'React/Vite Assistant App',
    category: 'Web Applications',
    description: 'Brutalist-themed landing page and local simulation tool developed for Craigslist EPA listing.',
    status: 'completed',
    statusText: 'Deployed live to Netlify',
    icon: <Code className="w-5 h-5" />,
    accomplishments: [
      'Scaffolded React + Vite project in /root/dev/assistant-app.',
      'Designed premium Brutalist Signal theme with GSAP micro-animations.',
      'Retrieved Tony Myers resume details via GWS CLI and populated layout.',
      'Deployed production build to Netlify.'
    ],
    link: 'https://alex-assistant-c6f9.netlify.app',
    linkLabel: 'Launch Live Site'
  },
  {
    id: 'exobrain-recall',
    name: 'Exobrain & Recall.it Integration',
    category: 'Knowledge Graph',
    description: 'Deep knowledge retrieval integration serving as the memory layer for the Exobrain.',
    status: 'active',
    statusText: 'Ingestion Active',
    icon: <Activity className="w-5 h-5" />,
    accomplishments: [
      'Corrected service attribution between Recall.it (memory) and Recall.ai (bots).',
      'Configured remote SSE endpoint in mcp_config.json.',
      'Conducted credential audit verifying secure usage of API key.',
      'Scaffolded ingestion strategy for the rss-wisdom-collector.'
    ]
  },
  {
    id: 'icm-tree',
    name: 'ICM Tree Factory Architecture',
    category: 'System Core',
    description: 'Structural mapping of CRM records ("Sales Floor") to compilation systems ("Factory").',
    status: 'active',
    statusText: 'Validating Logic',
    icon: <Workflow className="w-5 h-5" />,
    accomplishments: [
      'Completed deep-dive mapping of icm-tree staging/silo logic.',
      'Created workflow blueprint diagram in 5xcal.excalidraw.',
      'Validated client onboard, preflight, activation, and completion scripts.'
    ]
  },
  {
    id: 'wotai-cms',
    name: 'Wotai CMS Reverse Engineering',
    category: 'Research & Strategy',
    description: 'Framework analysis and backend replication roadmap for wotai.co/blog.',
    status: 'completed',
    statusText: 'Blueprint Delivered',
    icon: <FileText className="w-5 h-5" />,
    accomplishments: [
      'Reverse-engineered framework, CMS, and styles on wotai.co/blog.',
      'Designed complete content replication strategy.'
    ]
  },
  {
    id: 'n8n-automation',
    name: 'n8n Ingestion Workflows',
    category: 'Workflow Automation',
    description: 'Automated briefing scheduler and Slack/Google Docs webhook handlers.',
    status: 'blocked',
    statusText: 'OAuth Action Required',
    icon: <Terminal className="w-5 h-5" />,
    accomplishments: [
      'Repaired automated "Morning Briefing" scheduler in n8n UI.',
      'Configured Slack/Google callback hooks in backend database.',
      'Blocked on manual OAuth authorization in the local n8n interface.'
    ]
  },
  {
    id: 'withings-health',
    name: 'Withings Health Integration',
    category: 'Workflow Automation',
    description: 'Wearable and scale health data automated ingestion pipeline.',
    status: 'blocked',
    statusText: 'Scope Friction (Blocked)',
    icon: <AlertCircle className="w-5 h-5" />,
    accomplishments: [
      'Verified withings-callback redirect endpoint in n8n cluster.',
      'Encountered "scope not allowed" developer app permissions barrier.',
      'Temporarily suspended integration pending account scope adjustments.'
    ]
  }
];

export const ActiveProjects = () => {
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.status === filter);

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto border-t border-white/5 bg-background relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-2 block">
            System Operations
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance">
            Orchestration Pipeline
          </h2>
          <p className="text-muted text-lg max-w-2xl font-mono text-sm leading-relaxed">
            Live telemetry and operational status across all active codebases, agent deployments, and workflows compiled directly from today's pulse.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 bg-charcoal p-1.5 rounded-2xl border border-white/5 self-start md:self-auto font-mono text-xs">
          {(['all', 'active', 'completed', 'blocked'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                setActiveCard(null);
              }}
              className={cn(
                "px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-200",
                filter === type 
                  ? "bg-accent text-white shadow-[0_0_15px_rgba(0,162,255,0.3)]" 
                  : "text-muted hover:text-foreground hover:bg-card"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => setActiveCard(activeCard === project.id ? null : project.id)}
              className={cn(
                "group relative p-8 rounded-[2rem] bg-card border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.3)]",
                activeCard === project.id
                  ? "border-accent/80 bg-card shadow-[0_0_30px_rgba(0,162,255,0.1)] md:col-span-2 lg:col-span-3"
                  : "border-white/5 hover:border-accent/40 hover:bg-charcoal/30"
              )}
            >
              {/* Background Dots on Card */}
              <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
              
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted bg-charcoal border border-white/5 px-2.5 py-1 rounded-md">
                    {project.category}
                  </span>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {project.status === 'completed' && (
                      <span className="flex items-center gap-1.5 text-success font-bold bg-success/10 border border-success/20 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        Completed
                      </span>
                    )}
                    {project.status === 'active' && (
                      <span className="flex items-center gap-1.5 text-accent font-bold bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
                        Active
                      </span>
                    )}
                    {project.status === 'blocked' && (
                      <span className="flex items-center gap-1.5 text-error font-bold bg-error/10 border border-error/20 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                        Blocked
                      </span>
                    )}
                  </div>
                </div>
 
                {/* Content */}
                <div className="flex gap-5 items-start mb-4 relative z-10">
                  <div className={cn(
                    "p-3.5 rounded-2xl flex items-center justify-center shrink-0 border",
                    project.status === 'completed' ? "bg-success/5 text-success border-success/10" :
                    project.status === 'active' ? "bg-accent/5 text-accent border-accent/10" :
                    "bg-error/5 text-error border-error/10"
                  )}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-accent transition-colors flex items-center gap-2">
                      {project.name}
                      {activeCard !== project.id && (
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-muted" />
                      )}
                    </h3>
                    <p className="text-muted text-sm mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expandable accomplishments */}
              <AnimatePresence>
                {activeCard === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/5 pt-6 mt-6 overflow-hidden relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-4">Operational Achievements</h4>
                        <ul className="space-y-3 font-mono text-xs">
                          {project.accomplishments.map((acc, index) => (
                            <li key={index} className="flex gap-3 text-zinc-300 leading-relaxed">
                              <span className="text-accent font-bold shrink-0 mt-0.5">&gt;&gt;</span>
                              <span>{acc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">Pipeline Registry</h4>
                          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 font-mono text-xs text-zinc-400 space-y-2.5">
                            <p><span className="text-accent font-bold">registry_id:</span> {project.id}</p>
                            <p><span className="text-accent font-bold">agent_state:</span> {project.statusText}</p>
                            <p><span className="text-accent font-bold">priority:</span> {project.status === 'blocked' ? 'HIGH' : 'NORMAL'}</p>
                          </div>
                        </div>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-6 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 font-mono shadow-[0_4px_15px_rgba(0,162,255,0.2)] hover:shadow-[0_4px_25px_rgba(0,162,255,0.3)] hover:scale-[1.02]"
                          >
                            {project.linkLabel || 'View Details'}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Small "click to view detail" hint */}
              {activeCard !== project.id && (
                <div className="text-[10px] font-mono text-muted/50 mt-4 group-hover:text-muted/80 transition-colors">
                  [Click to expand telemetry logs]
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
