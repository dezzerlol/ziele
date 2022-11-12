import { getTimeAgo } from '@lib/formatDate'
import { ActionIcon, Avatar, Badge, Box, Button, Group, Menu, ScrollArea, Stack, Tabs, Text } from '@mantine/core'
import React, { useState } from 'react'
import { BiNotification } from 'react-icons/bi'

const notifications = [
  { id: 1, user: 'test1', project: 'web-dev', type: 'issue', date: '1668246240690', read: false },
  { id: 2, user: 'test2', project: 'api', type: 'issue', date: '1668244540490', read: false },
  { id: 3, user: 'test3', project: 'api', type: 'mention', date: '1668246340190', read: true },
  { id: 4, user: 'test4', project: 'web-dev', type: 'mention', date: '1668242520690', read: true },
]

function getMessage(notification: any) {
  switch (notification.type) {
    case 'issue':
      return (
        <>
          added a new issue to{' '}
          <Text component='span' weight={700}>
            {notification.project}
          </Text>
        </>
      )
    case 'mention':
      return (
        <>
          mention you in{' '}
          <Text component='span' weight={700}>
            {notification.project}
          </Text>
        </>
      )
    default:
      return 'unknown'
  }
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<string | null>('all')

  return (
    <Menu shadow='md' position='bottom-end'>
      <Menu.Target>
        <ActionIcon>
          <BiNotification size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown sx={{ minWidth: '300px', width: '30%' }} p={0}>
        <Menu.Label p='sm'>
          <Group position='apart'>
            <Text sx={{ fontSize: '18px', fontWeight: 700, color: 'black' }}>Notifications</Text>
            <Button
              variant='subtle'
              p={0}
              compact
              sx={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'black',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                },
              }}>
              Mark all as read
            </Button>
          </Group>
        </Menu.Label>

        <Tabs defaultValue='all' value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab
              value='all'
              rightSection={
                <Badge
                  sx={{ minWidth: '16px', width: 'auto', height: 16, pointerEvents: 'none' }}
                  radius='sm'
                  variant={activeTab === 'all' ? 'filled' : 'light'}
                  size='xs'>
                  6
                </Badge>
              }>
              All
            </Tabs.Tab>
            <Tabs.Tab
              value='following'
              rightSection={
                <Badge
                  sx={{ minWidth: '16px', width: 'auto', height: 16, pointerEvents: 'none' }}
                  radius='sm'
                  variant={activeTab === 'following' ? 'filled' : 'light'}
                  size='xs'>
                  0
                </Badge>
              }>
              Following
            </Tabs.Tab>
            <Tabs.Tab
              value='archive'
              rightSection={
                <Badge
                  sx={{ minWidth: '16px', width: 'auto', height: 16, pointerEvents: 'none' }}
                  radius='sm'
                  variant={activeTab === 'archive' ? 'filled' : 'light'}
                  size='xs'>
                  0
                </Badge>
              }>
              Archive
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='all' p={0}>
            <ScrollArea.Autosize maxHeight='300px' type='always'>
              {notifications.map((n, index) => (
                <Box
                  p='sm'
                  key={n.id}
                  sx={{
                    borderBottom: index !== notifications.length - 1 ? '1px solid var(--border-color)' : '',
                    backgroundColor: n.read ? 'white' : '#E6E3F0',
                  }}
                  py='xs'>
                  <Group>
                    <Avatar src='' />
                    <Box>
                      <Box>
                        <Text component='span' weight={700}>
                          {n.user}
                        </Text>{' '}
                        {getMessage(n)}
                      </Box>
                      <Text sx={{ fontSize: '12px' }} color='gray.6'>
                        {getTimeAgo(n.date)}
                      </Text>
                    </Box>
                  </Group>
                </Box>
              ))}
            </ScrollArea.Autosize>
          </Tabs.Panel>

          <Tabs.Panel value='following' p='md'>
            Following
          </Tabs.Panel>

          <Tabs.Panel value='archive' p='md'>
            Archive
          </Tabs.Panel>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  )
}

export default Notifications
