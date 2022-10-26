import Tag from '@components/Common/Tag'
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Group,
  Modal,
  SimpleGrid,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { BiDotsHorizontalRounded, BiX } from 'react-icons/bi'

const IssueModal = () => {
  const theme = useMantineTheme()
  const router = useRouter()

  const handleClose = () => {
    router.push(`/team/${router.query.teamTitle}/project/${router.query.projectId}`)
  }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='xl'
      padding={0}
      withCloseButton={false}
      opened={router.query.issue ? true : false}
      onClose={handleClose}>
      <Group position='apart' px={'sm'} pt='xs'>
        <ActionIcon>
          <BiDotsHorizontalRounded size={20} />
        </ActionIcon>
        <ActionIcon onClick={handleClose}>
          <BiX size={20} />
        </ActionIcon>
      </Group>

      <Box p='lg'>
        <Title order={2}>Mobile App Exploration</Title>
        <Box mt={32}>
          <Group spacing={64} mb='sm'>
            <Text color='gray.6' weight={500} sx={{ width: '70px' }}>
              Assignee
            </Text>
            <Group spacing='xs'>
              <Text weight={600}>Roxana Johnsson</Text>
              <Avatar size='sm' radius='xl' />
            </Group>
          </Group>

          <Group spacing={64} mb='sm'>
            <Text color='gray.6' weight={500} sx={{ width: '70px' }}>
              Date
            </Text>
            <Text weight={600}>16/10/2022</Text>
          </Group>

          <Group spacing={64} mb='sm'>
            <Text color='gray.6' weight={500} sx={{ width: '70px' }}>
              Tags
            </Text>
            <Group spacing='xs'>
              <Tag text='Web' color='green' />
              <Tag text='GIT' color='red' />
            </Group>
          </Group>
        </Box>

        <Tabs defaultValue='description' mt='xl'>
          <Tabs.List>
            <Tabs.Tab value='description'>Description</Tabs.Tab>
            <Tabs.Tab
              value='comments'
              rightSection={
                <Badge
                  sx={{ minWidth: '16px', width: 'auto', height: 16, pointerEvents: 'none' }}
                  radius='sm'
                  variant='light'
                  size='xs'
                  p={0}>
                  12
                </Badge>
              }>
              Comments
            </Tabs.Tab>
            <Tabs.Tab value='settings'>Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='description' pt='lg'>
            Description
          </Tabs.Panel>
          <Tabs.Panel value='comments' pt='lg'>
            Comments
          </Tabs.Panel>
          <Tabs.Panel value='settings' pt='lg'>
            Settings
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Modal>
  )
}

export default IssueModal
