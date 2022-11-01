import { gql, useMutation } from '@apollo/client'

const inviteInProj = gql`
  mutation addUserInProject($data: AddUserDto!) {
    addUserInProject(data: $data) {
      id
    }
  }
`

export default function useInviteInProject() {
  const [inviteInProjectMutation, { data, loading, error }] = useMutation(inviteInProj, {
    refetchQueries: ['getTeam'],
    awaitRefetchQueries: true,
  })

  const inviteInProject = (projectId: string, username: string) => {
    inviteInProjectMutation({
      variables: {
        data: {
          projectId,
          username,
        },
      },
    })
  }

  return { inviteInProject, data, loading, error }
}
