import { ActionIcon, Box, Group, Menu, Modal, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiDotsHorizontalRounded, BiListUl, BiTrash } from 'react-icons/bi'
import IssueCard from './IssueCard'
import IssueModal from './IssueModal'

const Column = ({ column }: any) => {
  const theme = useMantineTheme()
  const router = useRouter()
  const [isClicked, setIsClicked] = useState(false)

  console.log(router)
  return (
    <>
      <Box
        p='xs'
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          width: '100%',
          minHeight: '100%',
          height: '100%',
        }}>
        <Group spacing='xs' mb='md' position='apart' align='center' sx={{ height: '5%' }}>
          <Group>
            <Title order={6} color='gray.7'>
              {column.title}
            </Title>
            <Title order={6} color='gray.7'>
              {column.cards.length}
            </Title>
          </Group>
          <Menu opened={isClicked} onChange={() => setIsClicked(!isClicked)} position='bottom-end' shadow='sm'>
            <Menu.Target>
              <ActionIcon
                variant='transparent'
                sx={{
                  color: isClicked ? '#562BF7' : '',
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
                  <BiListUl size={16} />
                  <Box mt={4}>Add limit</Box>
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Box sx={{ borderRadius: '5px', height: 'auto' }}>
          {column.cards.map((card: any) => (
            <IssueCard key={card.id} card={card} />
          ))}
        </Box>
      </Box>
      <IssueModal />
    </>
  )
}

export default Column
