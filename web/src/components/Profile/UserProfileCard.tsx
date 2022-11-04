import Label from '@components/Common/Label'
import { Avatar, Box, Button, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { BiBriefcaseAlt, BiBuilding, BiCurrentLocation, BiEnvelope } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import { useUiStore } from 'store/uiStore'
import { AccountType } from 'types/ziele'

const UserProfileCard = ({ account }: { account: AccountType }) => {
  const { toggleCreateTeamModal } = useUiStore((state) => ({
    toggleCreateTeamModal: state.toggleCreateTeamModal,
  }))

  return (
    <>
      <Stack p='md' align='center'>
        <Box sx={{ marginTop: '-110px' }}>
          <Avatar src={account?.avatar} radius={100} size={150} />
        </Box>
        <Box>
          <Title order={2}>{account?.username}</Title>
        </Box>
      </Stack>
      <Stack pb='sm'>
        <Label text='About' />
        <Group spacing='xs'>
          <BiBriefcaseAlt size={20} />
          <TextInput placeholder='Your job title' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
        </Group>

        <Group spacing='xs'>
          <BiBuilding size={20} />
          <TextInput placeholder='Your organization' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
        </Group>

        <Group spacing='xs'>
          <BiCurrentLocation size={20} />
          <TextInput placeholder='Your location' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
        </Group>

        <Label text='Contact' />

        <Group spacing='xs'>
          <BiEnvelope size={20} />
          <TextInput value={account?.email} placeholder='Email' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
        </Group>

        <Label text='Teams' />
        <Button
          variant='subtle'
          sx={{ display: 'flex' }}
          pl={0}
          color='gray'
          onClick={() => toggleCreateTeamModal(true)}>
          <FiPlus size={20} /> <Text ml='sm'>Create team</Text>
        </Button>
      </Stack>
    </>
  )
}

export default UserProfileCard
