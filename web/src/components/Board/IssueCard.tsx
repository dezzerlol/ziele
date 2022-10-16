import { ActionIcon, Avatar, Badge, Box, Card, Group, Menu, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiDotsHorizontalRounded, BiDownArrowAlt, BiFlag, BiTrash } from 'react-icons/bi'

const IssueCard = ({ card }: any) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleOpen = () => {
    router.push(`${router.asPath}?issue=${card.id}`)
  }

  return (
    <Card
      mb='md'
      shadow='xs'
      onClick={handleOpen}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { backgroundColor: '#F4F5F7' }, overflow: 'visible' }}>
      <Group position='apart' sx={{ height: '28px' }}>
        <Title order={5}>{card.title}</Title>
        <Menu opened={isClicked} onChange={() => setIsClicked(!isClicked)} position='bottom-end' shadow='sm'>
          <Menu.Target>
            <ActionIcon
              variant='transparent'
              sx={{
                width: '20px',
                color: isClicked ? '#562BF7' : '',
                display: isHover || isClicked ? 'flex' : 'none',
              }}>
              <BiDotsHorizontalRounded size={24} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Group spacing='xs' align='center'>
                <BiTrash size={16} />
                <Box mt={4}>Delete</Box>
              </Group>
            </Menu.Item>
            <Menu.Item>
              <Group spacing='xs' align='center'>
                <BiFlag size={16} />
                <Box mt={4}>Add flag</Box>
              </Group>
            </Menu.Item>
            <Menu.Item>
              <Group spacing='xs' align='center'>
                <BiDownArrowAlt size={16} />
                <Box mt={4}>Move to the bottom</Box>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Text color='gray.6'>Short summary</Text>
      <Group mt='xl' position='apart'>
        <Badge color='green'>Tag</Badge>
        <Box>
          <Avatar radius='xl' size='sm' />
        </Box>
      </Group>
    </Card>
  )
}

export default IssueCard
