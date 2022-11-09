export type TeamType = {
  id: string
  image: string | null
  projects: ProjectType[] | null
  title: string
}

export type ProjectType = {
  id: string
  title: string
  image: string | null
  updatedAt: string
  createdAt: string
  users: []
  tags: [{ body: string; color: string; id: string }]
  team: TeamType

  _count: { users: number }
}

export type CardType = {
  id: string
  title: string
  description: string
  updatedAt: string
  createdAt: string
  priority: string
  tags: []
  assignees: []
  comments: []
}

export type ColumnType = {
  cards: CardType[]
  id: string
  title: string
}

export type AccountType = {
  id: string
  username: string
  email: string
  avatar: string | null
  teams: TeamType[]
}
