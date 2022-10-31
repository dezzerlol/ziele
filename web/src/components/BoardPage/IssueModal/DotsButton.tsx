import { ActionIcon, Box, Group, Loader, Menu } from '@mantine/core'
import useDeleteCard from 'graphql/mutations/useDeleteCard'
import { useRouter } from 'next/router'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'

const DotsButton = () => {
  const router = useRouter()
  const { mutate, loading } = useDeleteCard()
  let cardId = router.query.issue

  const handleDelete = async () => {
    await mutate({ variables: { cardId } })
    router.push(router.asPath.split('?')[0])
  }

  return (
    <Menu position='right' shadow='sm'>
      {!loading ? (
        <Menu.Target>
          <ActionIcon>
            <BiDotsHorizontalRounded size={20} />
          </ActionIcon>
        </Menu.Target>
      ) : (
        <Loader size='xs' />
      )}
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
