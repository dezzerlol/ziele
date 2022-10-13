import { Box, Divider, Stack, TextInput } from '@mantine/core'
import { useClickOutside, useMediaQuery } from '@mantine/hooks'
import { BiSearchAlt } from 'react-icons/bi'
import { useUiStore } from 'store/uiStore'
import Footer from './Footer'
import Header from './Header'
import Links from './Links'
import Projects from './Projects'

const projects = [
  { id: 1, title: 'Development', link: '' },
  { id: 2, title: 'Design', link: '' },
  { id: 3, title: 'Meets', link: '' },
]

const Sidebar = () => {
  const matches = useMediaQuery('(max-width: 756px)')

  const { isSidebarOpen, toggleSidebar } = useUiStore((state) => ({
    isSidebarOpen: state.isSidebarOpen,
    toggleSidebar: state.toggleSidebar,
  }))
  const ref = useClickOutside(() => toggleSidebar(false))

  return (
    <Stack
      justify='space-between'
      ref={matches ? ref : null}
      sx={{
        width: '260px',
        minHeight: '100vh',
        backgroundColor: 'white',
        boxShadow: '-3px 0 5px 0 #555',
        zIndex: 100,
        '@media (max-width: 755px)': {
          display: isSidebarOpen ? 'flex' : 'none',
          position: 'absolute',
        },
      }}>
      <Box p='md'>
        <Header
          companyName='My company'
          image='https://besthqwallpapers.com/Uploads/23-11-2020/146623/thumb2-mercedes-benz-logo-black-background-mercedes-emblem-mercedes-logo-on-a-black-background-car-brands.jpg'
        />
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
        <Projects projects={projects} />
      </Box>
      <Footer />
    </Stack>
  )
}

export default Sidebar
