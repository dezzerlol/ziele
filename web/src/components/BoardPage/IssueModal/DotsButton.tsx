import {
    ActionIcon, Box,
    Group,
    Menu
} from '@mantine/core'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'

const DotsButton = () => {
  const handleDelete = () => {}
  return (
    <Menu position='right' shadow='sm'>
      <Menu.Target>
        <ActionIcon>
          <BiDotsHorizontalRounded size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleDelete}>
          <Group spacing='xs' align='center'>
            <BiTrash size={16} />
            <Box mt={4}>Delete</Box>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default DotsButton
