import { Avatar, Box, Divider, Group, Menu, Text, Title } from '@mantine/core'
import { RiArrowUpDownFill, RiQuestionMark, RiSettings5Line } from 'react-icons/ri'

const Footer = () => {
  const links = [
    { id: 1, name: 'Settings', link: '', icon: <RiSettings5Line /> },
    { id: 2, name: 'Help', link: '', icon: <RiQuestionMark /> },
  ]
  return (
    <Box>
      <Box p='md'>
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
            <Text mt='2px' sx={{ fontWeight: '600' as 'bold' }} color='black'>
              {link.name}
            </Text>
          </Box>
        ))}
      </Box>
      <Divider />
      <Menu width='260px' shadow='xl' position='top-start'>
        <Menu.Target>
          <Group position='apart' spacing='xs' px='md' py='xs' sx={{ cursor: 'pointer' }}>
            <Group>
              <Avatar radius='md' size='sm' src={''} />
              <Box>
                <Title order={6} weight='bold' p={0}>
                  dezzerlol
                </Title>
                <Text size='xs'>test@mail.com</Text>
              </Box>
            </Group>
            <RiArrowUpDownFill color='gray' />
          </Group>
        </Menu.Target>
        <Menu.Dropdown ml='md'>
          <Menu.Item>Night mode</Menu.Item>
          <Menu.Item>Notifications</Menu.Item>
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}

export default Footer
