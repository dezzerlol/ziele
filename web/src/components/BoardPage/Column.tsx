import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ActionIcon, Box, Group, Menu, Title } from '@mantine/core'
import { useState } from 'react'
import { BiDotsHorizontalRounded, BiListUl, BiTrash } from 'react-icons/bi'
import DraggableIssueCard from './DraggableIssueCard'

const Column = ({ column }: any) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  const [isClicked, setIsClicked] = useState(false)

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

        <SortableContext items={column.cards.map((card: any) => card.id)} strategy={verticalListSortingStrategy}>
          <Box ref={setNodeRef} sx={{ borderRadius: '5px', height: 'auto', minHeight: '200px' }}>
            {column.cards.map((card: any) => (
              <DraggableIssueCard key={card.id} card={card} />
            ))}
          </Box>
        </SortableContext>
      </Box>
    </>
  )
}

export default Column
