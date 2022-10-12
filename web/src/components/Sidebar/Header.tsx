import { Avatar, Box, Group, Menu, Text, Title } from '@mantine/core'
import React from 'react'
import { RiArrowUpDownFill } from 'react-icons/ri'

type Props = {
  companyName: string
  image: string
}

const CompanyItem = ({
  companyName,
  image,
  type,
  members,
}: {
  companyName: string
  image: string
  type: 'header' | 'dropdown'
  members?: string
}) => {
  return (
    <Group spacing='xs'>
      <Avatar radius='md' size='md' src={image} />
      <Box>
        <Title order={6} weight='bold' p={0}>
          {companyName}
        </Title>
        <Text size='xs'>Team board {type === 'dropdown' && `• ${members} members`}</Text>
      </Box>
    </Group>
  )
}

const Header = ({ companyName, image }: Props) => {
  return (
    <>
      <Menu width={260} shadow='md'>
        <Menu.Target>
          <Group position='apart' sx={{ cursor: 'pointer' }}>
            <CompanyItem companyName={companyName} image={image} type='header' />
            <RiArrowUpDownFill color='gray' />
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <CompanyItem companyName={companyName} image={image} type='dropdown' members={'4500'} />
          </Menu.Item>
          <Menu.Item>
            <CompanyItem companyName={companyName} image={image} type='dropdown' members={'4500'} />
          </Menu.Item>
          <Menu.Item>
            <CompanyItem companyName={companyName} image={image} type='dropdown' members={'4500'} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default Header
