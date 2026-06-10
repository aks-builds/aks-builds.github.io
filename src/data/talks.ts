export interface Talk {
  id: string
  title: string
  venue: string
  youtubeId: string
  url: string
  upcoming?: boolean
  date?: string
}

export const TALKS: Talk[] = [
  {
    id: 'smart-test-data',
    title: 'Smart Test Data — Faker vs AI',
    venue: 'NashKnolX',
    youtubeId: '0H5A6l1fAHI',
    url: 'https://www.youtube.com/watch?v=0H5A6l1fAHI',
  },
  {
    id: 'event-driven',
    title: 'Testing Event-Driven Architecture',
    venue: 'NashKnolX',
    youtubeId: 'TRmYxFd9RG4',
    url: 'https://www.youtube.com/watch?v=TRmYxFd9RG4',
  },
  {
    id: 'clean-code',
    title: 'Clean Code in Test Automation',
    venue: 'NashKnolX',
    youtubeId: '7X9lnn7kDNY',
    url: 'https://www.youtube.com/watch?v=7X9lnn7kDNY',
  },
  {
    id: 'ai-test-failure',
    title: 'AI-Assisted Test Failure Analysis',
    venue: 'NashLearn',
    youtubeId: '',
    url: '',
    upcoming: true,
    date: 'Jun 19, 2026',
  },
]
