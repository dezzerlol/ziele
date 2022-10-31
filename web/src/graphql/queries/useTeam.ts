import { gql, useQuery } from '@apollo/client'

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
    }
  }
`

export default function useTeam(teamTitle: string) {
  const { data, loading, error } = useQuery(getTeam, {
    variables: { title: teamTitle },
  })

  let team = data?.getTeam

  return { team, loading, error }
}
