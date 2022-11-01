import { Avatar, Box, Button, Group, Text } from '@mantine/core'
import useInviteInProject from 'graphql/mutations/useInviteInProject'
import { useRouter } from 'next/router'
import React from 'react'

const checkInProject = (userId: any, projects: any, projectId: any) => {
  const currProject = projects.find((project: any) => project.id === projectId)

  return currProject.users.find((user: any) => user.id === userId) ? true : false
}

const UserItem = ({ user, team }: { user: any; team: any }) => {
  const { inviteInProject, loading: IsInviteLoading, error } = useInviteInProject()
  const router = useRouter()

  const handleInvite = (username: any) => {
    inviteInProject(router.query.projectId as string, username)
  }

  return (
    <Box key={user.id} pt='sm'>
      <Group position='apart'>
        <Group spacing='xs'>
          <Avatar src={user.avatar} radius='xl' />
          <Text weight={600}>{user.username}</Text>
        </Group>
        {checkInProject(user.id, team.projects, router.query.projectId) ? (
          <Box>Member</Box>
        ) : (
          <Button onClick={() => handleInvite(user.username)} loading={IsInviteLoading}>
            Invite
          </Button>
        )}
      </Group>
    </Box>
  )
}

export default UserItem
