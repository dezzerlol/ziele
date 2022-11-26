import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { TeamType } from 'types/ziele'

const getTeam = gql`
  query getTeam($title: String!, $offset: Int) {
    getTeam(title: $title, offset: $offset) {
      id
      title
      image
      updatedAt
      createdAt
      users {
        id
        username
        avatar
        email
      }
      projects {
        id
        title
        users {
          id
          username
          avatar
        }
      }
      _count
    }
  }
`

export default function useTeam(teamTitle: string, page: string) {
  const offset = +page > 1 ? (+page - 1) * 15 : 0

  const { data, loading, error, refetch } = useQuery(getTeam, {
    variables: { title: teamTitle, offset },
  })

  useEffect(() => {
    refetch()
  }, [page])

  let team: TeamType = data?.getTeam

  return { team, loading, error }
}
