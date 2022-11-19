import Header from '@components/Header/Header'
import {
  Burger,
  Button,
  Center,
  Group, SegmentedControl
} from '@mantine/core'
import React from 'react'
import { BiGridAlt, BiMenu } from 'react-icons/bi'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'
import { ProjectType } from '../../../types/ziele'
import AvatarGroup from './AvatarGroup'
import SearchCards from './SearchCards'
import TagSelect from './TagSelect'

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
          <SearchCards />
          <AvatarGroup project={project} />
          <TagSelect project={project} />
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
