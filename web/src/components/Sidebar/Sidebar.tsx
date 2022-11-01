import { gql, useQuery } from '@apollo/client'
import { Box, Divider, Stack, TextInput } from '@mantine/core'
import { useClickOutside, useMediaQuery } from '@mantine/hooks'
import { BiSearchAlt } from 'react-icons/bi'
import { useUiStore } from 'store/uiStore'
import shallow from 'zustand/shallow'
import Footer from './Footer'
import Header from './Header'
import Links from './Links'
import Projects from './Projects'

const Sidebar = () => {
  const matches = useMediaQuery('(max-width: 756px)')

  const { isSidebarOpen, toggleSidebar } = useUiStore(
    (state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }),
    shallow
  )
  const ref = useClickOutside(() => toggleSidebar(false))
 
  return (
    <Stack
      justify='space-between'
      ref={matches ? ref : null}
      sx={{
        width: '260px',
        minHeight: 'inherit',
        backgroundColor: 'white',
        boxShadow: '-3px 0 5px 0 #555',
        zIndex: 100,
        '@media (max-width: 755px)': {
          display: isSidebarOpen ? 'flex' : 'none',
          position: 'absolute',
        },
      }}>
      <Box p='md'>
        <Header />
        <TextInput
          variant='filled'
          icon={<BiSearchAlt size={18} />}
          mt='lg'
          placeholder='Search'
          radius='md'
          styles={{ input: { border: '1px solid lightgray' } }}
        />
        <Links />
        <Divider my='lg' color='#E0E0E0' />
        <Projects />
      </Box>
      <Footer />
    </Stack>
  )
}

export default Sidebar
