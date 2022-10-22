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
      _count
    }
  }
`

export default function useProject(teamTitle: string, projectId: string) {
  const { data: project, loading: projectLoading } = useQuery(getProject, { variables: { teamTitle, projectId } })

  return { project: project?.getProject, projectLoading }
}
