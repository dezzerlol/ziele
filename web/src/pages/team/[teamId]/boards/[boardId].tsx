import Board from '@components/Board/Board'
import BoardHeader from '@components/Board/BoardHeader'
import { AUTH_TOKEN } from '@constant'
import { Box, Stack } from '@mantine/core'

const BoardPage = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box p='md' sx={{ backgroundColor: 'white' }}>
        <BoardHeader />
      </Box>
      <Box px='md' pt='md' sx={{ height: '80%' }}>
        <Board />
      </Box>
    </Box>
  )
}

export default BoardPage

BoardPage.layout = true

export async function getServerSideProps(context: any) {
  const cookie = context.req.cookies[AUTH_TOKEN]

  if (!cookie) {
    return {
      redirect: {
        permanent: true,
        destination: '/login',
      },
    }
  }

  return {
    props: {},
  }
}
