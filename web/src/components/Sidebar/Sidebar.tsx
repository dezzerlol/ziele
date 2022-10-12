import { Box, Group, Text, TextInput } from '@mantine/core'
import { BiSearchAlt, BiNotification, BiCalendar, BiChalkboard } from 'react-icons/bi'
import { RiTeamLine } from 'react-icons/ri'
import Header from './Header'

const Sidebar = () => {
  const links = [
    { id: 1, name: 'Notifications', icon: <BiNotification size={20} />, link: '' },
    { id: 2, name: 'Calendar', icon: <BiCalendar size={20} />, link: '' },
    { id: 3, name: 'Kanban', icon: <BiChalkboard size={20} />, link: '' },
    { id: 4, name: 'Team', icon: <RiTeamLine size={20} />, link: '' },
  ]
  return (
    <Box p='md' sx={{ width: '260px', minHeight: '100vh', backgroundColor: 'white' }}>
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
      <Box mt='lg'>
        {links.map((link) => (
          <Box
            key={link.id}
            p='xs'
           
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#F5F7FB', color: '#562BF7' },
            }}>
            {link.icon}
            <Box mt='2px' sx={{ fontWeight: '600' }}>{link.name}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar
