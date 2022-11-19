import { Box } from '@mantine/core'
import { BiCalendar, BiNotification } from 'react-icons/bi'
import { RiTeamLine } from 'react-icons/ri'
import { TeamType } from 'types/ziele'
import SidebarLink from './SidebarLink'
const links = [
  { id: 1, name: 'Notifications', icon: <BiNotification size={20} />, link: 'notifications' },
  { id: 2, name: 'Calendar', icon: <BiCalendar size={20} />, link: 'calendar' },
  { id: 3, name: 'Members', icon: <RiTeamLine size={20} />, link: 'members' },
]

const Links = ({ currentTeam }: { currentTeam: TeamType }) => {
  return (
    <Box mt='lg'>
      {links.map((link) => (
        <SidebarLink
          key={link.id}
          title={link.name}
          icon={link.icon}
          href={`/team/${currentTeam?.title}/${link.link}`}
          style={{ fontWeight: '600' }}
          variant='links'
        />
      ))}
    </Box>
  )
}

export default Links
