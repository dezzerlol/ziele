import AvatarName from '@components/Common/AvatarName'
import { ActionIcon, Badge, Center, Checkbox, Loader, Table, Tooltip } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import useRemoveFromTeam from 'graphql/mutations/useRemoveFromTeam'
import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { ProjectType, TeamType } from 'types/ziele'

function findUserProjects(userId: string, allProjects: ProjectType[] | null) {
  const userProjects = []

  for (let i = 0; i < allProjects!.length; i++) {
    for (let j = 0; j < allProjects![i].users.length; j++) {
      if (allProjects![i].users[j].id === userId) {
        userProjects.push(allProjects![i])
      }
    }
  }

  return userProjects?.map((project) => (
    <Badge mr='xs' key={project.id}>
      {project.title}
    </Badge>
  ))
}

const removeButton = () => {}

const MembersTable = ({ team }: { team: TeamType }) => {
  const { removeUser, error, loading } = useRemoveFromTeam()

  const handleRemoveUser = (username: string) => {
    showNotification({
      title: 'Removing user...',
      message: 'Please wait...',
      color: 'blue',
    })
    removeUser({ variables: { data: { teamId: team.id, username } } })
  }

  return (
    <Table striped highlightOnHover withBorder sx={{ minHeight: '' }}>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Email address</th>
          <th>Last active</th>
          <th>Projects</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {team?.users.map((user) => (
          <tr key={user.id}>
            <td>
              <Checkbox />
            </td>
            <td>
              <AvatarName image={user.avatar} name={user.username} />
            </td>
            <td>{user.email}</td>
            <td>19.11.2022</td>
            <td>{findUserProjects(user.id, team.projects)}</td>
            <td>
              <Tooltip label='Remove user' position='bottom'>
                <ActionIcon variant='transparent' onClick={() => handleRemoveUser(user.username)}>
                  <BiTrash size={20} />
                </ActionIcon>
              </Tooltip>
            </td>
            <td>
              <ActionIcon variant='transparent'>
                <BiEdit size={20} />
              </ActionIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default MembersTable
