import { Box, Group, Text } from '@mantine/core'
import React from 'react'
import { BiCalendar, BiChalkboard, BiNotification } from 'react-icons/bi'
import { RiTeamLine } from 'react-icons/ri'
const links = [
  { id: 1, name: 'Notifications', icon: <BiNotification size={20} />, link: '' },
  { id: 2, name: 'Calendar', icon: <BiCalendar size={20} />, link: '' },
  { id: 3, name: 'Kanban', icon: <BiChalkboard size={20} />, link: '' },
  { id: 4, name: 'Team', icon: <RiTeamLine size={20} />, link: '' },
]

const Links = () => {
  return (
    <Box mt='lg'>
      {links.map((link) => (
        <Group
          key={link.id}
          p='xs'
          sx={{
            gap: '8px',
            borderRadius: '10px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#F5F7FB', color: '#562BF7' },
          }}>
          {link.icon}
          <Text mt={4} sx={{ fontWeight: '600' as 'bold' }} color='black'>
            {link.name}
          </Text>
        </Group>
      ))}
    </Box>
  )
}

export default Links
