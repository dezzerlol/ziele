import { Box, Button, Group, Modal, ScrollArea, TextInput, Title } from '@mantine/core'
import useTeam from 'graphql/queries/useTeam'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { useUiStore } from 'store/uiStore'
import Label from '../CreateNewModal/Label'
import UserItem from './UserItem'

const InviteUserModal = () => {
  const router = useRouter()
  const { team, loading } = useTeam(router.query.teamTitle as string)

  const { isInviteUserModalOpen, toggleInviteUserModal } = useUiStore((state) => ({
    isInviteUserModalOpen: state.isInviteUserModalOpen,
    toggleInviteUserModal: state.toggleInviteUserModal,
  }))

 
  return (
    <Modal
      opened={isInviteUserModalOpen}
      onClose={() => toggleInviteUserModal(false)}
      centered
      title={<Title order={4}>Invite people to this project</Title>}>
      <Box>
        <Group align='end' sx={{ width: '100%' }} pb='xl'>
          <TextInput
            placeholder='Search'
            label={<Label text='Invite team members' />}
            icon={<BiSearchAlt size={18} />}
            sx={{ width: '66%' }}
          />
          <Button sx={{ width: '30%' }}>Send invite</Button>
        </Group>
        <Label text='In this team' />
        <ScrollArea.Autosize maxHeight='400px'>
          {team?.users?.map((user: any) => (
            <UserItem key={user.id} team={team} user={user} />
          ))}
        </ScrollArea.Autosize>
      </Box>
    </Modal>
  )
}

export default InviteUserModal
