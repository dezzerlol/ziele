import { gql, useMutation } from '@apollo/client'
import { showNotification } from '@mantine/notifications'

const removeUserMutation = gql`
  mutation removeUserFromTeam($data: AddUserToTeamDto!) {
    removeUserFromTeam(data: $data) {
      status
      message
    }
  }
`

export default function useRemoveFromTeam() {
  const [removeUser, { loading, error }] = useMutation(removeUserMutation, {
    onCompleted: () => {
      showNotification({
        title: 'User removed',
        message: 'User has been removed from the team and all projects',
        color: 'green',
      })
    },
    refetchQueries: ['getTeam'],
    awaitRefetchQueries: true,
  })

  return { removeUser, loading, error }
}
