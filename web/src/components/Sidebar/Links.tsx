import { Box, Group, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'
import { BiCalendar, BiChalkboard, BiNotification } from 'react-icons/bi'
import { RiTeamLine } from 'react-icons/ri'
import SidebarLink from './SidebarLink'
const links = [
  { id: 1, name: 'Notifications', icon: <BiNotification size={20} />, link: 'notifications' },
  { id: 2, name: 'Calendar', icon: <BiCalendar size={20} />, link: 'calendar' },
  { id: 3, name: 'Team', icon: <RiTeamLine size={20} />, link: 'team' },
]

const Links = () => {
  const router = useRouter()
  return (
    <Box mt='lg'>
      {links.map((link) => (
        <SidebarLink
          key={link.id}
          title={link.name}
          icon={link.icon}
          href={`/team/${router.query.teamTitle}/${link.link}`}
          style={{ fontWeight: '600' }}
          variant='links'
        />
      ))}
    </Box>
  )
}

export default Links
