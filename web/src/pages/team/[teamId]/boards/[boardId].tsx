import Columns from '@components/Columns'
import Header from '@components/Header/Header'
import { AUTH_TOKEN } from '@constant'
import { Burger, Group } from '@mantine/core'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'

const BoardPage = () => {
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
    <div>
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
      <Columns />
    </div>
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
