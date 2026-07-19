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
  {
    slug: "flag-drift-audit",
    name: "Flag Drift Audit",
    oneLiner: "Diffs feature-flag exports across environments to catch missing flags, value drift, and staleness.",
    tags: ["Feature Flags", "DevOps", "CLI", "Release Engineering"],
    stack: ["Node.js (ESM)", "GitHub Actions", "node --test"],
    problem:
      "Feature-flag exports drift silently across environments — a flag added in staging gets forgotten in production, a rollout percentage changes in one env but not another, or a flag outlives its purpose and nobody removes it.",
    architecture:
      "A CLI that diffs two or more JSON flag exports (files or directories of them) for missing flags, value/rollout drift, and staleness — flags marked unused or older than a configurable threshold. Outputs to console, JSON, or Markdown, and ships as a GitHub Action for CI gating.",
    decisions: [
      "A dedicated exit code for drift (2) versus usage errors (1), so CI can branch on the two cases instead of treating every non-zero exit the same.",
      "A strict mode that validates flag shape (e.g. rollout 0–100) before comparing, so malformed input fails loudly instead of producing a misleading diff.",
      "Directory input scans only the top level — no recursion — to keep environment inference unambiguous.",
    ],
    impact:
      "Published to npm with 61 passing tests, CI and CodeQL scanning, and zero runtime dependencies.",
    impactStat: { value: 61, suffix: "", label: "passing tests, zero runtime deps" },
    liveUrl: "https://www.npmjs.com/package/flag-drift-audit",
    githubUrl: "https://github.com/aks-builds/flag-drift-audit",
  },
  {
    slug: "model-changelog-watch",
    name: "Model Changelog Watch",
    oneLiner: "Snapshots and diffs LLM provider model specs to catch silent capability drift, separate from pricing.",
    tags: ["LLM", "AI-Ops", "Monitoring", "CLI"],
    stack: ["Node.js (ESM)", "GitHub Actions", "node --test"],
    problem:
      "Teams track LLM pricing changes closely but not capability changes — providers silently shrink context windows, drop modalities, or lower rate limits with no deprecation notice, and integrations break in production before anyone notices.",
    architecture:
      "A CLI (`mcw`) that merges local provider spec files into a dated snapshot, diffs two snapshots with a non-zero exit on breaking change, and renders a Markdown changelog across every consecutive snapshot pair — filtered by severity.",
    decisions: [
      "Scoped deliberately away from pricing, a well-covered problem, to focus on capability drift specifically.",
      "Kept the diff/changelog logic fully local and deterministic, while isolating the one network-touching fetch path outside the test suite to keep CI network-free.",
      "Config-driven field ignoring, so noisy non-semantic fields like a generation timestamp don't register as false drift.",
    ],
    impact:
      "73 passing tests with CI and CodeQL scanning; kept as a GitHub-only package rather than published, since the audience is internal tooling pipelines.",
    impactStat: { value: 73, suffix: "", label: "passing tests" },
    githubUrl: "https://github.com/aks-builds/model-changelog-watch",
  },
  {
    slug: "context-budget-alloc",
    name: "Context Budget Alloc",
    oneLiner: "A token budget allocator for LLM prompts — named zones, dynamic rebalancing, and a CLI for usage.",
    tags: ["TypeScript", "LLM", "Context Window", "Prompt Engineering"],
    stack: ["TypeScript", "tsup", "Vitest", "ESLint/Prettier", "Node.js"],
    problem:
      "LLM prompts are assembled from competing content types — system prompt, tool definitions, retrieved context, history, output headroom — all sharing one fixed context window, and retrieval or history commonly crowds out the rest with no visibility into which zone is at fault.",
    architecture:
      "A TypeScript library exposing named zones with either a target percentage share or a hard token cap, usage recording, and dynamic rebalancing that borrows from underused zones before signaling compression is needed. A companion CLI (`cba`) initializes config and reports zone status as a color-coded table or JSON.",
    decisions: [
      "Tokenizer-agnostic by design — ships simple default estimators but accepts any custom token counter (e.g. tiktoken) rather than bundling a hard tokenizer dependency.",
      "A pluggable rebalance strategy instead of a hardcoded borrow/compress policy, so teams can encode their own priority order.",
      "Two zone types — percentage-of-window for content that should scale with model context size, and a hard cap for fixed-size content like system prompts.",
    ],
    impact:
      "Published to npm with a full Vitest suite passing, CI and CodeQL scanning.",
    impactStat: { value: 2, suffix: "", label: "zone types: percent-of-window and hard cap" },
    liveUrl: "https://www.npmjs.com/package/context-budget-alloc",
    githubUrl: "https://github.com/aks-builds/context-budget-alloc",
  },
  {
    slug: "embedding-drift-watch",
    name: "Embedding Drift Watch",
    oneLiner: "Detects embedding drift in RAG pipelines using canary documents and provenance-tracked baselines.",
    tags: ["Python", "RAG", "Embeddings", "MLOps"],
    stack: ["Python", "NumPy", "pytest", "ruff", "mypy"],
    problem:
      "RAG systems index a corpus once with a given embedding model, chunking, and preprocessing pipeline; when any of those change later, stored vectors silently stop matching what a fresh embedding pass would produce, degrading retrieval with no alarm until users notice bad answers.",
    architecture:
      "A CLI (`edw`) that embeds a small fixed canary-document set through a deterministic offline hashing vectorizer and stores baseline vectors with provenance, then re-embeds the same canaries later and compares via cosine distance and nearest-neighbor stability into a scored drift report — exiting non-zero on drift.",
    decisions: [
      "Entirely offline by design — a deterministic char-ngram hashing vectorizer instead of a bundled model or API key, so results are reproducible and CI-safe.",
      "Every vector carries a provenance record (embedder version, chunk config, text hash, timestamp), so a drift report can explain why drift happened, not just that it did.",
      "Pluggable embedding step — any function producing a NumPy vector can replace the default hashing embedder.",
    ],
    impact:
      "97 passing tests with CI and CodeQL scanning; kept GitHub-only rather than published to PyPI.",
    impactStat: { value: 97, suffix: "", label: "passing tests" },
    githubUrl: "https://github.com/aks-builds/embedding-drift-watch",
  },
  {
    slug: "vc-expiry-watch",
    name: "VC Expiry Watch",
    oneLiner: "Offline CLI reporting Verifiable Credential expiry, structural validity, and revocation status.",
    tags: ["Verifiable Credentials", "DID", "Digital Identity", "CLI"],
    stack: ["Node.js (CommonJS)", "GitHub Actions", "node --test"],
    problem:
      "Verifiable Credentials rarely have a live monitoring pipeline after issuance — wallets and verifiers accumulate JSON-LD and JWT-VC credentials whose expiration date quietly passes, or whose issuer revokes them via a status list nobody polls.",
    architecture:
      "A CLI that recursively scans a directory or file for credentials and checks each one for expiry status against a configurable warning window, structural validity of required VC fields, and revocation against a local fixture — supporting both a simple revocation list and the StatusList2021 bitstring format, auto-detected. Handles both JSON-LD and JWT-VC files, with table, JSON, or CSV output.",
    decisions: [
      "Deliberately offline-first — revocation checks always read a local fixture rather than a live network call, with the one optional live-fetch helper explicitly excluded from tests.",
      "A fixed status priority (revoked > invalid > expired > upcoming > no-expiry > valid) so a credential with multiple issues gets one deterministic status instead of an ambiguous list.",
      "No cryptographic signature verification — explicitly scoped to structure, expiry, and revocation, meant to pair with a real VC verification library rather than replace one.",
    ],
    impact:
      "Published to npm with 68 passing tests, CI and CodeQL scanning, and zero runtime dependencies.",
    impactStat: { value: 68, suffix: "", label: "passing tests, zero runtime deps" },
    liveUrl: "https://www.npmjs.com/package/vc-expiry-watch",
    githubUrl: "https://github.com/aks-builds/vc-expiry-watch",
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
