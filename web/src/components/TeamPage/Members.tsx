import { Badge, Box, Center, Group, Loader, Pagination, Title } from '@mantine/core'
import useTeam from 'graphql/queries/useTeam'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MembersTable from './MembersTable'

const Members = () => {
  const USERS_PER_PAGE = 15
  const router = useRouter()
  const teamTitle = router.query.teamTitle as string
  const page = (router.query?.page as string) || '1'
  const [activePage, setPage] = useState(page)

  const { team, loading, error } = useTeam(teamTitle, page)
  const pageCount = Math.ceil(team?._count.users / USERS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setPage(page.toString())
    router.push({ pathname: router.pathname, query: { teamTitle, page } })
  }

  return (
    <>
      <Group py='md' align='center' spacing='xs'>
        <Title order={1}>Team members</Title>
        <Badge mt={5} radius='sm' color='gray'>
          {team?._count.users} users
        </Badge>
      </Group>
      {loading && (
        <Center sx={{ height: '100%' }}>
          <Loader />
        </Center>
      )}
      <MembersTable team={team} />
      <Box py='xl'>
        <Pagination page={+activePage} onChange={handlePageChange} total={pageCount} color='violet' size='sm' />
      </Box>
    </>
  )
}

export default Members
