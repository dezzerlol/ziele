export type TeamType = {
  id: string
  image: string | null
  projects: ProjectType[] | null
  users: UserType[]
  title: string
  _count: {
    users: number
  }
}

export type ProjectType = {
  id: string
  title: string
  image: string | null
  updatedAt: string
  createdAt: string
  users: UserType[]
  tags: TagType[]
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
  tags: TagType[]
  assignees: UserType[]
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

export type TagType = {
  id: string
  body: string
  color: string
}

export type UserType = {
  id: string
  username: string
  avatar: string | null
  email?: string
}
