import { ActionIcon, Box, Group, Loader, Menu } from '@mantine/core'
import useDeleteCard from 'graphql/mutations/useDeleteCard'
import { useState } from 'react'
import { BiDotsHorizontalRounded, BiDownArrowAlt, BiFlag, BiTrash } from 'react-icons/bi'

const DotsButton = ({ cardId }: { cardId: string }) => {
  const [isClicked, setIsClicked] = useState(false)

  const { mutate, loading } = useDeleteCard()

  const handleDelete = (e: any) => {
    e.stopPropagation()
    mutate({ variables: { cardId } })
  }

  return (
    <Menu opened={isClicked} onChange={() => setIsClicked(!isClicked)} position='bottom-end' shadow='sm'>
      {loading ? (
        <Loader size='xs' />
      ) : (
        <Menu.Target>
          <ActionIcon
            onClick={(e: any) => e.stopPropagation()}
            variant='transparent'
            sx={{
              width: '20px',
              color: isClicked ? '#562BF7' : '',
            }}>
            <BiDotsHorizontalRounded size={24} />
          </ActionIcon>
        </Menu.Target>
      )}
      <Menu.Dropdown>
        <Menu.Item onClick={handleDelete}>
          <Group spacing='xs' align='center'>
            <BiTrash size={16} />
            <Box mt={4}>Delete</Box>
          </Group>
        </Menu.Item>
        <Menu.Item onClick={(e: any) => e.stopPropagation()} disabled>
          <Group spacing='xs' align='center'>
            <BiFlag size={16} />
            <Box mt={4}>Add flag</Box>
          </Group>
        </Menu.Item>
        <Menu.Item onClick={(e: any) => e.stopPropagation()} disabled>
          <Group spacing='xs' align='center'>
            <BiDownArrowAlt size={16} />
            <Box mt={4}>Move to the bottom</Box>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default DotsButton
