import { ActionIcon, Avatar, Tooltip } from '@mantine/core'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { useUiStore } from 'store/uiStore'
import { ProjectType } from 'types/ziele'

const AvatarGroup = ({ project }: { project: ProjectType }) => {
  const { toggleInviteUserModal } = useUiStore((state) => ({
    toggleInviteUserModal: state.toggleInviteUserModal,
  }))

  return (
    <>
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
    </>
  )
}

export default AvatarGroup
