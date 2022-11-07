import Label from '@components/Common/Label'
import { Box, Button, Group, Image, Input, Modal, Stack, Text, TextInput } from '@mantine/core'
import useCreateTeam from 'graphql/mutations/useCreateTeam'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'

const CreateTeamModal = () => {
  const router = useRouter()
  const [teamTitle, setTeamTitle] = useState('')
  const { createTeam, loading, error } = useCreateTeam()

  const { isCreateTeamModalOpen, toggleCreateTeamModal } = useUiStore(
    (state) => ({
      isCreateTeamModalOpen: state.isCreateTeamModalOpen,
      toggleCreateTeamModal: state.toggleCreateTeamModal,
    }),
    shallow
  )

  const handleCreate = async () => {
    const team = await createTeam({ title: teamTitle })

    if (!team.errors) {
      toggleCreateTeamModal(false)
      router.push(`/team/${team.data.createTeam.id}`)
    }
  }

  return (
    <Modal
      opened={isCreateTeamModalOpen}
      onClose={() => toggleCreateTeamModal(false)}
      title='Create a new team'
      withCloseButton={false}
      size={800}>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          gap: '30px',
          alignItems: 'center',
          '@media(max-width: 756px)': { flexFlow: 'column wrap' },
        }}>
        <Box sx={{ width: '45%', order: 1, '@media(max-width: 756px)': { width: '100%' } }}>
          <Image src='/team-collab.svg' alt='Create team image' />
        </Box>
        <Stack sx={{ width: '50%', order: 2, '@media(max-width: 756px)': { width: '100%' } }}>
          <Text size='sm'>
            Get everyone working in one place by adding them to a team. Stay connected with @mentions, collaborate on
            work together, and efficiently manage everything from the team profile page.
          </Text>
          <TextInput
            onChange={(e) => setTeamTitle(e.target.value)}
            error={error?.message}
            placeholder="What's your team called?"
            label='Team name'
            required
          />
          <TextInput placeholder='Username or email' label='Invite people to your team' />
          <Group sx={{ alignSelf: 'flex-end' }}>
            <Button variant='subtle' onClick={() => toggleCreateTeamModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} loading={loading}>
              Create team
            </Button>
          </Group>
        </Stack>
      </Box>
    </Modal>
  )
}

export default CreateTeamModal
