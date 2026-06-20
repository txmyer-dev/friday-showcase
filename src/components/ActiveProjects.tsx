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
  AlertCircle,
  Mic,
  Server,
  Play
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
    status: 'completed',
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
    statusText: 'In Progress',
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
    status: 'active',
    statusText: 'In Progress',
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
    status: 'completed',
    statusText: 'Completed',
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
    statusText: 'In Progress',
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
    status: 'completed',
    statusText: 'Completed',
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
    status: 'completed',
    statusText: 'Completed',
    icon: <AlertCircle className="w-5 h-5" />,
    accomplishments: [
      'Configured secure callback links.',
      'Encountered a third-party app permission error during setup.',
      'Temporarily paused pending developer credentials review.'
    ]
  },
  {
    id: 'pocket-scribe',
    name: 'pocketScribe (Voice Pipeline)',
    category: 'Voice Automation',
    description: 'An automated audio-to-text pipeline that processes voice recordings, runs diarization, and syncs meeting transcripts directly to Notion and Slack.',
    status: 'completed',
    statusText: 'Production Deployed',
    icon: <Mic className="w-5 h-5" />,
    accomplishments: [
      'Collapsed entire diarization subsystem into a single Deepgram API call, reducing code size by 49%.',
      'Created notion_sync.py to read meeting notes from Notion and write transcripts to Notion databases.',
      'Containerized and successfully deployed pocketScribe to Google Cloud Run with Secret Manager integrations.',
      'Configured Syncthing and local_uploader.py watchdog service for automatic audio forwarding from mobile devices.'
    ],
    github: 'https://github.com/txmyer-dev/pocket-scribe'
  },
  {
    id: 'command-centre',
    name: 'Command Centre Dashboard',
    category: 'Core Operations',
    description: 'A premium Next.js dashboard template that tracks daily briefings, system telemetry, and agent communication logs in real-time.',
    status: 'completed',
    statusText: 'Service Active (legion.felani.am)',
    icon: <Server className="w-5 h-5" />,
    accomplishments: [
      'Reorganized repository structure, normalized casing, and aligned specialist agent grounding paths.',
      'Deployed Next.js Command Centre as a background systemd service running on port 9685, mapped via Traefik.',
      'Upgraded briefings to a premium dashboard layout featuring dynamic markdown rendering, yesterday\'s momentum, and telemetry cards.'
    ],
    link: 'https://legion.felani.am',
    linkLabel: 'Launch Dashboard',
    github: 'https://github.com/txmyer-dev/chief-of-staff'
  },
  {
    id: 'so-what-engine',
    name: 'SO-WHAT Engine',
    category: 'Knowledge Systems',
    description: 'A strategic alignment system that links agent goals with high-leverage tasks using the Skill("StrategicAlignment") core logic.',
    status: 'completed',
    statusText: 'Completed',
    icon: <Workflow className="w-5 h-5" />,
    accomplishments: [
      'Captured SO-WHAT core engine requirements in 03-SYSTEM/SO-WHAT-Requirements.md.',
      'Configured and registered GBrain and Graphify MCP servers directly in Hermes\' configurations to enable context-aware queries.',
      'Cleaned up Obsidian vault metadata recursively and purged redundant tid strings.'
    ]
  },
  {
    id: 'schola-umbra',
    name: 'Schola Umbra Prototype',
    category: 'Game Development',
    description: 'A Godot 4 game prototype featuring custom scripting architectures, NPC behavior nodes, and automated test runners.',
    status: 'completed',
    statusText: 'Prototype Validated',
    icon: <Play className="w-5 h-5" />,
    accomplishments: [
      'Compiled complete PRD and implementation plans from historical chat logs.',
      'Created core script architectures including WorldManager.gd, BaseMap.gd, Player.gd, NPCChild.gd, and TestRunner.gd.',
      'Performed static code validation to ensure syntax and indentation integrity.'
    ]
  },
  {
    id: 'icm-architect',
    name: 'ICM-Architect Pipeline',
    category: 'Core Operations',
    description: 'A structured 7-stage ICM pipeline with stage contracts, plans, transition autonomy protocols, and orchestration scripts.',
    status: 'active',
    statusText: 'In Progress',
    icon: <Layers className="w-5 h-5" />,
    accomplishments: [
      'Installed the ICM-Architect skill and verified structured parser workflows on dev briefs.',
      'Scaffolded a 7-stage ICM pipeline under /root/dev/icm-test/ with CONTEXT.md and PLAN.md contracts.',
      'Designed stage transition autonomy protocols and created icm_status.py / icm_runner.py orchestration tools.',
      'Mapped synergy and pipeline workflows for ce-* skills under /root/dev/ce-workflow-pipeline/.'
    ]
  },
  {
    id: 'craigslist-portal',
    name: 'Craigslist Assistant Portal',
    category: 'Client Platforms',
    description: 'An interactive accessibility-focused website featuring dictation formatting simulators and workspace explorers.',
    status: 'completed',
    statusText: 'Published Live',
    icon: <Code className="w-5 h-5" />,
    accomplishments: [
      'Designed and developed the Craigslist Online Assistant website in /root/dev/apex/website/ with custom accessibility panels.',
      'Redesigned and polished the landing page using Preset C (Brutalist Signal) and Preset B (Midnight Luxe) styles.',
      'Deployed the live site to Netlify at https://craigslist-assistant-res-f7c0545b.netlify.app.'
    ],
    link: 'https://craigslist-assistant-res-f7c0545b.netlify.app',
    linkLabel: 'Launch Portal'
  },
  {
    id: 'slack-bot-freellm',
    name: 'Slack Bot & FreeLLMAPI',
    category: 'Automations',
    description: 'An integration layer that connects Slack Bolt communication pipelines with a unified FreeLLMAPI provider pool.',
    status: 'completed',
    statusText: 'Completed',
    icon: <Terminal className="w-5 h-5" />,
    accomplishments: [
      'Deployed FreeLLMAPI with 5 LLM provider keys as a persisted systemd service running on port 3001.',
      'Configured Slack Bolt integration requirements and added Slack credentials to configuration parser.',
      'Created private GitHub repository txmyer-dev/slack-bot and verified initial code sync.'
    ],
    github: 'https://github.com/txmyer-dev/slack-bot'
  }
];

