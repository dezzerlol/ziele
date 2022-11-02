import AvatarName from '@components/Common/AvatarName'
import { Box, Center, Divider, Group, Menu, SegmentedControl, Text } from '@mantine/core'
import useAccount from 'graphql/queries/useAccount'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiNotification } from 'react-icons/bi'
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import { RiQuestionMark, RiSettings5Line, RiUser3Line } from 'react-icons/ri'
import SidebarLink from './SidebarLink'

const links = [
  { id: 1, name: 'Settings', link: '', icon: <RiSettings5Line /> },
  { id: 2, name: 'Help', link: '', icon: <RiQuestionMark /> },
]

const themeButtons = [
  {
    label: (
      <Center>
        <FiSun />
        <Box ml={10}>Light</Box>
      </Center>
    ),
    value: 'light',
  },
  {
    label: (
      <Center>
        <FiMoon />
        <Box ml={10}>Dark</Box>
      </Center>
    ),
    value: 'dark',
  },
]

const Footer = () => {
  const { account, loading } = useAccount()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
  }
  return (
    <Box>
      <Box p='md'>
        {links.map((link) => (
          <SidebarLink key={link.id} href={link.link} title={link.name} variant='links' icon={link.icon} />
        ))}
      </Box>
      <Divider />

      <Menu width='260px' shadow='xl' position='top-start' disabled={loading}>
        <Menu.Target>
          <Box px='md' py='xs' sx={{ cursor: 'pointer' }}>
            <AvatarName image={account?.avatar} name={account?.username} undername={account?.email} type='default' />
          </Box>
        </Menu.Target>
        <Menu.Dropdown ml='md'>
          <SegmentedControl size='xs' sx={{ width: '100%' }} data={themeButtons} />
          <Menu.Divider />

          <Menu.Item>
            <Link href={`/user/${account?.id}`} passHref>
              <Group>
                <RiUser3Line />
                Profile
              </Group>
            </Link>
          </Menu.Item>

          <Menu.Item disabled>
            <Group>
              <RiSettings5Line />
              Settings
            </Group>
          </Menu.Item>

          <Menu.Item disabled>
            <Group>
              <BiNotification />
              Notifications
            </Group>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item onClick={handleLogout}>
            <Box>
              <Group>
                <FiLogOut />
                Logout
              </Group>
            </Box>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}

export default Footer
