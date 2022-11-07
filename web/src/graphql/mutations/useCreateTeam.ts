import { gql, useMutation } from '@apollo/client'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'

const createTeamGQL = gql`
  mutation createTeam($data: CreateTeamDto!) {
    createTeam(data: $data) {
      id
      title
    }
  }
`

export default function useCreateTeam() {
  const [createTeamMutation, { loading, data, error }] = useMutation(createTeamGQL, {
    onCompleted: () => {
      showNotification({
        title: 'Team created',
        message: 'Team has been created successfully',
        color: 'green',
      })
    },
    onError: (e) => {},
  })

  const createTeam = async (data: { title: string }) => {
    return createTeamMutation({
      variables: {
        data,
      },
    })
  }

  return { createTeam, loading, error, team: data }
}