export const ActiveProjects = () => {
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.status === filter);

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto bg-background relative">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-background bg-accent px-3 py-1 mb-4 inline-block">
            ACTIVE PROJECTS
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-balance uppercase">
            Project Portfolio
          </h2>
          <p className="text-muted text-lg max-w-2xl font-mono text-sm leading-relaxed uppercase tracking-wider">
            A live view of our current projects, completed milestones, and active initiatives, kept up-to-date in real-time.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap border-2 border-foreground self-start md:self-auto font-mono text-xs bg-charcoal">
          {(['all', 'active', 'completed', 'blocked'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                setActiveCard(null);
              }}
              className={cn(
                "px-6 py-3 font-bold uppercase tracking-widest transition-all duration-200 border-r-2 border-foreground last:border-r-0",
                filter === type 
                  ? "bg-accent text-background" 
                  : "text-foreground hover:bg-foreground hover:text-background"
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
              onClick={() => setActiveCard(activeCard === project.id ? null : project.id)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={cn(
                "group relative p-8 bg-charcoal border-2 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between",
                activeCard === project.id
                  ? "border-accent md:col-span-2 lg:col-span-3 bg-background"
                  : "border-foreground hover:border-accent hover:bg-background"
              )}
            >
              
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-background bg-foreground px-3 py-1.5">
                    {project.category}
                  </span>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest border-2 border-foreground px-3 py-1">
                    {project.status === 'completed' && (
                      <span className="flex items-center gap-2 text-success">
                        <span className="w-1.5 h-1.5 bg-success"></span>
                        COMPLETED
                      </span>
                    )}
                    {project.status === 'active' && (
                      <span className="flex items-center gap-2 text-accent">
                        <span className="w-1.5 h-1.5 bg-accent animate-pulse"></span>
                        IN PROGRESS
                      </span>
                    )}
                    {project.status === 'blocked' && (
                      <span className="flex items-center gap-2 text-error">
                        <span className="w-1.5 h-1.5 bg-error"></span>
                        ON HOLD
                      </span>
                    )}
                  </div>
                </div>
 
                {/* Content */}
                <div className="flex gap-5 items-start mb-4 relative z-10">
                  <div className={cn(
                    "p-4 flex items-center justify-center shrink-0 border-2 border-foreground",
                    project.status === 'completed' ? "bg-background text-success" :
                    project.status === 'active' ? "bg-background text-accent" :
                    "bg-background text-error"
                  )}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight text-foreground uppercase flex items-center gap-3">
                      {project.name}
                      {activeCard !== project.id && (
                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-accent" />
                      )}
                    </h3>
                    <p className="text-muted text-sm mt-3 font-mono leading-relaxed uppercase tracking-widest">
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
                    className="border-t-2 border-foreground pt-8 mt-8 overflow-hidden relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-background bg-foreground px-3 py-1 mb-6 inline-block">KEY ACCOMPLISHMENTS</h4>
                        <ul className="space-y-4 font-mono text-xs">
                          {project.accomplishments.map((acc, index) => (
                            <li key={index} className="flex gap-4 text-foreground leading-relaxed uppercase tracking-wider">
                              <span className="text-accent font-bold shrink-0 mt-0.5">&gt;&gt;</span>
                              <span>{acc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="space-y-6">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-background bg-foreground px-3 py-1 inline-block">PROJECT DETAILS</h4>
                          <div className="p-6 border-2 border-foreground font-mono text-xs text-muted space-y-4 bg-background uppercase tracking-widest">
                            <p><span className="text-foreground font-bold">PROJECT ID:</span> {project.id}</p>
                            <p><span className="text-foreground font-bold">CURRENT STATUS:</span> {project.statusText}</p>
                            <p><span className="text-foreground font-bold">PRIORITY:</span> {project.status === 'blocked' ? 'HIGH' : 'NORMAL'}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-foreground hover:bg-foreground hover:text-background text-foreground font-bold px-8 py-4 text-xs uppercase tracking-widest transition-all duration-200 font-mono"
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                              REPOSITORY
                            </a>
                          )}

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center gap-3 bg-accent border-2 border-accent hover:border-foreground hover:bg-foreground text-background hover:text-background font-bold px-8 py-4 text-xs uppercase tracking-widest transition-all duration-200 font-mono"
                            >
                              {project.linkLabel || 'VIEW DETAILS'}
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
