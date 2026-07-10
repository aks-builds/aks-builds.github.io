export interface CaseStudy {
  slug: string;
  name: string;
  oneLiner: string;
  tags: string[];
  stack: string[];
  problem: string;
  architecture: string;
  decisions: string[];
  impact: string;
  impactStat?: { value: number; suffix: string; label: string };
  liveUrl?: string;
  githubUrl: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "agentsave",
    name: "AgentSave",
    oneLiner: "A 4-service AI-agent efficiency platform — benchmarked ~30% lower token cost in testing.",
    tags: ["FastAPI", "Next.js", "vLLM", "Docker"],
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Recharts", "Playwright", "Docker", "vLLM"],
    problem:
      "Agent frameworks (LangChain, AutoGen, CrewAI, LangGraph, Smolagents) tend to feed a growing, mostly-irrelevant context window into every LLM call, and keep running turns past the point a task is already resolved. Both waste tokens without improving output quality.",
    architecture:
      "Split across four repositories: an open-source core (LLM-free context filter + early-exit supervisor), a self-hosted dashboard backend (FastAPI + SQLite, offline JWT licensing, zero cloud calls), a Next.js/TypeScript dashboard UI for real-time cost visibility, and a Docker sidecar (InferRoute) that classifies prompt-processing-duration turns and routes them to the right vLLM backend.",
    decisions: [
      "Kept the context filter LLM-free — a second model call to decide what to prune would erase the savings it's meant to create.",
      "Self-hosted the dashboard with offline JWT licensing instead of a cloud service, so teams can adopt it without a new vendor dependency.",
      "Shipped InferRoute as a sidecar rather than a library, so it works regardless of which agent framework a team already runs.",
    ],
    impact:
      "Benchmarked ~30% lower token cost in testing with no observed accuracy loss, and ~68% TTFT reduction from the PPD turn-classifier + provider router in InferRoute. These are project-level benchmarks, not numbers from a production deployment.",
    impactStat: { value: 30, suffix: "%", label: "lower token cost (benchmarked)" },
    githubUrl: "https://github.com/aks-builds/agentsave",
  },
  {
    slug: "ai-test-failure-analyzer",
    name: "AI Test Failure Analyzer",
    oneLiner: "A 10-phase root-cause pipeline for test failures, exposed as an MCP server, CLI, and streaming web UI.",
    tags: ["Python", "MCP", "CLI"],
    stack: ["Python", "MCP", "Playwright", "Jest", "Cypress", "pytest", "Go", "RSpec"],
    problem:
      "A failing test tells you it failed, not why. Triaging a flaky or broken test usually means manually cross-referencing the stack trace, recent commits, logs, and config — the exact work this tool automates.",
    architecture:
      "An 8-to-10-phase evidence pipeline that scans git history, application logs, and config alongside the failure itself, producing confidence-scored root-cause hypotheses instead of a single guess. Exposed three ways — as an MCP server for agent workflows, a CLI for local/CI use, and a streaming web UI for watching the pipeline reason in real time.",
    decisions: [
      "Confidence-scored hypotheses instead of a single verdict — root-causing test failures is inherently uncertain, and a tool that pretends otherwise erodes trust the first time it's wrong.",
      "Framework-agnostic by design — supports 24 frameworks (Playwright, Jest, Cypress, pytest, Go, RSpec, CTRF, SARIF and more) so it isn't locked to one team's stack.",
      "MCP-first exposure, so agentic coding tools can call it directly instead of parsing CLI output.",
    ],
    impact:
      "Published to npm and installable today; real (non-zero) monthly download activity on the registry.",
    impactStat: { value: 24, suffix: "", label: "test frameworks supported" },
    liveUrl: "https://www.npmjs.com/package/ai-test-failure-analyzer",
    githubUrl: "https://github.com/aks-builds/ai-test-failure-analyzer",
  },
  {
    slug: "quality-skills",
    name: "Quality Skills",
    oneLiner: "107 production-grade QA engineering skills for AI agents, packaged for 5 different agent hosts.",
    tags: ["MCP", "107 skills"],
    stack: ["Markdown/Skill format", "MCP", "Claude Code", "Cursor", "Zed", "Windsurf"],
    problem:
      "AI coding agents are frequently asked to write or review tests, but without domain grounding they default to generic, low-value test scaffolding — happy-path assertions with no understanding of flakiness, contract testing, or performance/security concerns.",
    architecture:
      "A library of 107 skills spanning frontend, API, performance, mobile, security, CI, and AI/LLM testing, each packaged to the MCP skill format so it installs cleanly across Claude Code, Claude Desktop, Cursor, Zed, Windsurf, and any other MCP host.",
    decisions: [
      "One skill, one concern — kept each skill narrow rather than building a few large do-everything skills, so an agent pulls in only what a task actually needs.",
      "MCP as the distribution format, betting that agent-skill interoperability matters more than any single vendor's plugin format.",
    ],
    impact:
      "The largest of my open-source projects by scope; not yet independently adopted at scale, but the biggest single test of whether domain knowledge packages cleanly for agent consumption.",
    impactStat: { value: 107, suffix: "", label: "skills across 5 agent hosts" },
    githubUrl: "https://github.com/aks-builds/quality-skills",
  },
  {
    slug: "openspecpm",
    name: "OpenSpecPM",
    oneLiner: "Spec-driven, BDD-shaped project management for AI agents, synced across 5 different PM platforms.",
    tags: ["BDD", "5 PM tools"],
    stack: ["Node.js", "GitHub Issues", "Azure DevOps", "Jira", "Linear", "GitLab"],
    problem:
      "Agentic coding tools produce plans and specs quickly, but that work rarely lands anywhere a team actually tracks work — it stays in chat history or a throwaway markdown file, disconnected from GitHub Issues, Jira, or whatever the team already uses.",
    architecture:
      "Turns OpenSpec proposals into BDD-shaped specs, then syncs the resulting tracked work items to GitHub Issues, Azure DevOps, Jira, Linear, or GitLab — so a spec an agent writes becomes a real ticket in the system the team already lives in.",
    decisions: [
      "BDD as the intermediate shape between a freeform spec and a tracked ticket, because Given/When/Then maps cleanly onto both human review and automated acceptance criteria.",
      "Multi-platform sync instead of picking one PM tool, since teams rarely get to choose their tracker.",
    ],
    impact:
      "The only project in this set with independent GitHub stars — small, but real external interest rather than only self-reported metrics.",
    impactStat: { value: 5, suffix: "", label: "PM platforms synced" },
    liveUrl: "https://www.npmjs.com/package/openspecpm",
    githubUrl: "https://github.com/aks-builds/openspecpm",
  },
  {
    slug: "clausa",
    name: "Clausa",
    oneLiner: "Local-first AI that decodes an insurance policy into plain English — coverage, exclusions, and gaps.",
    tags: ["Python", "Ollama", "Privacy"],
    stack: ["Python", "Ollama", "PDF parsing", "Local-first"],
    problem:
      "Insurance policy documents are dense, and the people who most need to understand a coverage gap are the least likely to have the time or vocabulary to parse dozens of pages of exclusions.",
    architecture:
      "Runs entirely local-first through Ollama — no cloud calls, no document ever leaving the machine it's read on — parsing a policy PDF and surfacing coverage, exclusions, gaps, and the questions worth asking an agent, in plain English.",
    decisions: [
      "Local-first by requirement, not preference — a tool that reads someone's insurance policy has no business sending that document anywhere.",
      "Optimized for the questions a policyholder should ask next, not just a summary, since the gap between 'covered' and 'covered under these conditions' is where people get burned.",
    ],
    impact:
      "My most recent project and the most consumer-facing — a deliberate step outside pure QA/infra tooling into applied, privacy-conscious AI.",
    impactStat: { value: 0, suffix: "", label: "cloud calls — fully local-first" },
    githubUrl: "https://github.com/aks-builds/clausa",
  },
];

