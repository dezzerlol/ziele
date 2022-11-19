import AvatarName from '@components/Common/AvatarName'
import Header from '@components/Header/Header'
import { ActionIcon, Badge, Box, Center, Checkbox, Group, Pagination, ScrollArea, Table, Title } from '@mantine/core'
import useTeam from 'graphql/queries/useTeam'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { ProjectType } from 'types/ziele'

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

const Members = () => {
  const [activePage, setPage] = useState(1)
  const router = useRouter()
  const { teamTitle } = router.query

  const { team, loading, error } = useTeam(teamTitle as string)

  console.log({ team })

  const handlePageChange = (page: number) => {
    console.log(page)
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea>
        <Box px='md' pt='md'>
          <Header />
        </Box>
        <Box px='md'>
          <Group py='md' align='center' spacing='xs'>
            <Title order={1}>Team members</Title>
            <Badge mt={5} radius='sm' color='gray'>
              {team?._count.users} users
            </Badge>
          </Group>
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
                    <ActionIcon variant='transparent'>
                      <BiTrash size={20} />
                    </ActionIcon>
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
          <Box py='xl'>
            <Pagination onChange={handlePageChange} total={10} color='violet' size='sm' />
          </Box>
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default Members
