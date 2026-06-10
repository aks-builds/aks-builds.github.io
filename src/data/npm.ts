export interface NpmPackage {
  name: string
  description: string
  language: string
  langColor: string
  installCmd: string
  npmUrl: string
  githubUrl: string
  tags: string[]
}

export const NPM_PACKAGES: NpmPackage[] = [
  {
    name: 'cliproof',
    description:
      'Your README should show it works — not just say it. Captures real terminal output as polished screenshots/GIFs, redacts secrets, and fails CI when proof drifts.',
    language: 'Python',
    langColor: '#3572A5',
    installCmd: 'npm install -g cliproof',
    npmUrl: 'https://www.npmjs.com/package/cliproof',
    githubUrl: 'https://github.com/aks-builds/cliproof',
    tags: ['cli', 'mcp', 'docker', 'claude-code'],
  },
  {
    name: 'ai-test-failure-analyzer',
    description:
      'Traces Playwright, Jest, Cypress, Newman, k6 and JUnit failures through git, logs, and config — no guesses, no fixture noise.',
    language: 'Python',
    langColor: '#3572A5',
    installCmd: 'npm install -g ai-test-failure-analyzer',
    npmUrl: 'https://www.npmjs.com/package/ai-test-failure-analyzer',
    githubUrl: 'https://github.com/aks-builds/ai-test-failure-analyzer',
    tags: ['ai', 'mcp', 'playwright', 'qa'],
  },
  {
    name: 'openspecpm',
    description:
      'Spec-driven, BDD-shaped project management for AI agents. OpenSpec proposals → BDD specs → tracked work in GitHub / Jira / Linear / GitLab.',
    language: 'JavaScript',
    langColor: '#f1e05a',
    installCmd: 'npm install -g openspecpm',
    npmUrl: 'https://www.npmjs.com/package/openspecpm',
    githubUrl: 'https://github.com/aks-builds/openspecpm',
    tags: ['bdd', 'claude-code', 'jira', 'linear'],
  },
]
