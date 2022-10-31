import Tag from '@components/Common/Tag'
import { formatDate } from '@lib/formatDate'
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Group,
  Loader,
  Modal,
  Skeleton,
  Tabs,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core'
import useIssueCard from 'graphql/queries/useIssueCard'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiX } from 'react-icons/bi'
import CommentsPanel from './Panels/CommentsPanel'
import DescriptionPanel from './Panels/DescriptionPanel'
import DotsButton from './DotsButton'
import SettingsPanel from './Panels/SettingsPanel'

const IssueModal = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const theme = useMantineTheme()
  const router = useRouter()
  const issueSlug = router.query.issue as string
  const { issue, error, loading } = useIssueCard(issueSlug)

  const handleClose = () => {
    router.push(`/team/${router.query.teamTitle}/project/${router.query.projectId}`)
  }

  console.log({ issue })

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
        <DotsButton />
        <ActionIcon onClick={handleClose}>
          <BiX size={20} />
        </ActionIcon>
      </Group>

      <Box p='lg'>
        {loading ? <Skeleton width='80px' height='35px' /> : <Title order={2}>{issue?.title}</Title>}
        <Box mt={32}>
          <Group spacing={64} mb='sm'>
            <Text color='gray.6' weight={500} sx={{ width: '75px' }}>
              Assignees
            </Text>
            {issue?.assignees ? (
              <Group>
                {issue?.assignees.map((assignee: any) => (
                  <Group key={assignee.id} spacing='xs'>
                    <Text weight={600}>{assignee?.username}</Text>
                    <Avatar size='sm' radius='xl' />
                  </Group>
                ))}
              </Group>
            ) : (
              <Text color='gray.6'>No assignees</Text>
            )}
          </Group>

          <Group spacing={64} mb='sm'>
            <Text color='gray.6' weight={500} sx={{ width: '75px' }}>
              Date
            </Text>
            <Text weight={600}>{formatDate(issue?.createdAt)}</Text>
          </Group>

          <Group spacing={64} mb='sm'>
            <Text color='gray.6' weight={500} sx={{ width: '75px' }}>
              Tags
            </Text>
            <Group spacing='xs'>
              {issue?.tags.map((tag: any) => (
                <Tag key={tag.id} text={tag.body} color={tag.color} />
              ))}
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
                  {issue?.comments.length}
                </Badge>
              }>
              Comments
            </Tabs.Tab>
            <Tabs.Tab value='settings'>Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='description' pt='lg'>
            <DescriptionPanel />
          </Tabs.Panel>
          <Tabs.Panel value='comments' pt='lg'>
            <CommentsPanel />
          </Tabs.Panel>
          <Tabs.Panel value='settings' pt='lg'>
            <SettingsPanel />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Modal>
  )
}

export default IssueModal
