import { Box, Divider, Stack, TextInput } from '@mantine/core'
import { useClickOutside, useMediaQuery } from '@mantine/hooks'
import useAccount from 'graphql/queries/useAccount'
import { useRouter } from 'next/router'
import { BiSearchAlt } from 'react-icons/bi'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'
import Footer from './Footer'
import Header from './Header'
import Links from './Links'
import Projects from './Projects'

const Sidebar = () => {
  const matches = useMediaQuery('(max-width: 756px)')
  const { account, loading } = useAccount()
  const router = useRouter()

  const { isSidebarOpen, toggleSidebar } = useUiStore(
    (state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }),
    shallow
  )
  const ref = useClickOutside(() => toggleSidebar(false))

  let currentTeam: any = account?.teams?.find((team: any) => team.title === router.query.teamTitle) || account?.teams[0]
  let otherTeams: any = account?.teams?.filter((team: any) => team.title !== router.query.teamTitle)

  return (
    <Stack
      justify='space-between'
      ref={matches ? ref : null}
      sx={{
        minWidth: '260px',
        minHeight: 'inherit',
        backgroundColor: 'white',
        boxShadow: '-3px 0 5px 0 #555',
        borderRight: '1px solid var(--border-color)',
        '@media (max-width: 755px)': {
          display: isSidebarOpen ? 'flex' : 'none',
          position: 'absolute',
        },
      }}>
      <Box p='md'>
        <Header currentTeam={currentTeam} otherTeams={otherTeams} />
        <TextInput
          variant='filled'
          icon={<BiSearchAlt size={18} />}
          mt='lg'
          placeholder='Search'
          radius='md'
          styles={{ input: { border: '1px solid lightgray' } }}
        />
        <Links />
        <Divider my='lg' color='var(--border-color)' />
        <Projects projects={currentTeam?.projects} />
      </Box>
      <Footer />
    </Stack>
  )
}

export default Sidebar
