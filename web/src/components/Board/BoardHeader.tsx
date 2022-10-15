import Header from '@components/Header/Header'
import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Group,
  MultiSelect,
  SegmentedControl,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { BiGridAlt, BiMenu } from 'react-icons/bi'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'

const tags = [
  { label: 'UI', value: 'ui' },
  { label: 'Api', value: 'api' },
  { label: 'Web', value: 'web' },
]

const users = [
  { label: 'User 1', id: 'user1', avatar: 'https://avatars.githubusercontent.com/u/25126256?v=4' },
  { label: 'User 2', id: 'user2', avatar: 'https://avatars.githubusercontent.com/u/25126256?v=4' },
  { label: 'User 3', id: 'user3', avatar: 'https://avatars.githubusercontent.com/u/25126256?v=4' },
]

const boardType = [
  {
    label: (
      <Center>
        <BiMenu size={20} />
      </Center>
    ),
    value: 'list',
    icon: <BiMenu />,
  },
  {
    label: (
      <Center>
        <BiGridAlt size={20} />
      </Center>
    ),
    value: 'grid',
    icon: <BiGridAlt />,
  },
]

const BoardHeader = () => {
  const { isSidebarOpen, toggleSidebar } = useUiStore(
    (state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }),
    shallow
  )

  const handleOpen = () => {
    toggleSidebar(true)
  }

  return (
    <>
      <Header />
      <Group>
        <Burger
          opened={isSidebarOpen}
          onClick={handleOpen}
          sx={{
            '@media (min-width: 756px)': {
              display: 'none',
            },
          }}
        />
        <h1>Design</h1>
      </Group>
      <Group position='apart' align='center'>
        <Group>
          <TextInput size='xs' sx={{ maxWidth: '150px' }} placeholder='Search' />
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing='sm'>
              {users.map((user) => (
                <Tooltip key={user.id} label={user.label} withArrow>
                  <Avatar src={user.avatar} radius='xl' />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Tooltip.Group>
          <Tooltip label='Add people' withArrow mr='xl'>
            <ActionIcon size='lg' variant='transparent'>
              <Avatar radius='xl'>+</Avatar>
            </ActionIcon>
          </Tooltip>
          <MultiSelect
            size='xs'
            variant='filled'
            data={tags}
            placeholder='Tag'
            sx={{ maxWidth: '150px' }}
            clearButtonLabel='Clear selection'
            clearable
          />
          <Button size='xs' variant='subtle'>
            Only my issues
          </Button>
        </Group>
        <Group>
          <SegmentedControl data={boardType} />
        </Group>
      </Group>
    </>
  )
}

export default BoardHeader
