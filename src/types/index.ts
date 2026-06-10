export type Category =
  | 'all'
  | 'devtools'
  | 'ai'
  | 'qa'
  | 'security'
  | 'gaming'
  | 'devops'

export interface Repo {
  name: string
  description: string
  url: string
  homepage?: string
  language: string | null
  topics: string[]
  stars: number
  forks: number
  category: Category
  featured?: boolean
  updatedAt: string
}
