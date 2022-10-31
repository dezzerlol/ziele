import { gql, useQuery } from '@apollo/client'

const getProject = gql`
  query getProject($projectId: String!, $teamTitle: String!) {
    getProject(projectId: $projectId, teamTitle: $teamTitle) {
      id
      title
      image
      updatedAt
      createdAt
      users {
        id
        avatar
        username
      }
      tags {
        id
        body
        color
      }
      _count
    }
  }
`

export default function useProject(teamTitle: string, projectId: string) {
  const { data, loading } = useQuery(getProject, { variables: { teamTitle, projectId } })

  return { project: data?.getProject, loading }
}
