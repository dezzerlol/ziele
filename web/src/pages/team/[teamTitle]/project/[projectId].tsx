import Board from '@components/BoardPage/Board'
import { AUTH_TOKEN } from '@constant'
import { Box } from '@mantine/core'

const BoardPage = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Board />
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
