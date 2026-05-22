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
  Cpu,
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
  github?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'agentic-wiki',
    name: 'Business Operations Hub',
    category: 'Core Operations',
    description: 'A central system of record that takes business plans, schedules, and incoming signals, organizing them into clear tasks for the team.',
    status: 'active',
    statusText: 'Fully Operational',
    icon: <GitBranch className="w-5 h-5" />,
    accomplishments: [
      'Created a daily morning briefing system to summarize team tasks.',
      'Automated daily planner updates to eliminate manual logging.',
      'Configured automatic backups to keep all logs and files secure.'
    ],
    github: 'https://github.com/txmyer-dev/agentic-wiki'
  },
  {
    id: 'paperclip-extension',
    name: 'Workspace Co-Pilot',
    category: 'Productivity Tools',
    description: 'A custom sidebar tool that integrates tasks, file organization, and deployment updates directly into the team\'s main workspace.',
    status: 'completed',
    statusText: 'Release Packaged (v0.4.0)',
    icon: <Layers className="w-5 h-5" />,
    accomplishments: [
      'Cleaned up workspace clutter for faster startup times.',
      'Tested and packaged the tool for simple, one-click installation.',
      'Stabilized database connections to prevent app slow-downs.'
    ],
    github: 'https://github.com/txmyer-dev/paperclip-extension'
  },
  {
    id: 'agency-agents',
    name: 'Specialized AI Workforce',
    category: 'AI Workforce',
    description: 'A network of digital assistants trained to handle client support, media creation, strategy, and operations.',
    status: 'active',
    statusText: 'Active & Onboarding',
    icon: <Database className="w-5 h-5" />,
    accomplishments: [
      'Reorganized the workforce into 8 specialized teams (Support, Legal, Marketing, etc.).',
      'Streamlined the roster from 167 assistants down to 108 high-performing agents.',
      'Successfully uploaded all assistant profiles to the secure company database.'
    ]
  },
  {
    id: 'assistant-app',
    name: 'Executive Client Portal',
    category: 'Client Platforms',
    description: 'A high-performance portal created to present professional milestones, resumes, and automated portfolios.',
    status: 'completed',
    statusText: 'Published Live',
    icon: <Code className="w-5 h-5" />,
    accomplishments: [
      'Designed and built a modern, smooth web design with quick page loads.',
      'Integrated verified professional experience and career highlights.',
      'Successfully published the website live to cloud hosting.'
    ],
    link: 'https://alex-assistant-c6f9.netlify.app',
    linkLabel: 'Launch Portal'
  },
  {
    id: 'friday-showcase',
    name: 'Operations Showcase Website',
    category: 'Client Platforms',
    description: 'This interactive portal showcasing automated systems, project portfolios, and real-time telemetry widgets.',
    status: 'completed',
    statusText: 'Published Live',
    icon: <Cpu className="w-5 h-5" />,
    accomplishments: [
      'Built a premium Brutalist/Cyberpunk dark aesthetic design.',
      'Designed custom telemetry layouts for system performance displays.',
      'Removed developer-focused terminal simulation to streamline business value.',
      'Configured automated deployment via Dokploy workflows.'
    ],
    link: 'https://friday.felaniam.cloud',
    linkLabel: 'Launch Showcase',
    github: 'https://github.com/txmyer-dev/friday-showcase'
  },
  {
    id: 'exobrain-recall',
    name: 'Smart Knowledge Base',
    category: 'Knowledge Systems',
    description: 'A long-term memory engine that indexes research, articles, and past decisions for instant recall by the team.',
    status: 'active',
    statusText: 'Memory Feed Active',
    icon: <Activity className="w-5 h-5" />,
    accomplishments: [
      'Separated knowledge searches from meeting automation to improve search speeds.',
      'Secured main configuration settings and credentials.',
      'Scaffolded automated feeds to read and save industry news daily.'
    ]
  },
  {
    id: 'icm-tree',
    name: 'Client Onboarding Pipeline',
    category: 'Core Operations',
    description: 'A structured system that automatically configures client databases and records when they register.',
    status: 'active',
    statusText: 'Testing Logic',
    icon: <Workflow className="w-5 h-5" />,
    accomplishments: [
      'Completed a full design map showing how a client moves from sign-up to launch.',
      'Designed a blueprint diagram of the customer setup workflow.',
      'Successfully tested the automated setup scripts.'
    ]
  },
  {
    id: 'wotai-cms',
    name: 'CMS Integration Strategy',
    category: 'Strategy & Consulting',
    description: 'A strategic plan to optimize website structure and content management systems to match modern marketing blogs.',
    status: 'completed',
    statusText: 'Strategy Delivered',
    icon: <FileText className="w-5 h-5" />,
    accomplishments: [
      'Deconstructed formatting, styling, and speeds of top-tier websites.',
      'Created a comprehensive blueprint to replicate high-speed publishing.'
    ]
  },
  {
    id: 'n8n-automation',
    name: 'Communication Automations',
    category: 'Automations',
    description: 'Workflows that automatically send scheduled reports, summaries, and notifications to Slack and Google Docs.',
    status: 'blocked',
    statusText: 'Awaiting Authorization',
    icon: <Terminal className="w-5 h-5" />,
    accomplishments: [
      'Repaired automated briefing schedulers.',
      'Set up webhook endpoints to post directly to Slack.',
      'Currently waiting for manual login authorization in the Slack panel.'
    ]
  },
  {
    id: 'withings-health',
    name: 'Fitness & Sleep Tracker',
    category: 'Automations',
    description: 'An automated flow to sync steps, sleep data, and wellness indicators into the team logging systems.',
    status: 'blocked',
    statusText: 'Pending App Permission',
    icon: <AlertCircle className="w-5 h-5" />,
    accomplishments: [
      'Configured secure callback links.',
      'Encountered a third-party app permission error during setup.',
      'Temporarily paused pending developer credentials review.'
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
            Active Projects
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance">
            Project Portfolio
          </h2>
          <p className="text-muted text-lg max-w-2xl font-mono text-sm leading-relaxed">
            A live view of our current projects, completed milestones, and active initiatives, kept up-to-date in real-time.
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
              {type === 'all' ? 'all' : type === 'active' ? 'in progress' : type === 'completed' ? 'completed' : 'on hold'}
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
                        In Progress
                      </span>
                    )}
                    {project.status === 'blocked' && (
                      <span className="flex items-center gap-1.5 text-error font-bold bg-error/10 border border-error/20 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                        On Hold
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
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-4">Key Accomplishments</h4>
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
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">Project Details</h4>
                          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 font-mono text-xs text-zinc-400 space-y-2.5">
                            <p><span className="text-accent font-bold">Project ID:</span> {project.id}</p>
                            <p><span className="text-accent font-bold">Current Status:</span> {project.statusText}</p>
                            <p><span className="text-accent font-bold">Priority:</span> {project.status === 'blocked' ? 'HIGH' : 'NORMAL'}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-black/80 border border-white/10 hover:border-accent/40 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 font-mono shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                              Repository
                            </a>
                          )}

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 font-mono shadow-[0_4px_15px_rgba(0,162,255,0.2)] hover:shadow-[0_4px_25px_rgba(0,162,255,0.3)] hover:scale-[1.02]"
                            >
                              {project.linkLabel || 'View Details'}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Small "click to view detail" hint */}
              {activeCard !== project.id && (
                <div className="text-[10px] font-mono text-muted/50 mt-4 group-hover:text-muted/80 transition-colors">
                  [Click to view accomplishments & details]
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
