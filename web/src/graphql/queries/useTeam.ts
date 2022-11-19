import { gql, useQuery } from '@apollo/client'
import { TeamType } from 'types/ziele'

const getTeam = gql`
  query getTeam($title: String!) {
    getTeam(title: $title) {
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

export default function useTeam(teamTitle: string) {
  const { data, loading, error } = useQuery(getTeam, {
    variables: { title: teamTitle },
  })

  let team: TeamType = data?.getTeam

  return { team, loading, error }
}
