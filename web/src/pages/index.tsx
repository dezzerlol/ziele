import { Box, Burger, Group } from '@mantine/core'
import { useUiStore } from 'store/uiStore'
import Columns from '../components/Columns'
import shallow from 'zustand/shallow'

const Home = () => {
  const { isSidebarOpen, toggleSidebar } = useUiStore(
    (state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }),
    shallow
  )

  const handleLogout = () => {
    console.log('clicked')
    toggleSidebar(true)
  }
  return (
    <div>
      <Group>
        <Burger
          opened={isSidebarOpen}
          onClick={handleLogout}
          sx={{
            '@media (min-width: 756px)': {
              display: 'none',
            },
          }}
        />
        <h1>Design</h1>
      </Group>
      <Columns />
      <form method='POST' action='/api/auth/logout'>
        <button type='submit'>
          <span>Logout</span>
        </button>
      </form>
    </div>
  )
}

export default Home

Home.layout = true
