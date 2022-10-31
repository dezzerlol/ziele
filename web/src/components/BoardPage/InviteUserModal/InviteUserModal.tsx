import { Avatar, Box, Button, Group, Modal, ScrollArea, Text, TextInput, Title } from '@mantine/core'
import useTeam from 'graphql/queries/useTeam'
import { useRouter } from 'next/router'
import React from 'react'
import { useUiStore } from 'store/uiStore'
import Label from '../CreateNewModal/Label'

const InviteUserModal = () => {
  const router = useRouter()
  const { team, loading } = useTeam(router.query.teamTitle as string)
  const { isInviteUserModalOpen, toggleInviteUserModal } = useUiStore((state) => ({
    isInviteUserModalOpen: state.isInviteUserModalOpen,
    toggleInviteUserModal: state.toggleInviteUserModal,
  }))

  const handleInvite = (userId: string) => {}

  const checkInProject = (userId: any, team: any, projectId: any) => {
    const currProject = team.projects.find((project: any) => project.id === projectId)

    return currProject.users.find((user: any) => user.id === userId) ? true : false
  }

  console.log({ team })
  return (
    <Modal
      opened={isInviteUserModalOpen}
      onClose={() => toggleInviteUserModal(false)}
      centered
      title={<Title order={4}>Invite people to this project</Title>}>
      <Box>
        <Group align='end' sx={{ width: '100%' }} pb='xl'>
          <TextInput placeholder='Search' label={<Label text='Invite team members' />} sx={{ width: '66%' }} />
          <Button sx={{ width: '30%' }}>Send invite</Button>
        </Group>
        <Label text='In this team' />
        <ScrollArea.Autosize maxHeight='400px'>
          {team?.users?.map((user: any) => (
            <Box key={user.id} pt='sm'>
              <Group position='apart'>
                <Group spacing='xs'>
                  <Avatar src={user.avatar} radius='xl' />
                  <Text weight={600}>{user.username}</Text>
                </Group>
                {checkInProject('cl9jy1ikl0000uzp0si29tit3', team, router.query.projectId) ? (
                  <Box>Member</Box>
                ) : (
                  <Button onClick={() => handleInvite(user.id)}>Invite</Button>
                )}
              </Group>
            </Box>
          ))}
        </ScrollArea.Autosize>
      </Box>
    </Modal>
  )
}

export default InviteUserModal
