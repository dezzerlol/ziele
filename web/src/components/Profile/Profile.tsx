import { Box, Stack, Text } from '@mantine/core'
import useAccount from 'graphql/queries/useAccount'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'
import CreateTeamModal from './CreateTeamModal'
import UserProfileCard from './UserProfileCard'
import WorkedOn from './WorkedOn'
import WorkTeams from './WorkTeams'

const Profile = () => {
  const { account, loading } = useAccount()
  const { isCreateTeamModalOpen } = useUiStore(
    (state) => ({
      isCreateTeamModalOpen: state.isCreateTeamModalOpen,
    }),
    shallow
  )

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
      <Box sx={{ minHeight: '15vh', width: '100%', backgroundColor: 'gray' }}></Box>

      <Box
        p='md'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          width: '80%',
          '@media(min-width: 992px)': { flexDirection: 'row' },
        }}>
        <Box p='md' sx={{ flex: '0 1 320px', border: '1px solid lightgray', borderRadius: '5px', minWidth: '240px' }}>
          <UserProfileCard account={account} />
        </Box>

        <Stack spacing='xl' sx={{ flex: '0 1 980px', minWidth: '300px' }}>
          <WorkedOn />
          <WorkTeams />
        </Stack>
      </Box>
      {isCreateTeamModalOpen && <CreateTeamModal />}
    </Box>
  )
}

const Label = ({ text }: { text: string }) => {
  return (
    <Text color='gray.7' weight={600} size='sm'>
      {text}
    </Text>
  )
}

export default Profile
