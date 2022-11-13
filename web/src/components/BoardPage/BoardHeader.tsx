import Header from '@components/Header/Header'
import TagSelectItem from '@components/Select/Tags/TagSelectItem'
import TagSelectValue from '@components/Select/Tags/TagSelectValue'
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Center,
  Group,
  MultiSelect,
  SegmentedControl,
  TextInput,
  Tooltip,
} from '@mantine/core'
import useDebouncedCallback from 'hooks/useDebounce'
import React, { useRef } from 'react'
import { BiGridAlt, BiMenu } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import { useBoardStore } from 'store/boardStore'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'
import { ProjectType } from '../../types/ziele'

type Props = {
  project: ProjectType
}

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

const BoardHeader = ({ project }: Props) => {
  const { isSidebarOpen, toggleSidebar, toggleInviteUserModal } = useUiStore(
    (state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
      toggleInviteUserModal: state.toggleInviteUserModal,
    }),
    shallow
  )

  const { filterCardsByText } = useBoardStore((state) => ({
    filterCardsByText: state.filterCardsByText,
  }))

  const handleOpen = () => {
    toggleSidebar(true)
  }

  const debouncedSearch = useDebouncedCallback((v) => filterCardsByText(v), 650)

  const handleSearch = (e: any) => {
    debouncedSearch(e.target.value)
  }

  const tags = project.tags.map((tag) => ({ label: tag.body, value: tag.body, color: tag.color }))

  return (
    <>
      <Header project={project} />
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
        <h1>{project.title}</h1>
      </Group>
      <Group position='apart' align='center'>
        <Group>
          <TextInput onChange={handleSearch} placeholder='Search' size='xs' sx={{ maxWidth: '150px' }} />

          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing='sm'>
              {project.users.map((user: any) => (
                <Tooltip key={user.id} label={user.username} withArrow>
                  <Avatar src={user.avatar} radius='xl' />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Tooltip.Group>

          <Tooltip label='Add people' withArrow mr='xl'>
            <ActionIcon size='lg' variant='transparent' onClick={() => toggleInviteUserModal(true)}>
              <Avatar radius='xl'>
                <FiPlus />
              </Avatar>
            </ActionIcon>
          </Tooltip>

          <MultiSelect
            size='xs'
            variant='filled'
            data={tags}
            itemComponent={TagSelectItem}
            valueComponent={TagSelectValue}
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

export default React.memo(BoardHeader)
