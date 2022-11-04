import Label from '@components/Common/Label'
import { Box, Button, Group, Image, Input, Modal, Stack, Text, TextInput } from '@mantine/core'
import React from 'react'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'

const CreateTeamModal = () => {
  const { isCreateTeamModalOpen, toggleCreateTeamModal } = useUiStore(
    (state) => ({
      isCreateTeamModalOpen: state.isCreateTeamModalOpen,
      toggleCreateTeamModal: state.toggleCreateTeamModal,
    }),
    shallow
  )

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
        <Box sx={{ width: '45%', order: 1, '@media(max-width: 756px)': { width: '100%' } }} >
          <Image src='/team-collab.svg' alt='Create team image' />
        </Box>
        <Stack sx={{ width: '50%', order: 2, '@media(max-width: 756px)': { width: '100%' } }}>
          <Text size='sm'>
            Get everyone working in one place by adding them to a team. Stay connected with @mentions, collaborate on
            work together, and efficiently manage everything from the team profile page.
          </Text>
          <TextInput placeholder="What's your team called?" label='Team name' required />
          <TextInput placeholder='Username or email' label='Invite people to your team' />
          <Group sx={{ alignSelf: 'flex-end' }}>
            <Button variant='subtle' onClick={() => toggleCreateTeamModal(false)}>
              Cancel
            </Button>
            <Button>Create team</Button>
          </Group>
        </Stack>
      </Box>
    </Modal>
  )
}

export default CreateTeamModal