export interface ImpactItem {
  key: string;
  title: string;
  tags: string[];
  description: string;
}

export const ROLE = {
  employer: "NashTech Ltd, UK",
  employerUrl: "https://www.nashtechglobal.com/",
  employerSub: "(NTG Solutions LLP)",
  client: "Duck Creek Technologies",
  clientUrl: "https://www.duckcreek.com/",
  title: "Automation Test Engineer",
  level: "Level 2",
  promotedLabel: "promoted Jul 2024",
  startDate: "Feb 2023",
  context:
    "Working within Destination Architecture Foundation — Duck Creek's enterprise P&C insurance platform (Platform Services, Billing, Claims, AMI) — serving carrier clients globally. NashTech is the UK-headquartered technology partner staffing this engagement.",
};

export const IMPACT_ITEMS: ImpactItem[] = [
  {
    key: "observability",
    title: "Performance Observability Pipeline",
    tags: ["k6", "OpenTelemetry", "Grafana", "AKS"],
    description:
      "k6 → OpenTelemetry → Prometheus → Grafana pipeline giving per-endpoint p95/p99 visibility; consolidated into a 59-panel dashboard across load tests and AKS infra health.",
  },
  {
    key: "framework",
    title: "Dual-Protocol Test Framework",
    tags: ["TypeScript", "Jest", "gRPC", "Protocol Buffers"],
    description:
      "Layered framework with a client abstraction layer; extended to 26 REST + 22 gRPC methods across 9 service stubs, spanning 6 functional domains.",
  },
  {
    key: "load-infra",
    title: "K6 Load Infrastructure on AKS",
    tags: ["k6-operator", "AKS", "ArgoCD", "Kustomize"],
    description:
      "10 parallel runner pods running config-driven load profiles; zero-touch deployment from esbuild through Kustomize, Kargo, and ArgoCD.",
  },
  {
    key: "sev1",
    title: "SEV-1 Root-Cause & Runbook",
    tags: ["Splunk", "Grafana", "Azure KQL"],
    description:
      "Traced a 16-hour production outage to a config drift between routing and API management layers; turned the investigation into reusable diagnostic playbooks.",
  },
];
