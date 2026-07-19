export interface NpmPackageMeta {
  name: string;
  description: string;
  npmUrl: string;
  githubUrl: string;
}

export const NPM_PACKAGES: NpmPackageMeta[] = [
  {
    name: "ai-test-failure-analyzer",
    description: "Root-cause pipeline across 24 test frameworks — MCP server, CLI, streaming web UI.",
    npmUrl: "https://www.npmjs.com/package/ai-test-failure-analyzer",
    githubUrl: "https://github.com/aks-builds/ai-test-failure-analyzer",
  },
  {
    name: "@aks-builds/email-api",
    description: "Self-hosted RESTful email service with a TUI client.",
    npmUrl: "https://www.npmjs.com/package/@aks-builds/email-api",
    githubUrl: "https://github.com/aks-builds/email-api",
  },
  {
    name: "cliproof",
    description: "Proof-it-runs terminal screenshots and GIFs, embedded into your README.",
    npmUrl: "https://www.npmjs.com/package/cliproof",
    githubUrl: "https://github.com/aks-builds/cliproof",
  },
  {
    name: "har-to-slo",
    description: "Turns HAR timing data into k6 SLO baselines.",
    npmUrl: "https://www.npmjs.com/package/har-to-slo",
    githubUrl: "https://github.com/aks-builds/har-to-slo",
  },
  {
    name: "a11y-delta",
    description: "Accessibility audit delta — catches only new axe violations, powered by Playwright.",
    npmUrl: "https://www.npmjs.com/package/a11y-delta",
    githubUrl: "https://github.com/aks-builds/a11y-delta",
  },
  {
    name: "hackathon-radar",
    description: "Finds active hackathons worldwide with eligibility badges — CLI + agent skill.",
    npmUrl: "https://www.npmjs.com/package/hackathon-radar",
    githubUrl: "https://github.com/aks-builds/hackathon-radar",
  },
  {
    name: "reqweave",
    description: "Reads service code, generates ready-to-import API collections for 6 different tools.",
    npmUrl: "https://www.npmjs.com/package/reqweave",
    githubUrl: "https://github.com/aks-builds/reqweave",
  },
  {
    name: "openspecpm",
    description: "Spec-driven, BDD-shaped project management for AI agents.",
    npmUrl: "https://www.npmjs.com/package/openspecpm",
    githubUrl: "https://github.com/aks-builds/openspecpm",
  },
  {
    name: "flag-drift-audit",
    description: "Diffs feature-flag exports across environments to catch missing flags and value drift.",
    npmUrl: "https://www.npmjs.com/package/flag-drift-audit",
    githubUrl: "https://github.com/aks-builds/flag-drift-audit",
  },
  {
    name: "context-budget-alloc",
    description: "Token budget allocator for LLM prompts — named zones and dynamic rebalancing.",
    npmUrl: "https://www.npmjs.com/package/context-budget-alloc",
    githubUrl: "https://github.com/aks-builds/context-budget-alloc",
  },
  {
    name: "vc-expiry-watch",
    description: "Offline CLI reporting Verifiable Credential expiry, validity, and revocation status.",
    npmUrl: "https://www.npmjs.com/package/vc-expiry-watch",
    githubUrl: "https://github.com/aks-builds/vc-expiry-watch",
  },
];

export interface NpmPackageWithDownloads extends NpmPackageMeta {
  monthlyDownloads: number | null;
}

async function fetchMonthlyDownloads(pkgName: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkgName)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.downloads === "number" ? data.downloads : null;
  } catch {
    return null;
  }
}

export async function getNpmPackagesWithDownloads(): Promise<NpmPackageWithDownloads[]> {
  return Promise.all(
    NPM_PACKAGES.map(async (pkg) => ({
      ...pkg,
      monthlyDownloads: await fetchMonthlyDownloads(pkg.name),
    }))
  );
}
